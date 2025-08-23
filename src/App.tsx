import { useEffect, useState } from 'react';
import { paapPunyaData } from './Data/paapPunya';
import bgImage from './assets/LakshmiNarayan.png';


// Simple React single-file app that adds daily save/load + calendar overview
// Storage format (localStorage): key = 'paapPunya:saves' -> JSON { '2025-08-23': { checkedItems: {...}, adjustments: {...}, totals: {punya, paap, overall} }, ... }

const STORAGE_KEY = 'paapPunya:saves';
const FOOTER_HEIGHT = 120; // px

function isoDate(d = new Date()) {
  const year = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${m}-${day}`;
}

//function monthKey(year, monthIndex) {
  // monthIndex: 0-11
  //return `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
//}

export default function App() {
  const todayIso = isoDate();
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [adjustments, setAdjustments] = useState<{ [key: number]: number }>({});
  const [saves, setSaves] = useState<Record<string, any>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [viewMode, setViewMode] = useState<'today' | 'calendar'>('today');
  const [loadedDate, setLoadedDate] = useState<string | null>(null); // which date is currently loaded into UI
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
  const [calendarMonthIndex, setCalendarMonthIndex] = useState<number>(new Date().getMonth());

  useEffect(() => {
    if (!loadedDate) return; // only auto-save if a date is loaded
    saveForDate(loadedDate);
  }, [checkedItems, adjustments, loadedDate]);
  

  
  // helpers to persist the saves map
  const persistSaves = (next: Record<string, any>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error('Failed to persist saves', e);
    }
    setSaves(next);
  };

  const handleToggle = (id: number) => {
    setCheckedItems(prev => {
      const currentlyChecked = !!prev[id];
      const newChecked = !currentlyChecked;
      // if checking and no adjustment exists, set default 1
      if (newChecked && adjustments[id] === undefined) {
        setAdjustments(prevAdj => ({ ...prevAdj, [id]: 1 }));
      }
      return { ...prev, [id]: newChecked };
    });
  };

  const handleAdjustment = (id: number, delta: number) => {
    setAdjustments(prev => {
      const newValue = (prev[id] || 1) + delta;
      return { ...prev, [id]: newValue < 1 ? 1 : newValue };
    });
  };

  // compute totals from current selections
  const computeTotals = (checked: Record<string, boolean>, adj: Record<string, number>) => {
    const totalPunya = Object.entries(checked)
      .filter(([id, checked]) => checked && paapPunyaData[Number(id)].type === 'Punya')
      .reduce((sum, [id]) => sum + (paapPunyaData[Number(id)].points || 0) * (adj[Number(id)] || 1), 0);

    const totalPaap = Object.entries(checked)
      .filter(([id, checked]) => checked && paapPunyaData[Number(id)].type === 'Paap')
      .reduce((sum, [id]) => sum + (paapPunyaData[Number(id)].points || 0) * (adj[Number(id)] || 1), 0);

    const overall = totalPunya - totalPaap;
    return { totalPunya, totalPaap, overall };
  };

  const currentTotals = computeTotals(checkedItems, adjustments);

  const saveForDate = (dateIso: string) => {
    const snapshot = {
      checkedItems,
      adjustments,
      totals: currentTotals,
      savedAt: new Date().toISOString(),
    };
    const next = { ...saves, [dateIso]: snapshot };
    persistSaves(next);
    setLoadedDate(dateIso);
  };

  const loadDate = (dateIso: string) => {
    const s = saves[dateIso];
    if (!s) {
      // no save, clear UI to empty
      setCheckedItems({});
      setAdjustments({});
      setLoadedDate(null);
      return;
    }
    setCheckedItems(s.checkedItems || {});
    setAdjustments(s.adjustments || {});
    setLoadedDate(dateIso);
  };

  const deleteDate = (dateIso: string) => {
    if (!saves[dateIso]) return;
    const next = { ...saves };
    delete next[dateIso];
    persistSaves(next);
    if (loadedDate === dateIso) {
      setLoadedDate(null);
      setCheckedItems({});
      setAdjustments({});
    }
  };

  // Calendar helpers
  const daysInMonth = (year: number, monthIndex: number) => new Date(year, monthIndex + 1, 0).getDate();
  const firstDayWeekday = (year: number, monthIndex: number) => new Date(year, monthIndex, 1).getDay(); // 0 Sun .. 6 Sat

  const getMonthSums = (year: number, monthIndex: number) => {
    const sums: Record<number, number | null> = {}; // date -> overallPoints or null
    const days = daysInMonth(year, monthIndex);
    for (let d = 1; d <= days; d++) {
      const iso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const s = saves[iso];
      sums[d] = s ? s.totals.overall : null;
    }
    return sums;
  };

  const monthSums = getMonthSums(calendarYear, calendarMonthIndex);

  const monthlyTotal = Object.values(monthSums).reduce<number>(
    (acc, v) => acc + (typeof v === 'number' ? v : 0),
    0
  );
  
  const yearlyTotal = (() => {
    let total = 0;
    for (let m = 0; m < 12; m++) {
      const days = daysInMonth(calendarYear, m);
      for (let d = 1; d <= days; d++) {
        const iso = `${calendarYear}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const s = saves[iso];
        if (s && typeof s.totals?.overall === 'number') total += s.totals.overall;
      }
    }
    return total;
  })();
  

  // navigation for calendar
  const prevMonth = () => {
    const m = calendarMonthIndex - 1;
    if (m < 0) {
      setCalendarMonthIndex(11);
      setCalendarYear(calendarYear - 1);
    } else setCalendarMonthIndex(m);
  };
  const nextMonth = () => {
    const m = calendarMonthIndex + 1;
    if (m > 11) {
      setCalendarMonthIndex(0);
      setCalendarYear(calendarYear + 1);
    } else setCalendarMonthIndex(m);
  };

  // Export / Import simple JSON
  const exportAll = () => {
    const blob = new Blob([JSON.stringify(saves, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paapPunya-saves-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(String(e.target?.result || '{}'));
        if (typeof parsed === 'object') {
          const merged = { ...saves, ...parsed };
          persistSaves(merged);
          alert('Imported saves and merged into local storage');
        }
      } catch (err) {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Paap & Punya Daily Checklist</h1>
          <div style={{ marginTop: 6, color: '#555' }}>Loaded date: {loadedDate || 'none (working on a new/unsaved day)'}</div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button type="button" onClick={() => { setViewMode('today'); }}>Today</button>
          <button type="button" onClick={() => { setViewMode('calendar'); }}>Calendar</button>
          <button type="button" onClick={() => { exportAll(); }}>Export JSON</button>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <input type="file" accept="application/json" onChange={e => importJson(e.target.files?.[0] || null)} />
          </label>
        </div>
      </header> 
      <p style={{ marginBottom: '20px' }}>
        This checklist is for <strong>daily use</strong>. Before going to sleep, check the boxes for
        actions you performed during the day. You will get <strong>approximate points</strong> you
        earned (Punya) or lost (Paap). You can adjust points manually using the +1 / -1 buttons.
      </p>
      {/* Add the disclaimer here */}
      <p style={{ fontSize: 12, color: '#900', marginBottom: 20 }}>
        <strong>Note:</strong> The points and classifications in this checklist are <em>approximate</em> and
        are based on traditional Vaishnava scriptures such as the <em>Srimad Bhagavatam, Vishnu Purana,
        Garuda Purana, Padma Purana,</em> and the <em>Bhagavad Gita</em>. They are intended only to provide
        guidance for lifestyle reflection. Actual spiritual significance depends on intention, context,
        and devotion.
      </p>
      <main style={{ marginTop: 18, marginBottom: FOOTER_HEIGHT + 20 }}>
        {viewMode === 'today' && (
          <section>
            <p style={{ marginTop: 0 }}>Check items you did today and press <strong>Save</strong> to store progress for this date.</p>
            {paapPunyaData.map((item, index) => (
              <div key={index} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: item.type === 'Paap' ? '#fff3f3' : '#f3fff7' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <input type="checkbox" checked={!!checkedItems[index]} onChange={() => handleToggle(index)} style={{ marginRight: 8 }} />
                    <strong>{item.name}</strong> <span style={{ color: '#666' }}>({item.type}, {item.severity}, {item.points} pts)</span>
                  </div>
                  <div>
                    <button type="button" onClick={() => handleAdjustment(index, 1)} style={{ marginRight: 6 }}>+1</button>
                    <button type="button" onClick={() => handleAdjustment(index, -1)}>-1</button>
                    <span style={{ marginLeft: 10 }}>Times: {adjustments[index] || 1}</span>
                  </div>
                </label>
                {item.source && <div style={{ fontSize: 12, marginTop: 6 }}>Sources: {item.source.join(', ')}</div>}
              </div>
            ))}

            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={() => saveForDate(todayIso)}>Save for Today ({todayIso})</button>
              <button type="button" onClick={() => saveForDate(loadedDate || todayIso)} style={{ marginLeft: 8 }}>Save (current loaded date)</button>
              <button type="button" onClick={() => { setCheckedItems({}); setAdjustments({}); setLoadedDate(null); }} style={{ marginLeft: 8 }}>Clear</button>

              {loadedDate && saves[loadedDate] && (
                <button type="button" onClick={() => deleteDate(loadedDate)} style={{ marginLeft: 8, color: 'crimson' }}>Delete saved {loadedDate}</button>
              )}
            </div>

            <div style={{ marginTop: 18, padding: 12, border: '1px solid #ccc', borderRadius: 8, background: '#fafafa' }}>
              <div>Punya: {currentTotals.totalPunya} &nbsp; Paap: {currentTotals.totalPaap} &nbsp; <strong>Overall: {currentTotals.overall}</strong></div>
            </div>
          </section>
        )}

        {viewMode === 'calendar' && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button type="button" onClick={prevMonth}>&lt;</button>
                <div style={{ minWidth: 220, textAlign: 'center' }}>
                  <strong>{new Date(calendarYear, calendarMonthIndex).toLocaleString(undefined, { month: 'long' })} {calendarYear}</strong>
                </div>
                <button type="button" onClick={nextMonth}>&gt;</button>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div>Monthly total: <strong>{monthlyTotal}</strong></div>
                <div>Yearly total: <strong>{yearlyTotal}</strong></div>
              </div>
            </div>

            {/* calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, textAlign: 'center', alignItems: 'start' }}>
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <div key={d} style={{ fontWeight: 600 }}>{d}</div>
              ))}

              {/* empty cells before first day */}
              {Array.from({ length: firstDayWeekday(calendarYear, calendarMonthIndex) }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}

              {Array.from({ length: daysInMonth(calendarYear, calendarMonthIndex) }).map((_, i) => {
                const day = i + 1;
                const iso = `${calendarYear}-${String(calendarMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const val = monthSums[day];
                return (
                  <div
                    key={iso}
                    style={{
                      minHeight: 80,
                      border: '1px solid #eee',
                      borderRadius: 8,
                      padding: 8,
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: val === null ? '#fff' : (val >= 0 ? '#f3fff7' : '#fff3f3')
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 12, color: '#333' }}>{day}</div>
                      <div style={{ fontSize: 12 }}>
                        {val === null ? '-' : (val >= 0 ? `+${val}` : val)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button type="button" onClick={() => loadDate(iso)}>Load</button>
                      {saves[iso] && <button type="button" onClick={() => deleteDate(iso)} style={{ color: 'crimson' }}>Del</button>}
                    </div>
                  </div>
                );
              })}
            </div>

          </section>
        )}
      </main>



      {/* fixed footer */}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 999 }}>
        <div style={{ width: 'min(1100px, calc(100% - 40px))', margin: '12px auto', padding: 16, borderRadius: 10, background: '#f8f9fb', border: '1px solid #ddd', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <h3 style={{ margin: 0 }}>Totals</h3>
            <div style={{ marginTop: 6 }}>
              <span style={{ marginRight: 12 }}>Punya: {currentTotals.totalPunya}</span>
              <span style={{ marginRight: 12 }}>Paap: {currentTotals.totalPaap}</span>
              <strong>Overall: {currentTotals.overall}</strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="button" onClick={() => saveForDate(todayIso)}>Save Today</button>
            <button type="button" onClick={() => saveForDate(loadedDate || todayIso)}>Save (loaded)</button>
            <button type="button" onClick={() => { setCheckedItems({}); setAdjustments({}); setLoadedDate(null); }}>Clear</button>
          </div>
            <div style={{ marginTop: 2, fontSize: 12, color: '#555' }}>
            <div>Created by: Aditya Nanaware</div>
            <div>Contact: <a href="mailto:notifiermedicine@gmail.com" style={{ color: '#0b07f0', textDecoration: 'underline' }}>notifiermedicine@gmail.com</a></div>
            <div style={{ color: '#e09c12' }}>  Website for personal lifestyle tracking based on Vaishnava scriptures</div>
            <div>Support: <a href="upi://pay?pa=adityananaware2@ybl&pn=Aditya+Nanaware&am=0&cu=INR"style={{ color: '#f07007', textDecoration: 'underline' }}> adityananaware2@ybl</a></div>
          </div>
        </div>
      </div>  
      <div
  style={{
    minHeight: '100vh',
    padding: '2px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',      // makes it cover the whole container
    backgroundPosition: 'center', // center the image
    backgroundRepeat: 'no-repeat',// don't repeat
    backgroundAttachment: 'fixed',// optional: image stays fixed when scrolling
  }}
>
  {/* rest of your app JSX */}
</div>
    
    </div>
  );
}

// src/paapPunya.ts
export interface PaapPunyaItem {
  name: string;
  type: 'Punya' | 'Paap';
  severity: 'Minor' | 'Moderate' | 'Major';
  points: number; // approximate points: Minor 1-10, Moderate 11-40, Major 41-100
  category?: string; // optional: moral, ritual, mental, social, daily
}

export const paapPunyaData: PaapPunyaItem[] = [
  // ======================
  // Major Punya
  // ======================
  { name: 'Ahimsa — non-violence toward all living beings', type: 'Punya', severity: 'Major', points: 80, category: 'Moral' },
  { name: 'Satya — truthfulness', type: 'Punya', severity: 'Major', points: 75, category: 'Moral' },
  { name: 'Dāna — charity / giving to the needy', type: 'Punya', severity: 'Major', points: 80, category: 'Social' },
  { name: 'Kṣamā / Kṣama — forgiveness / patience', type: 'Punya', severity: 'Major', points: 70, category: 'Moral' },
  { name: 'Daya — compassion and mercy', type: 'Punya', severity: 'Major', points: 75, category: 'Moral' },
  { name: 'Bhakti — devotion to God', type: 'Punya', severity: 'Major', points: 90, category: 'Spiritual' },
  { name: 'Nishkāma Karma — selfless action without desire for fruit', type: 'Punya', severity: 'Major', points: 85, category: 'Spiritual' },
  { name: 'Seva — service to guru, elders, brahmanas, devotees, the poor', type: 'Punya', severity: 'Major', points: 85, category: 'Social' },
  { name: 'Śraddhā — faith/earnestness in dharma and worship', type: 'Punya', severity: 'Major', points: 80, category: 'Spiritual' },
  { name: 'Dharma — performing one’s duty, svadharma', type: 'Punya', severity: 'Major', points: 80, category: 'Moral' },
  { name: 'Yajña — performing sacrificial duties and rituals sincerely', type: 'Punya', severity: 'Major', points: 75, category: 'Ritual' },
  { name: 'Tapas — austerity, self-discipline, penance', type: 'Punya', severity: 'Major', points: 70, category: 'Spiritual' },
  { name: 'Jñāna — spiritual knowledge, scriptural study', type: 'Punya', severity: 'Major', points: 70, category: 'Spiritual' },
  { name: 'Hita (beneficence) — doing good for others', type: 'Punya', severity: 'Major', points: 75, category: 'Social' },
  { name: 'Santosha — contentment with what one has', type: 'Punya', severity: 'Major', points: 65, category: 'Moral' },
  { name: 'Dama / Damaḥ — sense-control (tongue, senses)', type: 'Punya', severity: 'Major', points: 70, category: 'Mental' },
  { name: 'Brahmacharya — celibacy / moderation', type: 'Punya', severity: 'Major', points: 70, category: 'Moral' },
  { name: 'Asteya — non-stealing / respect for others’ property', type: 'Punya', severity: 'Major', points: 80, category: 'Social' },
  { name: 'Aparigraha — non-hoarding / non-covetousness', type: 'Punya', severity: 'Major', points: 65, category: 'Mental' },
  { name: 'Sauca — external and internal purity / cleanliness', type: 'Punya', severity: 'Major', points: 65, category: 'Ritual' },
  { name: 'Ātma-samyama (self-control) — mastery over mind/emotions', type: 'Punya', severity: 'Major', points: 75, category: 'Mental' },
  { name: 'Śauca of food — eating pure/allowed food', type: 'Punya', severity: 'Major', points: 65, category: 'Ritual' },
  { name: 'Hospitality (Atithi-satkar) — treating guests as gods', type: 'Punya', severity: 'Major', points: 70, category: 'Social' },
  { name: 'Respect for elders, parents and gurus (Guru-bhakti / Pitri-shraddha)', type: 'Punya', severity: 'Major', points: 80, category: 'Social' },
  { name: 'Pitṛ-seva — caring for one’s parents / ancestors', type: 'Punya', severity: 'Major', points: 80, category: 'Social' },
  { name: 'Tīrtha yātra — pilgrimage', type: 'Punya', severity: 'Moderate', points: 40, category: 'Ritual' },
  { name: 'Vrata / vrata observance — keeping vows / fasts', type: 'Punya', severity: 'Moderate', points: 35, category: 'Ritual' },
  { name: 'Dana of cows (gau dāna), feeding devotees', type: 'Punya', severity: 'Major', points: 75, category: 'Social' },
  { name: 'Building wells, temples, feeding houses — public works', type: 'Punya', severity: 'Moderate', points: 40, category: 'Social' },
  { name: 'Protection of the weak, servants, animals', type: 'Punya', severity: 'Major', points: 75, category: 'Social' },
  { name: 'Rescue and preservation of life', type: 'Punya', severity: 'Major', points: 90, category: 'Social' },
  { name: 'Charity of knowledge / teaching', type: 'Punya', severity: 'Moderate', points: 40, category: 'Social' },
  { name: 'Satkāra (honouring guests, devotees)', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Truthful testimony in court / social honesty', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Non-injury in profession', type: 'Punya', severity: 'Moderate', points: 35, category: 'Moral' },
  { name: 'Non-violence in thought — internal ahimsa', type: 'Punya', severity: 'Moderate', points: 40, category: 'Mental' },
  { name: 'Good conduct in family life', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Keeping promises (śruti or smṛti vows)', type: 'Punya', severity: 'Moderate', points: 30, category: 'Moral' },
  { name: 'Honouring covenants, agreements — social dharma', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Modesty and humility (vinaya)', type: 'Punya', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Forgoing revenge — forbearance', type: 'Punya', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Giving liberally at appropriate times (tithidāna, śrāddha dana)', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Charity to mendicants and sādhus', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Recitation of God’s names (nāma japa)', type: 'Punya', severity: 'Major', points: 85, category: 'Spiritual' },
  { name: 'Regular worship / pūjā and arati with devotion', type: 'Punya', severity: 'Major', points: 80, category: 'Ritual' },
  { name: 'Observance of moral restraints (yamas) and disciplines (niyamas)', type: 'Punya', severity: 'Moderate', points: 40, category: 'Moral' },
  { name: 'Feeding the poor and offering water / food to pilgrims', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Respecting animals and not killing them needlessly', type: 'Punya', severity: 'Moderate', points: 40, category: 'Moral' },
  { name: 'Sympathy and relief in times of disaster', type: 'Punya', severity: 'Moderate', points: 35, category: 'Social' },

  // ======================
  // Minor Punya (examples / daily virtues)
  // ======================
  { name: 'Feeding one hungry person', type: 'Punya', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Giving water to a thirsty traveler', type: 'Punya', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Helping an elderly cross the road', type: 'Punya', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Saying truth even when awkward', type: 'Punya', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Offering a small amount in charity regularly', type: 'Punya', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Reciting God’s name - Rampur, Krishna, haridas, Ram Ram,etc  (person, place, etc name including god) daily', type: 'Punya', severity: 'Minor', points: 1, category: 'Daily' },

  // ======================
  // Major Paap
  // ======================
  { name: 'Brahmahatyā — killing a brahmin(brahmin by Karma)/Devotee', type: 'Paap', severity: 'Major', points: 100, category: 'Moral' },
  { name: 'Gauhatyā — killing cows', type: 'Paap', severity: 'Major', points: 95, category: 'Moral' },
  { name: 'Homicide / taking innocent life', type: 'Paap', severity: 'Major', points: 100, category: 'Moral' },
  { name: 'Stealing (Choraṇ)', type: 'Paap', severity: 'Major', points: 90, category: 'Social' },
  { name: 'Adultery (strīdhwamsa) - voluntary sexual intercourse ', type: 'Paap', severity: 'Major', points: 90, category: 'Social' },
  { name: 'Lying / perjury', type: 'Paap', severity: 'Major', points: 85, category: 'Moral' },
  { name: 'Paradarāgaman — sexual relations with another’s spouse', type: 'Paap', severity: 'Major', points: 90, category: 'Social' },
  { name: 'Mṛtyu prāpt — suicide', type: 'Paap', severity: 'Major', points: 80, category: 'Mental' },
  { name: 'Abandoning one’s duty', type: 'Paap', severity: 'Major', points: 85, category: 'Moral' },
  { name: 'Causing famine or deprivation by hoarding / injustice', type: 'Paap', severity: 'Major', points: 80, category: 'Social' },
  { name: 'Killing a child or foetus (garbhaghāta)', type: 'Paap', severity: 'Major', points: 95, category: 'Moral' },
  { name: 'Harming a guru / teacher', type: 'Paap', severity: 'Major', points: 85, category: 'Social' },
  { name: 'Betraying trust', type: 'Paap', severity: 'Major', points: 80, category: 'Social' },
  { name: 'Hypocrisy in worship', type: 'Paap', severity: 'Major', points: 80, category: 'Mental' },
  { name: 'Wine-drinking / intoxication leading to crime', type: 'Paap', severity: 'Major', points: 75, category: 'Mental' },
  { name: 'Gambling causing social harm', type: 'Paap', severity: 'Major', points: 75, category: 'Social' },
  { name: 'Dishonouring parents / neglecting duties', type: 'Paap', severity: 'Major', points: 75, category: 'Social' },
  { name: 'Exploitation of the helpless', type: 'Paap', severity: 'Major', points: 80, category: 'Social' },
  { name: 'Deceitful trade, false weights and measures', type: 'Paap', severity: 'Major', points: 75, category: 'Social' },
  { name: 'Desecration of sacred places/items', type: 'Paap', severity: 'Major', points: 80, category: 'Ritual' },

  // ======================
  // Minor / Moderate Paap
  // ======================
  { name: 'Backbiting, slander, abusive speech', type: 'Paap', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Covetousness / greed', type: 'Paap', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Pride and arrogance', type: 'Paap', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Envy / jealousy', type: 'Paap', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Anger — uncontrolled rage', type: 'Paap', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Malice, cruelty to animals', type: 'Paap', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'Breaking vows (vrata-bhanga)', type: 'Paap', severity: 'Moderate', points: 35, category: 'Ritual' },
  { name: 'Eating forbidden food at forbidden times', type: 'Paap', severity: 'Moderate', points: 30, category: 'Ritual' },
  { name: 'Unchastity / promiscuity outside vows', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Taking another’s spouse (adultery repeated)', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Disrespect to guests', type: 'Paap', severity: 'Moderate', points: 25, category: 'Social' },
  { name: 'Refusing to give alms - Refusing charity to the poor', type: 'Paap', severity: 'Moderate', points: 25, category: 'Social' },
  { name: 'Not doing śrāddha for ancestors', type: 'Paap', severity: 'Moderate', points: 30, category: 'Ritual' },
  { name: 'Improper conduct in holy places', type: 'Paap', severity: 'Moderate', points: 30, category: 'Ritual' },
  { name: 'Cutting sacred groves / killing temple animals(animal sacrifice)', type: 'Paap', severity: 'Moderate', points: 35, category: 'Ritual' },
  { name: 'Breaking the fasts of devotees', type: 'Paap', severity: 'Moderate', points: 25, category: 'Ritual' },
  { name: 'Lying to family/friends for selfish gain', type: 'Paap', severity: 'Moderate', points: 35, category: 'Mental' },
  { name: 'False witness for personal benefit', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Usurpation of property by fraud', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Desecrating Vedic mantras / misuse of mantras', type: 'Paap', severity: 'Moderate', points: 35, category: 'Ritual' },
  { name: 'Corruption and bribery', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'False promises / breaking trust', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Causing social unrest / false propaganda', type: 'Paap', severity: 'Moderate', points: 30, category: 'Social' },
  { name: 'Denying justice / perverting truth', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Theft/robbery targeting the poor', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },
  { name: 'Oppression of women or widows, denying inheritance', type: 'Paap', severity: 'Moderate', points: 35, category: 'Social' },

  // ======================
  // Minor / everyday paap
  // ======================
  { name: 'Lying to avoid embarrassment', type: 'Paap', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Gossiping about neighbours', type: 'Paap', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Wasting food deliberately', type: 'Paap', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Deliberately hurting an animal', type: 'Paap', severity: 'Minor', points: 5, category: 'Daily' },
  { name: 'Intentionally breaking promises to children or spouse', type: 'Paap', severity: 'Minor', points: 5, category: 'Daily' },
];

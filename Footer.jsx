const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 text-center py-3 border-t mt-6">
      <p className="text-sm">
        © {new Date().getFullYear()} Your App Name. All rights reserved.
      </p>
      <p className="text-sm">
        Contact: <a href="mailto:youremail@example.com" className="text-blue-600 underline">
          youremail@example.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;

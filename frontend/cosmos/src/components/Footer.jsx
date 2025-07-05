export default function Footer() {
  const footerSections = [
    {
      title: "Explore",
      links: [
        "Solar System",
        "Deep Space",
        "Exoplanets",
        "Space Missions",
        "Astronomy Tools"
      ]
    },
    {
      title: "Resources",
      links: [
        "News Archive",
        "Research Papers",
        "Educational Content",
        "Image Gallery",
        "API Documentation"
      ]
    },
    {
      title: "Connect",
      links: [
        "About Us",
        "Contact",
        "Careers",
        "Press Kit",
        "Partnerships"
      ]
    }
  ];

  const socialIcons = [
    "fab fa-twitter",
    "fab fa-instagram",
    "fab fa-youtube"
  ];

  const legalLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy"
  ];

  return (
    <footer className="bg-space-dark border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-stellar-gold to-aurora-green flex items-center justify-center">
                <i className="fas fa-rocket text-space-dark text-lg"></i>
              </div>
              <span className="font-orbitron text-xl font-bold text-glow">Cosmic Explorer</span>
            </div>
            <p className="text-gray-400 mb-4">
              Exploring the infinite possibilities of space and sharing the wonders of the universe with humanity.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((icon, index) => (
                <button
                  key={index}
                  className="text-gray-400 hover:text-stellar-gold transition-colors duration-300"
                >
                  <i className={icon}></i>
                </button>
              ))}
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-orbitron font-bold mb-4 text-glow">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button className="text-gray-400 hover:text-stellar-gold transition-colors duration-300">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 Cosmic Explorer. All rights reserved across the universe.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <button
                key={index}
                className="text-gray-400 hover:text-stellar-gold transition-colors duration-300 text-sm"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
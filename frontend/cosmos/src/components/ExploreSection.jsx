export default function ExploreSection() {
  const explorationTools = [
    {
      title: "Solar System Explorer",
      description: "Navigate through our solar system and explore each planet in stunning 3D detail.",
      icon: "fas fa-telescope",
      buttonText: "Launch Explorer",
      gradient: "from-stellar-gold to-aurora-green",
      textColor: "text-space-dark"
    },
    {
      title: "ISS Live Tracker",
      description: "Track the International Space Station in real-time as it orbits Earth.",
      icon: "fas fa-satellite",
      buttonText: "Track ISS",
      gradient: "from-cosmic-purple to-mars-red",
      textColor: "text-white"
    },
    {
      title: "Star Map",
      description: "Interactive constellation guide and star chart for celestial navigation.",
      icon: "fas fa-star",
      buttonText: "View Stars",
      gradient: "from-aurora-green to-stellar-gold",
      textColor: "text-space-dark"
    }
  ];

  const statistics = [
    { value: "8", label: "Planets Discovered", color: "text-stellar-gold" },
    { value: "47", label: "Active Missions", color: "text-aurora-green" },
    { value: "5,000+", label: "Exoplanets Found", color: "text-cosmic-purple" },
    { value: "∞", label: "Light Years to Explore", color: "text-mars-red" }
  ];

  return (
    <section id="explore" className="py-20 cosmic-gradient relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Deep space with stars and cosmic dust" 
          className="w-full h-full object-cover opacity-30" 
        />
      </div>

      {/* Floating cosmic elements */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-stellar-gold rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-32 right-16 w-4 h-4 bg-aurora-green rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-10 w-8 h-8 bg-cosmic-purple rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-glow">
            <i className="fas fa-search mr-4 text-cosmic-purple"></i>
            Explore the Universe
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive tools and resources to discover planets, stars, and cosmic phenomena. Your journey into the depths of space begins here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
         {explorationTools.map((tool, index) => (
  <div key={index} className="glass-effect rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 border border-white/20 group">
    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${tool.gradient} rounded-full flex items-center justify-center group-hover:animate-pulse-glow`}>
      <i className={`${tool.icon} text-3xl ${tool.textColor}`}></i>
    </div>
    <h3 className="font-orbitron text-xl font-bold mb-4">{tool.title}</h3>
    <p className="text-gray-300 mb-6">
      {tool.description}
    </p>

    {tool.title === "ISS Live Tracker" ? (
      <a
        href="https://isstracker.pl/en"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-6 py-3 bg-gradient-to-r ${tool.gradient} ${tool.textColor} font-bold rounded-full hover:scale-105 transition-transform duration-300`}
      >
        {tool.buttonText}
      </a>
    ) : tool.title === "Star Map" ? (
      <a
        href="https://stellarium-web.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-6 py-3 bg-gradient-to-r ${tool.gradient} ${tool.textColor} font-bold rounded-full hover:scale-105 transition-transform duration-300`}
      >
        {tool.buttonText}
      </a>
    ) : (
      <button
        className={`px-6 py-3 bg-gradient-to-r ${tool.gradient} ${tool.textColor} font-bold rounded-full hover:scale-105 transition-transform duration-300`}
      >
        {tool.buttonText}
      </button>
    )}
  </div>
))}

        </div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="glass-effect rounded-xl p-6 border border-white/20">
              <div className={`text-3xl font-orbitron font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
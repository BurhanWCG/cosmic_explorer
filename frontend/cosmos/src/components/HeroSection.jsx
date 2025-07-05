export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen cosmic-gradient star-field flex items-center justify-center overflow-hidden">
      {/* Floating Planets */}
      <div className="absolute top-20 right-10 w-32 h-32 animate-float planet-glow" style={{ animationDelay: '-1s' }}>
        <img
          src="https://images.unsplash.com/photo-1630694093867-4b947d812bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
          alt="Mars planet with red surface"
          className="w-full h-full rounded-full object-cover border-2 border-mars-red/50"
        />
      </div>

      <div className="absolute bottom-20 left-10 w-40 h-40 animate-float planet-glow" style={{ animationDelay: '-3s' }}>
        <img
          src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
          alt="Earth from space showing continents and oceans"
          className="w-full h-full rounded-full object-cover border-2 border-blue-400/50"
        />
      </div>

      <div className="absolute top-1/2 right-20 transform -translate-y-1/2 w-28 h-28 animate-float planet-glow" style={{ animationDelay: '-2s' }}>
        <img
          src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
          alt="Venus planet with atmospheric layers"
          className="w-full h-full rounded-full object-cover border-2 border-yellow-400/50"
        />
      </div>

      <div className="absolute top-32 left-1/4 w-20 h-20 animate-float opacity-70" style={{ animationDelay: '-4s' }}>
        <img
          src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
          alt="Distant purple exoplanet"
          className="w-full h-full rounded-full object-cover border border-purple-400/30"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h3 className="font-orbitron text-5xl md:text-7xl font-bold mb-6 text-glow animate-pulse-glow">
          EXPLORE THE
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
            {" "}COSMOS
          </span>

        </h3>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
          Journey through the infinite expanse of space. Discover planets, stars, and cosmic wonders that await your exploration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-stellar-gold to-aurora-green text-space-dark font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl animate-pulse-glow">
            <i className="fas fa-rocket mr-2"></i>
            Start Exploration
          </button>
          <button className="px-8 py-4 glass-effect border border-white/30 font-medium rounded-full hover:bg-white/20 transition-all duration-300">
            <i className="fas fa-play mr-2"></i>
            Watch Journey
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-2xl text-stellar-gold"></i>
      </div>
    </section>
  );
}
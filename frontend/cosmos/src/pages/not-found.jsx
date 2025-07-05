export default function NotFound() {
  return (
    <div className="min-h-screen cosmic-gradient star-field flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <i className="fas fa-rocket text-6xl text-stellar-gold animate-pulse-glow"></i>
        </div>
        <h1 className="font-orbitron text-6xl font-bold mb-4 text-glow">404</h1>
        <h2 className="font-orbitron text-2xl font-bold mb-6">Lost in Space</h2>
        <p className="text-xl text-gray-300 mb-8">
          Looks like you've drifted into uncharted territory. Let's get you back to familiar cosmic coordinates.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-8 py-4 bg-gradient-to-r from-stellar-gold to-aurora-green text-space-dark font-bold rounded-full hover:scale-105 transition-transform duration-300"
        >
          <i className="fas fa-home mr-2"></i>
          Return to Earth
        </button>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../redux/slices/authSlice'; // Assuming the slice is in authSlice.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      if (isLogin) {
        const loginData = {
          email: formData.email,
          password: formData.password
        };
        const result = await dispatch(loginUser(loginData)).unwrap();
        toast.success('Login successful! Welcome back!');
        navigate('/'); 
      } else {
        const registerData = {
          email: formData.email,
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          confirm_password: formData.confirmPassword,

        };
        console.log(registerData)
        const result = await dispatch(registerUser(registerData)).unwrap();
        toast.success('Registration successful! Welcome to Cosmic Explorer!');
        navigate('/'); 
      }
    } catch (err) {
      console.log(err)
      const errorMessage = error?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      username: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space-blue to-cosmic-purple relative overflow-hidden">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-space-dark/90 border border-white/20 rounded-xl text-white"
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="star-field opacity-60"></div>

        {/* Floating Planets */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-mars-red to-red-900 opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-gradient-to-br from-stellar-gold to-yellow-600 opacity-60 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-aurora-green to-green-600 opacity-50 animate-float"></div>
        <div className="absolute bottom-20 right-32 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-800 opacity-70 animate-float-delayed"></div>

        {/* Cosmic Rings */}
        <div className="absolute top-32 right-40 w-32 h-32 border-2 border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 border border-stellar-gold/30 rounded-full animate-spin-reverse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <Link to="/" className="inline-flex items-center text-white hover:text-stellar-gold transition-colors duration-300">
          <i className="fas fa-rocket mr-2"></i>
          <span className="font-orbitron font-bold">Cosmic Explorer</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="glass-effect rounded-3xl p-8 border border-white/20 backdrop-blur-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-stellar-gold to-aurora-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} text-space-dark text-xl`}></i>
              </div>
              <h1 className="font-orbitron text-3xl font-bold text-glow mb-2">
                {isLogin ? 'Welcome Back' : 'Join the Universe'}
              </h1>
              <p className="text-gray-300">
                {isLogin ? 'Sign in to continue your cosmic journey' : 'Create your account to explore the cosmos'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-input-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                        placeholder="First name"
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-input-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                        placeholder="Last name"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-input-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                      placeholder="Choose a username"
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-input-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-input-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-input-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-stellar-gold bg-space-dark border-white/30 rounded focus:ring-stellar-gold/20 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm TROUBLESHOOTINGtext-stellar-gold hover:text-aurora-green transition-colors duration-300"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-white/50 from-stellar-gold to-aurora-green text-space-dark font-bold py-4 rounded-xl hover:from-aurora-green hover:to-stellar-gold transition-all duration-300 transform hover:scale-105 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-space-dark text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-3 px-4 border border-white/30 rounded-xl bg-space-dark/50 text-sm font-medium text-white hover:bg-white/10 transition-all duration-300">
                  <i className="fab fa-google text-lg"></i>
                  <span className="ml-2">Google</span>
                </button>
                <button className="w-full inline-flex justify-center py-3 px-4 border border-white/30 rounded-xl bg-space-dark/50 text-sm font-medium text-white hover:bg-white/10 transition-all duration-300">
                  <i className="fab fa-github text-lg"></i>
                  <span className="ml-2">GitHub</span>
                </button>
              </div>
            </div>

            {/* Switch Mode */}
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={switchMode}
                  className=" ml-2 text-stellar-gold hover:text-aurora-green font-medium transition-colors duration-300"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="glass-effect rounded-xl p-4 border border-white/10">
              <i className="fas fa-shield-alt text-stellar-gold text-xl mb-2"></i>
              <p className="text-xs text-gray-300">Secure</p>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-white/10">
              <i className="fas fa-rocket text-aurora-green text-xl mb-2"></i>
              <p className="text-xs text-gray-300">Fast</p>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-white/10">
              <i className="fas fa-users text-blue-400 text-xl mb-2"></i>
              <p className="text-xs text-gray-300">Community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
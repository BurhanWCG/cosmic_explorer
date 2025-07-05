import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message! We will respond within 2-4 Earth hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Headquarters",
      content: "",
      bgColor: "bg-stellar-gold"
    },
    {
      icon: "fas fa-phone",
      title: "Communication Link",
      content: "",
      bgColor: "bg-aurora-green"
    },
    {
      icon: "fas fa-envelope",
      title: "Data Transmission",
      content: "",
      bgColor: "bg-cosmic-purple"
    }
  ];

  const socialLinks = [
    { icon: "fab fa-twitter", gradient: "from-stellar-gold to-aurora-green", textColor: "text-space-dark" },
    { icon: "fab fa-instagram", gradient: "from-aurora-green to-cosmic-purple", textColor: "text-white" },
    { icon: "fab fa-youtube", gradient: "from-cosmic-purple to-mars-red", textColor: "text-white" },
    { icon: "fab fa-linkedin", gradient: "from-mars-red to-stellar-gold", textColor: "text-space-dark" }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-cosmic-purple to-space-dark relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-glow">
            <i className="fas fa-envelope mr-4 text-stellar-gold"></i>
            Contact Mission Control
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to join our cosmic journey? Get in touch with our team of space exploration experts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-effect rounded-2xl p-8 border border-white/20">
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-glow">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-stellar-gold focus:border-transparent text-white placeholder-gray-400" 
                    placeholder="Your name" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-stellar-gold focus:border-transparent text-white placeholder-gray-400" 
                    placeholder="your.email@example.com" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-stellar-gold focus:border-transparent text-white"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="research">Research Collaboration</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-stellar-gold focus:border-transparent text-white placeholder-gray-400 resize-none" 
                    placeholder="Tell us about your cosmic curiosity..."
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full px-6 py-4 bg-gradient-to-r from-stellar-gold to-aurora-green text-space-dark font-bold rounded-lg hover:scale-105 transition-transform duration-300 animate-pulse-glow"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="glass-effect rounded-2xl p-8 border border-white/20">
                <h3 className="font-orbitron text-2xl font-bold mb-6 text-glow">Mission Details</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${info.bgColor} rounded-full flex items-center justify-center`}>
                        <i className={`${info.icon} text-space-dark`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{info.title}</h4>
                        <p className="text-gray-300 whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-effect rounded-2xl p-8 border border-white/20">
                <h3 className="font-orbitron text-xl font-bold mb-6">Join Our Cosmic Community</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 bg-gradient-to-r ${social.gradient} rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                    >
                      <i className={`${social.icon} ${social.textColor}`}></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
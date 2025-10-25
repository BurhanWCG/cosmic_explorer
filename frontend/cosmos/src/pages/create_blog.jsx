import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { createBlogPost } from "../redux/slices/createblogSlice";

export default function CreateBlogPage() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    excerpt: "",
    tags: "",
    coverImage: ""
  });
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { value: "MARS_EXPLORATION", label: "Mars Exploration", color: "text-mars-red" },
    { value: "ISS_MISSION", label: "ISS Mission", color: "text-aurora-green" },
    { value: "DEEP_SPACE", label: "Deep Space", color: "text-cosmic-purple" },
    { value: "SPACE_TECH", label: "Space Technology", color: "text-stellar-gold" },
    { value: "LUNAR_SCIENCE", label: "Lunar Science", color: "text-blue-400" },
    { value: "EXOPLANETS", label: "Exoplanets", color: "text-green-400" },
    { value: "ASTRONOMY", label: "Astronomy", color: "text-indigo-400" },
    { value: "SPACE_HISTORY", label: "Space History", color: "text-amber-400" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    dispatch(createBlogPost({
      title: formData.title,
      category: formData.category,
      content: formData.content,
      excerpt: formData.excerpt,
      tags: formData.tags,
      cover_image: formData.coverImage,
    }))
      .unwrap()
      .then(() => {
        alert("Blog post created successfully! 🚀");
        setFormData({
          title: "",
          category: "",
          content: "",
          excerpt: "",
          tags: "",
          coverImage: ""
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to create blog post.");
      })
      .finally(() => setIsSaving(false));
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-20 pb-12 cosmic-gradient star-field relative overflow-hidden">
        {/* Floating cosmic elements */}
        <div className="absolute inset-0">
          <div className="floating-planet w-20 h-20 bg-gradient-to-br from-mars-red to-orange-600 rounded-full opacity-20 animate-float-slow absolute top-20 left-10"></div>
          <div className="floating-planet w-16 h-16 bg-gradient-to-br from-aurora-green to-emerald-400 rounded-full opacity-15 animate-float-reverse absolute top-32 right-20"></div>
          <div className="floating-planet w-12 h-12 bg-gradient-to-br from-cosmic-purple to-purple-400 rounded-full opacity-25 animate-float absolute bottom-20 left-1/4"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 text-glow">
              <i className="fas fa-feather-alt mr-4 text-stellar-gold animate-pulse"></i>
              Create Your Chronicle
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Share your cosmic discoveries, space insights, and astronomical adventures with the universe.
              Your words will travel across the cosmos.
            </p>
          </div>
        </div>
      </section>

      {/* Creation Interface */}
      <section className="py-16 bg-gradient-to-b from-space-dark via-space-blue to-space-dark relative">
        <div className="container mx-auto px-6 relative z-10">

          {/* Toggle Preview/Edit */}
          <div className="flex justify-center mb-8">
            <div className="glass-effect rounded-full p-1 border border-white/20">
              <button
                onClick={() => setIsPreview(false)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${!isPreview
                    ? 'bg-stellar-gold text-space-dark'
                    : 'text-stellar-gold hover:text-white'
                  }`}
              >
                <i className="fas fa-edit mr-2"></i>Edit
              </button>
              <button
                onClick={() => setIsPreview(true)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${isPreview
                    ? 'bg-stellar-gold text-space-dark'
                    : 'text-stellar-gold hover:text-white'
                  }`}
              >
                <i className="fas fa-eye mr-2"></i>Preview
              </button>
            </div>
          </div>

          {!isPreview ? (
            
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Title */}
                  <div className="glass-effect rounded-2xl p-6 border border-white/20">
                    <label className="block font-orbitron text-lg font-bold mb-4 text-stellar-gold">
                      <i className="fas fa-heading mr-2"></i>Chronicle Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter your cosmic chronicle title..."
                      className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-input-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Content */}
                  <div className="glass-effect rounded-2xl p-6 border border-white/20">
                    <label className="block font-orbitron text-lg font-bold mb-4 text-stellar-gold">
                      <i className="fas fa-file-alt mr-2"></i>Your Chronicle Content
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Write your space chronicle here... Share your discoveries, thoughts, and cosmic adventures. Let your imagination soar across the universe..."
                      rows={15}
                      className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 cosmic-textarea-glow focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="glass-effect rounded-2xl p-6 border border-white/20">
                    <label className="block font-orbitron text-lg font-bold mb-4 text-stellar-gold">
                      <i className="fas fa-quote-left mr-2"></i>Chronicle Preview
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Write a compelling excerpt that will appear in the blog preview..."
                      rows={3}
                      className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-stellar-gold focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                  {/* Category */}
                  <div className="glass-effect rounded-2xl p-6 border border-white/20">
                    <label className="block font-orbitron text-lg font-bold mb-4 text-stellar-gold">
                      <i className="fas fa-tag mr-2"></i>Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full bg-black/50 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-stellar-gold focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="glass-effect rounded-2xl p-6 border border-white/20">
                    <label className="block font-orbitron text-lg font-bold mb-4 text-stellar-gold">
                      <i className="fas fa-tags mr-2"></i>Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="space, exploration, mars, nasa"
                      className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-stellar-gold focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                    />
                    <p className="text-xs text-gray-400 mt-2">Separate tags with commas</p>
                  </div>
                  <div>
                  </div>

                  {/* Cover Image */}
                  <div className="glass-effect rounded-2xl p-6 border border-white/20">
                    <label className="block font-orbitron text-lg font-bold mb-4 text-stellar-gold">
                      <i className="fas fa-image mr-2"></i>Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => handleInputChange('coverImage', e.target.value)}
                      placeholder="https://example.com/space-image.jpg"
                      className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-stellar-gold focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                    />
                  </div>

                  {/* Publishing Actions */}
                  <div className="glass-effect rounded-2xl p-6 border border-white/20">
                    <h3 className="font-orbitron text-lg font-bold mb-4 text-stellar-gold">
                      <i className="fas fa-rocket mr-2"></i>Launch Chronicle
                    </h3>
                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-white/50 text-space-dark font-bold py-3 rounded-xl hover:from-aurora-green hover:to-stellar-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Publishing to Cosmos...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-satellite mr-2"></i>
                            Publish Chronicle
                          </>
                        )}
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
          
            <div className="max-w-4xl mx-auto">
              <div className="glass-effect rounded-2xl p-8 border border-white/20">
                {/* Preview Header */}
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 rounded-full bg-stellar-gold/20 border border-stellar-gold/30 mb-4">
                    <i className="fas fa-eye mr-2 text-stellar-gold"></i>
                    <span className="text-stellar-gold font-medium">Chronicle Preview</span>
                  </div>
                </div>

                {/* Cover Image Preview */}
                {formData.coverImage && (
                  <div className="mb-8 rounded-xl overflow-hidden">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Category Badge */}
                {selectedCategory && (
                  <div className="mb-4">
                    <span className={`${selectedCategory.color} text-sm font-medium px-3 py-1 rounded-full bg-white/10 border border-white/20`}>
                      {selectedCategory.label}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 text-glow">
                  {formData.title || "Your Chronicle Title"}
                </h1>

                {/* Excerpt */}
                {formData.excerpt && (
                  <div className="mb-8 p-4 border-l-4 border-stellar-gold bg-stellar-gold/10 rounded-r-lg">
                    <p className="text-lg italic text-gray-300">
                      {formData.excerpt}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {formData.tags && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-full text-sm text-cosmic-purple"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {formData.content || "Your chronicle content will appear here..."}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span><i className="fas fa-calendar mr-1"></i>Today</span>
                    <span><i className="fas fa-clock mr-1"></i>~{Math.max(1, Math.ceil(formData.content.length / 200))} min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-user-astronaut"></i>
                    <span>Space Explorer</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
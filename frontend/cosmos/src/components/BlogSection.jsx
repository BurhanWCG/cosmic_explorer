import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicBlogPosts } from "../redux/slices/createblogSlice"; 

export default function BlogSection() {
  const dispatch = useDispatch();
  const { publicBlogs, publicStatus, publicError } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchPublicBlogPosts());
  }, [dispatch]);

  const getCategoryColor = (category) => {
    switch (category?.toUpperCase()) {
      case "FEATURED ARTICLE":
        return "text-aurora-green";
      case "LUNAR SCIENCE":
        return "text-stellar-gold";
      case "SPACE TECH":
        return "text-mars-red";
      default:
        return "text-stellar-gold";
    }
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-space-blue to-cosmic-purple relative">
      <div className="absolute inset-0 star-field opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-glow">
            <i className="fas fa-blog mr-4 text-aurora-green"></i>
            Cosmic Chronicles
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Deep insights into space exploration, astronomical phenomena, and the mysteries of the universe.
          </p>
        </div>

        {publicStatus === "loading" && (
          <p className="text-center text-aurora-green text-lg">Loading blog posts...</p>
        )}

        {publicStatus === "failed" && (
          <p className="text-center text-red-500 text-lg">Failed to load posts: {publicError}</p>
        )}

        {publicStatus === "succeeded" && publicBlogs.length === 0 && (
          <p className="text-center text-gray-400 text-lg">No blog posts available.</p>
        )}

        {publicStatus === "succeeded" && publicBlogs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {publicBlogs.map((post) => (
              <article key={post.id} className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-white/20">
                <img 
                  src={post.cover_image} 
                  alt={post.alt || "Blog post image"} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <span className={`${getCategoryColor(post.category)} text-sm font-medium uppercase tracking-wide`}>
                    {post.category}
                  </span>
                  <h3 className="font-orbitron text-xl font-bold mb-3 text-glow">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{post.readTime || "N/A"}</span>
                    <button className="text-stellar-gold hover:text-aurora-green transition-colors duration-300 font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="px-8 py-4 glass-effect border-2 border-aurora-green text-aurora-green font-bold rounded-full hover:bg-aurora-green hover:text-space-dark transition-all duration-300">
            <i className="fas fa-book-open mr-2"></i>
            Explore All Articles
          </button>
        </div>
      </div>
    </section>
  );
}

// src/pages/BlogDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/public-posts/${id}/`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Blog not found or server error.");
        setLoading(false);
      });
  }, [id]);

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

  if (loading)
    return <p className="text-center text-white mt-32 text-lg">Loading blog...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-32 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-blue to-space-dark text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 cosmic-gradient star-field relative">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-glow">
            {blog.title}
          </h1>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${getCategoryColor(blog.category)}`}>
              {blog.category}
            </span>
            <span className="text-gray-400 text-sm">{blog.readTime || "N/A"}</span>
            <span className="text-gray-400 text-sm">{blog.created_at?.slice(0, 10)}</span>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {blog.excerpt || "No excerpt available."}
          </p>
        </div>
        <div className="absolute inset-0 opacity-40">
          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="glass-effect p-8 rounded-2xl border border-white/20 shadow-lg">
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
            {blog.content || blog.excerpt || "No content available."}
          </p>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-stellar-gold text-space-dark font-bold rounded-full hover:bg-aurora-green transition-all duration-300"
            >
              <i className="fas fa-arrow-left mr-2"></i>Back to Blogs
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

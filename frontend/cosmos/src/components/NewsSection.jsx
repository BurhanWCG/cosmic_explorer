import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewsSection() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getCategoryColor = (category) => {
    switch (category) {
      case "MARS EXPLORATION":
        return "text-stellar-gold";
      case "ISS MISSION":
        return "text-aurora-green";
      case "DEEP SPACE":
        return "text-cosmic-purple";
      default:
        return "text-stellar-gold";
    }
  };

  useEffect(() => {
    axios.get("https://api.spaceflightnewsapi.net/v4/articles/?limit=12")
      .then((res) => {
        const formatted = res.data.results.map((article, index) => ({
          id: article.id || index,
          category: article.news_site.toUpperCase(),
          title: article.title,
          excerpt: article.summary,
          date: new Date(article.published_at).toLocaleDateString(),
          image: article.image_url,
          alt: article.title,
          url: article.url,
        }));
        setNewsArticles(formatted.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
        if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          setError("No response from server. Please check your network connection.");
        } else {
          setError("Unexpected error occurred. Please try again.");
        }
        setLoading(false);
      });
  }, []);

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-space-dark to-space-blue relative">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Purple and blue space nebula background" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-glow">
            <i className="fas fa-newspaper mr-4 text-stellar-gold"></i>
            Latest Space News
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest discoveries, missions, and breakthroughs in space exploration.
          </p>
        </div>

        {error && (
          <div className="text-center text-red-400 text-lg mb-8">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-white text-lg">Loading latest news...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {newsArticles.map((article) => (
              <article key={article.id} className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-white/20">
                <img src={article.image} alt={article.alt} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className={`${getCategoryColor(article.category)} text-sm font-medium`}>
                    {article.category}
                  </span>
                  <h3 className="font-orbitron text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{article.date}</span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stellar-gold hover:text-aurora-green transition-colors duration-300 font-medium"
                    >
                      Read More <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate("/news")}
            className="px-8 py-4 glass-effect border-2 border-stellar-gold text-stellar-gold font-bold rounded-full hover:bg-stellar-gold hover:text-space-dark transition-all duration-300"
          >
            <i className="fas fa-newspaper mr-2"></i>
            View All News
          </button>
        </div>
      </div>
    </section>
  );
}

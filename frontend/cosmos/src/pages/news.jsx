import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allNewsArticles, setAllNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const articlesPerPage = 6;

  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v4/articles/?limit=30")
      .then((res) => {
        const formatted = res.data.results.map((article, index) => ({
          id: article.id || index,
          category: article.news_site.toUpperCase(),
          title: article.title,
          excerpt: article.summary,
          date: new Date(article.published_at).toLocaleDateString(),
          readTime: "4 min read",
          image: article.image_url,
          alt: article.title,
          url: article.url,
        }));
        setAllNewsArticles(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          setError("No response from server. Please check your network.");
        } else {
          setError("Unexpected error occurred. Please try again.");
        }
        setLoading(false);
      });
  }, []);

  const categories = [
    { value: "all", label: "All News" },
    ...Array.from(new Set(allNewsArticles.map((a) => a.category))).map((cat) => ({
      value: cat,
      label: cat.replace(/_/g, " ").toUpperCase(),
    })),
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? allNewsArticles
      : allNewsArticles.filter((article) => article.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

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

  
  const generatePagination = (totalPages, currentPage) => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-20 pb-16 cosmic-gradient star-field relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 text-glow">
              <i className="fas fa-newspaper mr-4 text-stellar-gold"></i>
              Space News Center
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Stay informed with the latest discoveries, missions, and breakthroughs in space exploration from across the cosmos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-space-dark to-space-blue relative">
        <div className="container mx-auto px-6 relative z-10">
          {error && (
            <div className="text-center text-red-400 text-lg mb-8">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-center text-white text-lg">Loading news...</p>
          ) : (
            <>
              {/* Category Filter */}
              <div className="mb-12">
                <h3 className="font-orbitron text-xl font-bold mb-6 text-center">Filter by Category</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        selectedCategory === category.value
                          ? "bg-stellar-gold text-space-dark border-stellar-gold"
                          : "glass-effect border-white/30 hover:border-stellar-gold hover:text-stellar-gold"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* News Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentArticles.map((article) => (
                  <article
                    key={article.id}
                    className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-white/20"
                  >
                    <img src={article.image} alt={article.alt} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-400">{article.readTime}</span>
                      </div>
                      <h3 className="font-orbitron text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-stellar-gold hover:bg-stellar-gold hover:text-space-dark"
                    }`}
                  >
                    <i className="fas fa-chevron-left mr-2"></i>Previous
                  </button>

                  {generatePagination(totalPages, currentPage).map((page, index) => (
                    <button
                      key={index}
                      disabled={page === "..."}
                      onClick={() => typeof page === "number" && handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-stellar-gold text-space-dark"
                          : page === "..."
                          ? "text-gray-500 cursor-default"
                          : "glass-effect border border-white/30 hover:border-stellar-gold hover:text-stellar-gold"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-stellar-gold hover:bg-stellar-gold hover:text-space-dark"
                    }`}
                  >
                    Next<i className="fas fa-chevron-right ml-2"></i>
                  </button>
                </div>
              )}

              {/* Info */}
              <div className="text-center mt-8">
                <p className="text-gray-400">
                  Showing {startIndex + 1}-{Math.min(startIndex + articlesPerPage, filteredArticles.length)} of{" "}
                  {filteredArticles.length} articles
                  {selectedCategory !== "all" && ` in ${selectedCategory}`}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

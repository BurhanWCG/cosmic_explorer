import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import CreateBlogPage from "./pages/create_blog";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import NewsPage from "./pages/news";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import BlogDetailPage from "./pages/BlogDetailPage"; // <-- import your new page

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/create_blog" element={<CreateBlogPage />} />
          
          <Route path="/blog/:id" element={<BlogDetailPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

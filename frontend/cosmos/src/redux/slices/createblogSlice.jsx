import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("access");
const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

// Fetch public posts 
export const fetchPublicBlogPosts = createAsyncThunk(
  "blogs/fetchPublicBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/blog/public-posts/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch authenticated posts 
export const fetchBlogPosts = createAsyncThunk(
  "blogs/fetchBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/blog/posts/", {
        headers: authHeaders,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create a new post
export const createBlogPost = createAsyncThunk(
  "blogs/createBlogPost",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/blog/posts/",
        blogData,
        { headers: authHeaders }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update existing post
export const updateBlogPost = createAsyncThunk(
  "blogs/updateBlogPost",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/blog/posts/${id}/`,
        updatedData,
        { headers: authHeaders }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete post by ID
export const deleteBlogPost = createAsyncThunk(
  "blogs/deleteBlogPost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/blog/posts/${id}/`, {
        headers: authHeaders,
      });
      return id; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],              
    publicBlogs: [],       
    status: "idle",         
    publicStatus: "idle",   
    error: null,            
    publicError: null,      
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch public blogs
      .addCase(fetchPublicBlogPosts.pending, (state) => {
        state.publicStatus = "loading";
      })
      .addCase(fetchPublicBlogPosts.fulfilled, (state, action) => {
        state.publicStatus = "succeeded";
        state.publicBlogs = action.payload;
      })
      .addCase(fetchPublicBlogPosts.rejected, (state, action) => {
        state.publicStatus = "failed";
        state.publicError = action.payload;
      })

      //Fetch authenticated blogs
      .addCase(fetchBlogPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //Create post
      .addCase(createBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //Update post
      .addCase(updateBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.blogs.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🔹 Delete post
      .addCase(deleteBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = state.blogs.filter((post) => post.id !== action.payload);
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;

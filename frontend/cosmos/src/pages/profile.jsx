import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogPosts, updateBlogPost, deleteBlogPost } from '../redux/slices/createblogSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const { blogs: recentPosts, status, error } = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.auth.user);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');

    const [isEditingPost, setIsEditingPost] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const [userInfo, setUserInfo] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
    });

useEffect(() => {
    if (user?.token) { 
        dispatch(fetchBlogPosts());
    }
}, [dispatch, user?.token]);

    useEffect(() => {
        if (user) {
            setUserInfo({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                username: user.username || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleSaveProfile = () => {
       
        setIsEditingProfile(false);
    };

    const handleEditPost = (post) => {
        setEditingPost({ ...post });
        setIsEditingPost(true);
    };

    const handleSavePost = async () => {
        try {
            await dispatch(updateBlogPost({ id: editingPost.id, updatedData: editingPost })).unwrap();
            setIsEditingPost(false);
            setEditingPost(null);
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post');
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await dispatch(deleteBlogPost(postId)).unwrap();
            alert('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-space-dark via-space-blue to-cosmic-purple relative overflow-hidden">
            {/* Navigation */}
            <nav className="relative z-10 p-6">
                <Link to="/" className="inline-flex items-center text-white hover:text-stellar-gold transition-colors duration-300">
                    <i className="fas fa-arrow-left mr-2"></i>
                    <span className="font-orbitron font-bold">Back to Explorer</span>
                </Link>
            </nav>

            <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
                {/* Profile Header */}
                <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/20">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stellar-gold via-aurora-green to-mars-red p-1">
                                <div className="w-full h-full rounded-full bg-space-dark flex items-center justify-center">
                                    <i className="fas fa-user-astronaut text-3xl text-white"></i>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="font-orbitron text-2xl font-bold text-glow mb-2">
                                        {user.first_name} {user.last_name}
                                    </h1>
                                    <p className="text-stellar-gold text-lg">@{user.username}</p>
                                </div>
                                <button
                                    onClick={() => (isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true))}
                                    className="px-6 py-2 bg-gradient-to-r from-stellar-gold to-aurora-green text-space-dark font-medium rounded-full hover:from-aurora-green hover:to-stellar-gold transition-all duration-300"
                                >
                                    <i className={`fas ${isEditingProfile ? 'fa-save' : 'fa-edit'} mr-2`}></i>
                                    {isEditingProfile ? 'Save' : 'Edit Profile'}
                                </button>
                            </div>

                            {isEditingProfile ? (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={userInfo.first_name}
                                        onChange={(e) => setUserInfo({ ...userInfo, first_name: e.target.value })}
                                        className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white"
                                        placeholder="First Name"
                                    />
                                    <input
                                        type="text"
                                        value={userInfo.last_name}
                                        onChange={(e) => setUserInfo({ ...userInfo, last_name: e.target.value })}
                                        className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white"
                                        placeholder="Last Name"
                                    />
                                    <input
                                        type="text"
                                        value={userInfo.username}
                                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                                        className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white"
                                        placeholder="Username"
                                    />
                                    <input
                                        type="email"
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                        className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white"
                                        placeholder="Email"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2 text-gray-300">
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Username:</strong> {user.username}</p>
                                    <p><strong>First Name:</strong> {user.first_name}</p>
                                    <p><strong>Last Name:</strong> {user.last_name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="glass-effect rounded-2xl p-2 mb-8 border border-white/20">
                    <div className="flex gap-2">
                        {[
                            { id: 'overview', label: 'Overview', icon: 'fa-user' },
                            { id: 'posts', label: 'Posts', icon: 'fa-blog' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`bg-white/50 flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-stellar-gold to-aurora-green text-space-dark'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <i className={`fas ${tab.icon} mr-2`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    {activeTab === 'overview' && (
                        <div className="glass-effect rounded-2xl p-6 border border-white/20">
                            <h3 className="font-orbitron text-xl font-bold mb-6 text-glow">
                                <i className="fas fa-user mr-2 text-stellar-gold"></i> Profile Overview
                            </h3>
                            <div className="space-y-2 text-gray-300">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>First Name:</strong> {user.first_name}</p>
                                <p><strong>Last Name:</strong> {user.last_name}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'posts' && (
                        <div className="glass-effect rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-orbitron text-xl font-bold text-glow">
                                    <i className="fas fa-blog mr-2 text-stellar-gold"></i> Your Chronicles
                                </h3>

                                <Link
                                    to="/create_blog"
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-400 text-space-dark font-semibold rounded-full 
             shadow-lg border border-yellow-300
             hover:scale-105 hover:shadow-2xl transition-transform duration-300
             focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                                >
                                    <i className="fas fa-plus mr-2"></i> New Post
                                </Link>

                            </div>

                            {status === 'loading' && <p className="text-white">Loading posts...</p>}
                            {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

                            <div className="grid gap-4">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h4 className="font-orbitron text-lg font-bold text-white mb-2">{post.title}</h4>
                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                                    <span className="px-2 py-1 bg-stellar-gold/20 text-stellar-gold rounded-full text-xs">{post.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditPost(post)} className="p-2 text-gray-400 hover:text-stellar-gold">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button onClick={() => handleDeletePost(post.id)} className="p-2 text-gray-400 hover:text-mars-red">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm text-gray-400">
                                            <span><i className="fas fa-eye mr-1"></i>{post.views} views</span>
                                            <span><i className="fas fa-heart mr-1"></i>{post.likes} likes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Edit Post Modal */}
                {isEditingPost && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="glass-effect rounded-3xl p-8 max-w-lg w-full border border-white/20">
                            <h3 className="font-orbitron text-xl font-bold mb-6 text-glow">
                                <i className="fas fa-edit mr-2 text-stellar-gold"></i> Edit Post
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={editingPost.title || ''}
                                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                    className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white"
                                    placeholder="Post Title"
                                />
                                <input
                                    type="text"
                                    value={editingPost.category || ''}
                                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                                    className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white"
                                    placeholder="Category"
                                />
                                <textarea
                                    value={editingPost.content || ''}
                                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                    className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white resize-none"
                                    rows={5}
                                    placeholder="Post Content"
                                />
                                <input
                                    type="text"
                                    value={editingPost.tags || ''}
                                    onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value })}
                                    className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white"
                                    placeholder="Tags (comma separated)"
                                />
                                <textarea
                                    value={editingPost.summary || ''}
                                    onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                                    className="w-full bg-space-dark/50 border border-white/30 rounded-xl px-4 py-2 text-white resize-none"
                                    rows={3}
                                    placeholder="Summary"
                                />
                                <div className="flex gap-4 justify-end">
                                    <button
                                        onClick={() => {
                                            setIsEditingPost(false);
                                            setEditingPost(null);
                                        }}
                                        className="px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSavePost}
                                        className="px-6 py-2 bg-white/50 text-space-dark font-medium rounded-full hover:from-aurora-green hover:to-stellar-gold"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

import React, { useState,useEffect } from 'react';
import { 
  Paperclip, Smile, Image, Heart, MessageSquare, Send, CornerDownRight, Play
} from 'lucide-react';

export default function ProfilePage() {
  const [newPostText, setNewPostText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
const [userData, setUserData] = useState({ name: 'ArtTemplate', detail: 'Manager' });

  const friends = [
    { name: "Ronald Robertson", role: "Product Designer", avatar: "RR" },
    { name: "Regina Cooper", role: "Project Manager", avatar: "RC" },
    { name: "Judith Black", role: "Creative Director", avatar: "JB" },
    { name: "Dustin Williamson", role: "Web Developer", avatar: "DW" },
    { name: "Nathan Fox", role: "Business Analyst", avatar: "NF" },
    { name: "Calvin Flores", role: "Designer", avatar: "CF" },
    { name: "Brandon Pena", role: "Product Designer", avatar: "BP" },
    { name: "Courtney Nguyen", role: "Designer", avatar: "CN" },
    { name: "Kathryn Cooper", role: "Developer", avatar: "KC" },
    { name: "Cody Lane", role: "Web Developer", avatar: "CL" }
  ];

  const photos = [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=150",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150",
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=150",
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=150",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=150",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150"
  ];

  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      author: "Dustin Williamson",
      avatar: "DW",
      date: "Jan 17, 2020",
      content: "Above all, think of life as a prototype. We can conduct experiments, make discoveries, and change our perspectives. We can look for opportunities to turn processes into projects that have tangible outcomes. We can learn how to take joy in the things we create whether they take the form of a fleeting experience or an heirloom that will last for generations.",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
      likes: 50,
      hasLiked: false,
      comments: [
        { id: 101, author: "Judith Black", time: "1 day ago", avatar: "JB", text: "Very interesting and informative article. I learned a lot of new and interesting. 😥", likes: 5, hasLiked: false },
        { id: 102, author: "Nathan Fox", time: "5 min ago", avatar: "NF", text: "Hello! I agree, a very interesting article. Thank you very much!", likes: 0, hasLiked: false, isReply: true },
        { id: 103, author: "Calvin Flores", time: "2 day ago", avatar: "CF", text: "Thanks for the good article. Looking forward to new ones. 😇", likes: 3, hasLiked: false }
      ]
    },
    {
      id: 2,
      author: "Dustin Williamson",
      avatar: "DW",
      date: "Jan 15, 2020",
      content: "Creativity is to discover a question that has never been asked. If one brings up an idiosyncratic question, the answer he gives will necessarily be unique as well.",
      videoPlaceholder: true,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      likes: 50,
      hasLiked: false,
      comments: [
        { id: 201, author: "Regina Cooper", time: "5 day ago", avatar: "RC", text: "Very interesting and informative. I learned a lot of new and interesting things.", likes: 5, hasLiked: false },
        { id: 202, author: "Ronald Robertson", time: "6 day ago", avatar: "RR", text: "Hello! I agree, a very interesting. Thank you very much! 🤫", likes: 3, hasLiked: false }
      ]
    }
  ]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "Jane Wilson",
      avatar: "JW",
      date: "Just now",
      content: newPostText,
      likes: 0,
      hasLiked: false,
      comments: []
    };

    setFeedPosts([newPost, ...feedPosts]);
    setNewPostText('');
  };

    useEffect(() => {
      const sessionData = sessionStorage.getItem('userSession');
      const registeredData = sessionStorage.getItem('registeredUser');
  
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
        
        if (registeredData) {
          const parsedRegister = JSON.parse(registeredData);
          setUserData({
            name: parsedRegister.fullName || parsedSession.email,
            detail: parsedSession.email
          });
        } else {
          setUserData({
            name: parsedSession.email.split('@')[0],
            detail: parsedSession.email
          });
        }
      }
    }, []);

  const handleLikePost = (postId) => {
    setFeedPosts(feedPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  const handleLikeComment = (postId, commentId) => {
    setFeedPosts(feedPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(c => {
            if (c.id === commentId) {
              return {
                ...c,
                likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
                hasLiked: !c.hasLiked
              };
            }
            return c;
          })
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setFeedPosts(feedPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              author: "Jane Wilson",
              avatar: "JW",
              time: "Just now",
              text: text,
              likes: 0,
              hasLiked: false
            }
          ]
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-80 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col shrink-0 gap-6">
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
            <div className="relative w-28 h-28 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
                alt="Jane Wilson"
                className="w-full h-full rounded-full object-cover border-2 border-[#1b873a]/25"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-tight">
               <span className="font-semibold text-gray-500">{userData.name}</span>
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-1">Creative Director</p>
          </div>
          <div className="space-y-4 pb-6 border-b border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Info</h4>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">Email</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{userData.detail}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">Phone</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">+1 (070) 123-8459</p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">Birthday</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">17 March, 1995</p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">Location</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">New York, NY</p>
            </div>
          </div>
          <div className="pb-6 border-b border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Friends</h4>
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {friends.map((friend, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {friend.avatar}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-gray-800 truncate leading-none">{friend.name}</h5>
                    <span className="text-[10px] text-gray-400 font-medium">{friend.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Photos</h4>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((src, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-100">
                  <img src={src} alt="Grid Item" className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" />
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="flex-1 w-full space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                JW
              </div>
              <textarea 
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Write something..."
                rows={2}
                className="w-full border-0 p-1 text-sm text-gray-700 outline-none resize-none focus:ring-0 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
              <button 
                onClick={handleCreatePost}
                className="px-5 py-2 bg-[#1b873a] hover:bg-[#14662b] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Post
              </button>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="p-1.5 hover:text-gray-600 rounded-lg transition-colors"><Paperclip size={16} /></button>
                <button className="p-1.5 hover:text-gray-600 rounded-lg transition-colors"><Smile size={16} /></button>
                <button className="p-1.5 hover:text-gray-600 rounded-lg transition-colors"><Image size={16} /></button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {feedPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">
                    {post.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 leading-none">{post.author}</h4>
                    <span className="text-[10px] text-gray-400 font-semibold">{post.date}</span>
                  </div>
                </div>
                {post.image && (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-50 aspect-video max-h-[380px] bg-gray-50">
                    <img src={post.image} alt="Timeline Media" className="w-full h-full object-cover" />
                    {post.videoPlaceholder && (
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <button className="w-14 h-14 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-all pl-1">
                          <Play size={20} className="fill-current text-gray-800" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-6 text-gray-400 text-xs font-bold pt-1 border-b border-gray-50 pb-3">
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${post.hasLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                  >
                    <Heart size={16} className={post.hasLiked ? 'fill-current' : ''} />
                    <span>{post.likes}</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={16} />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className="relative flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden px-3.5 focus-within:border-gray-300 transition-colors">
                  <input 
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    className="w-full py-3.5 text-sm outline-none border-0 focus:ring-0 text-gray-700 placeholder-gray-400 pr-16 bg-transparent"
                  />
                  <div className="absolute right-3.5 flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600"><Smile size={16} /></button>
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="text-[#1b873a] hover:text-[#14662b]"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
                {post.comments.length > 0 && (
                  <div className="pt-2 space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className={`flex items-start gap-3 ${comment.isReply ? 'pl-8' : ''}`}>
                        {comment.isReply && <CornerDownRight size={16} className="text-gray-300 shrink-0 mt-1" />}
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {comment.avatar}
                        </div>
                        <div className="flex-1 bg-[#f8fafc]/50 border border-gray-50 p-3 rounded-2xl">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-gray-800">{comment.author}</h5>
                            <span className="text-[10px] text-gray-400 font-semibold">{comment.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{comment.text}</p>
                          
                          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mt-2">
                            <button 
                              onClick={() => handleLikeComment(post.id, comment.id)}
                              className={`flex items-center gap-1 hover:text-red-500 transition-colors ${comment.hasLiked ? 'text-red-500' : ''}`}
                            >
                              <Heart size={12} className={comment.hasLiked ? 'fill-current' : ''} />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="hover:text-gray-600">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
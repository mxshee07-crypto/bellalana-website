import React, { useState } from 'react';
import { Heart, MessageCircle, Instagram, ExternalLink, Sparkles, Send, Check } from 'lucide-react';
import { InstagramPost } from '../types/index.ts';

interface InstagramFeedProps {
  posts: InstagramPost[];
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPostIds, setLikedPostIds] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      counts[p.id] = p.likes;
    });
    return counts;
  });
  const [commentsMap, setCommentsMap] = useState<Record<string, string[]>>({
    'ig-1': ['Such an ethereal shade of pink! 😍', 'Are custom wooden handles available?'],
    'ig-2': ['That daisy detail is everything!! Need one right now 🌼', 'Ordered! Can’t wait!'],
    'ig-3': ['These would make the most magical anniversary gift 💐🕊️'],
  });
  const [newComment, setNewComment] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleLike = (postId: string) => {
    setLikedPostIds((prev) => {
      const isLiked = !prev[postId];
      setLikeCounts((c) => ({
        ...c,
        [postId]: (c[postId] || 0) + (isLiked ? 1 : -1),
      }));
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment.trim()],
    }));
    setNewComment('');
  };

  const handleFollowClick = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="instagram" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header and profile info */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F3] text-[#7A3E53] text-xs font-semibold">
          <Instagram className="w-3.5 h-3.5 text-[#D4829A]" />
          <span>JOIN OUR COMMUNITY</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-[#5D2C3D] font-normal tracking-tight">
          Behind The Stitches on Instagram
        </h2>

        <p className="text-sm text-[#7D485B]">
          Daily studio peeks, new bag drops, stitch tutorials, and snapshots of your lovely custom orders.
        </p>

        {/* Instagram Profile Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-[#5D2C3D]">@bellalana.handmade</span>
            <span className="text-xs text-[#9B6A7A]">• 24.8k stitch lovers</span>
          </div>

          <button
            onClick={handleFollowClick}
            className="inline-flex items-center gap-1.5 bg-[#FAF0F3] hover:bg-[#F6DEE5] text-[#7A3E53] border border-[#F2D7DF] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700">Handle Copied!</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Follow on Instagram</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 6-Item Instagram Feed Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {posts.map((post) => {
          const isLiked = likedPostIds[post.id];
          const likesCount = likeCounts[post.id] || post.likes;

          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF0F4] border border-[#F2D7DF] cursor-pointer group shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={post.imageUrl}
                alt="Instagram post from Bellalana"
                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-[#5D2C3D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-3 text-center space-y-2">
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-400 text-red-400' : 'fill-white'}`} />
                    <span>{likesCount}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{(commentsMap[post.id]?.length || 0) + post.commentsCount}</span>
                  </span>
                </div>
                <span className="text-[10px] text-[#FDEEF2] underline opacity-90">View Post Details</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instagram Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#F2D7DF] flex flex-col md:flex-row max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Image Side */}
            <div className="md:w-1/2 bg-[#FAF0F4] relative flex items-center justify-center min-h-[280px]">
              <img
                src={selectedPost.imageUrl}
                alt="Instagram modal"
                className="w-full h-full object-cover max-h-[420px]"
              />
            </div>

            {/* Content & Comments Side */}
            <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F8E1E7]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#DE98AC] to-[#8C495E] p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-[#5D2C3D]">
                        B
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#5D2C3D]">bellalana.handmade</p>
                      <p className="text-[10px] text-[#9A6275]">Handmade Crochet Studio</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-[#9A6275] hover:text-[#5D2C3D] p-1 text-sm font-semibold"
                    aria-label="Close Instagram modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Caption */}
                <div className="py-3 text-xs text-[#5D2C3D] space-y-2 border-b border-[#F8E1E7]">
                  <p className="leading-relaxed">{selectedPost.caption}</p>
                  <p className="text-[11px] text-[#A84964] font-medium">
                    {selectedPost.tags.join(' ')}
                  </p>
                  <p className="text-[10px] text-[#A67586]">{selectedPost.timestamp}</p>
                </div>

                {/* Comments list */}
                <div className="py-3 space-y-2 max-h-36 overflow-y-auto">
                  <p className="text-[11px] font-semibold text-[#8C495E]">Community Comments</p>
                  {(commentsMap[selectedPost.id] || []).map((cmt, idx) => (
                    <div key={idx} className="text-xs bg-[#FAF4F5] p-2 rounded-xl text-[#5D2C3D]">
                      <span className="font-semibold text-[#8C495E] mr-1">guest_crafter:</span>
                      <span>{cmt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#F8E1E7] space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleLike(selectedPost.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#5D2C3D] hover:text-[#D44C73]"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedPostIds[selectedPost.id] ? 'fill-red-500 text-red-500' : 'text-[#5D2C3D]'
                      }`}
                    />
                    <span>{likeCounts[selectedPost.id] || selectedPost.likes} likes</span>
                  </button>

                  <span className="text-[11px] text-[#9A6275]">Verified Post</span>
                </div>

                {/* Add Comment Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Leave a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(selectedPost.id);
                    }}
                    className="flex-1 bg-[#FAF4F5] border border-[#F2D7DF] rounded-full px-3 py-1.5 text-xs text-[#5D2C3D] placeholder-[#A67586] focus:outline-hidden focus:border-[#7A3E53]"
                  />
                  <button
                    onClick={() => handleAddComment(selectedPost.id)}
                    className="p-1.5 rounded-full bg-[#7A3E53] text-white hover:bg-[#622E40]"
                    aria-label="Send comment"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

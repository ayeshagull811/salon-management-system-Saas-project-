import React, { useState } from "react";
import { motion } from "framer-motion";

function CommentSection() {
 
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { name: "Guest", text: newComment }]);
    setNewComment("");
  };

  return (
    <section className="bg-pink-50 py-20 mt-20 px-6 md:px-20">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-pink-600 mb-8"
      >
        What Our Clients Say
      </motion.h2>

      {/* Add Comment Box */}
      <div className="max-w-3xl mx-auto mt-10">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleAddComment}
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-2xl shadow hover:bg-pink-600 transition"
        >
          Post Comment
        </button>
      </div>
    </section>
  );
}

export default CommentSection;

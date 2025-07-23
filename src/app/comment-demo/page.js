"use client";

import React, { useState } from "react";
import { CommentInput } from "@/components/CommentInput";

export default function CommentDemo() {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (comment) => {
    const newComment = {
      id: Date.now(),
      text: comment,
      timestamp: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#282828] mb-8">
          CommentInput Component Demo
        </h1>
        
        {/* Demo Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E0E0E0] mb-8">
          <h2 className="text-xl font-semibold text-[#282828] mb-4">
            Comment Input Component
          </h2>
          <p className="text-[#616060] mb-6">
            This component matches the Figma design with responsive behavior and proper styling.
          </p>
          
          <div className="space-y-6">
            {/* Default size */}
            <div>
              <h3 className="text-lg font-medium text-[#282828] mb-3">Default (296px max-width)</h3>
              <CommentInput
                onSubmit={handleCommentSubmit}
                placeholder="Add your comment here..."
              />
            </div>
            
            {/* Full width */}
            <div>
              <h3 className="text-lg font-medium text-[#282828] mb-3">Full Width</h3>
              <CommentInput
                onSubmit={handleCommentSubmit}
                placeholder="Add your comment here..."
                className="w-full max-w-none"
              />
            </div>
            
            {/* In a form context */}
            <div>
              <h3 className="text-lg font-medium text-[#282828] mb-3">In Form Context</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <select className="flex-1 h-12 px-3 border border-[#E6E6E6] rounded-lg bg-white text-[#434343]">
                  <option>Type of Call</option>
                  <option>Inbound</option>
                  <option>Outbound</option>
                </select>
                <select className="flex-1 h-12 px-3 border border-[#E6E6E6] rounded-lg bg-white text-[#434343]">
                  <option>Category Type</option>
                  <option>Inquiry</option>
                  <option>Complaint</option>
                </select>
                <div className="flex-[2] min-w-[296px]">
                  <CommentInput
                    onSubmit={handleCommentSubmit}
                    placeholder="Add your comment here..."
                    className="w-full max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comments Display */}
        {comments.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E0E0E0]">
            <h2 className="text-xl font-semibold text-[#282828] mb-4">
              Submitted Comments
            </h2>
            <div className="space-y-3">
              {comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="p-4 bg-gray-50 rounded-lg border border-[#E6E6E6]"
                >
                  <p className="text-[#282828] font-medium">{comment.text}</p>
                  <p className="text-[#616060] text-sm mt-1">{comment.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

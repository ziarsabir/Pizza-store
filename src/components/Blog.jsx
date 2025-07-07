import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Celebrating 32 Years of Pizza Perfection",
    summary: "Join us as we celebrate just over 3 decades of serving the best pizzas in town.",
    fullText: "Full blog content about our journey, customer love, and our secret to amazing pizzas.",
    image: "/images/pizza-anniversary.jpeg"
  },
  {
    id: 2,
    title: "Our Chef Wins Best Pizza Award",
    summary: "Our head chef has just been awarded the 'Best Pizza Chef of the Year.'",
    fullText: "Details about the award ceremony, our winning recipe, and what's next for our restaurant.",
    image: "/images/pizza-award.jpeg"
  }
];

function Blog() {
  return (
    <section 
      id="Blog" 
      className="font-bold font-italian p-10 bg-[#1E4D2B] text-white"
    >
      {/* Section Title */}
      <h2 className="text-4xl font-semibold text-white text-center mb-8">
        🍕 Latest News &amp; Blog 🍷
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Link 
            to={`/blog/${post.id}`} 
            key={post.id} 
            className="block p-6 bg-[#245430] rounded-lg shadow-lg hover:shadow-2xl transition duration-300 border border-white"
          >
            {/* Blog Title */}
            <h3 className="text-2xl font-bold text-white">{post.title}</h3>
            <p className="text-white mb-4 italic">{post.summary}</p>
            
            {/* Blog Image */}
            <div className="flex justify-center">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-64 object-cover rounded-md shadow-md border border-white" 
              />
            </div>

            {/* Read More Link */}
            <div className="mt-4 text-center">
              <span className="text-white hover:underline text-lg font-semibold">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Blog;

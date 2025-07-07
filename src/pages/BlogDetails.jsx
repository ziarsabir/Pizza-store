import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: "1",
    title: "Celebrating 32 Years of Pizza Perfection",
    fullText: `Join us as we celebrate 32 incredible years of bringing delicious, authentic Italian pizza to our amazing customers. From humble beginnings in a small family kitchen to being voted the best pizza spot in town, our journey has been nothing short of incredible.

Over the years, we've introduced new flavors, perfected our crust, and stayed true to the traditional Italian recipes that make our pizzas stand out. None of this would have been possible without our dedicated team and, of course, our loyal customers who have supported us along the way.

To celebrate, we're offering exclusive discounts, special edition pizzas, and a chance to win free pizza for a year! Join us in the festivities and raise a slice to 32 years of excellence! 🍕🎉`,
    image: "/images/pizza-anniversary.jpeg",
  },
  {
    id: "2",
    title: "Our Chef Wins Best Pizza Award",
    fullText: `We're incredibly proud to announce that our head chef, Marco Rossi, has been crowned the 'Best Pizza Chef of the Year' in the prestigious National Pizza Awards! 

Marco's journey began in Naples, where he learned the art of pizza-making from his grandmother. His passion and dedication to crafting the perfect pizza have won over customers and critics alike. The secret? A perfect balance of fresh, high-quality ingredients, a time-tested dough recipe, and a whole lot of love.

Winning this award is a huge honor, and Marco is excited to keep creating new and exciting pizza flavors for you to enjoy. Stop by and taste the award-winning pizza yourself!`,
    image: "/images/pizza-award.jpeg",
  },
];

function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    // Scroll to the top when the component loads
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div className="font-bold font-italian p-6 bg-gray-900 text-white min-h-screen mt-14">
        {blogPosts.map((post) => {
          if (post.id === id) {
            return (
              <div key={post.id} className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-green-400 mb-4 text-center">
                  {post.title}
                </h2>
  
                <div className="flex justify-center mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-3/4 md:w-1/2 h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
  
                <p className="text-gray-300 leading-relaxed">{post.fullText}</p>
  
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      navigate("/"); 
                      setTimeout(() => {
                        const section = document.getElementById("Blog");
                        if (section) {
                          section.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    }}
                    className="text-green-400 hover:underline text-lg font-semibold"
                  >
                    ← Back to Blog Section
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
  
        {!blogPosts.some((post) => post.id === id) && (
          <div className="text-center text-white py-10">
            <h2 className="text-3xl font-bold text-red-500">Blog Not Found</h2>
            <button
              onClick={() => {
                window.location.href = "/?scrollTo=Blog";
              }}
              className="text-green-400 hover:underline text-lg font-semibold"
            >
              ← Back to Blog
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default BlogDetails;
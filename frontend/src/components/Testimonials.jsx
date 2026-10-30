import React, { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rohan Sharma",
    role: "Property Buyer",
    tag: "Verified Buyer",
    location: "Vasant Kunj, Delhi",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    content: "Mujhe Vasant Kunj me 3BHK flat dhoondne me bohot help mili. Listing bilkul accurate thi aur paperwork bilkul hassle-free raha!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "House Owner",
    tag: "Verified Owner",
    location: "South Ext, Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    content: "Apni property rent par dene ke liye sabse behtar platform. 3 din ke andar tension-free verified tenant mil gaya.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Real Estate Investor",
    tag: "Verified Investor",
    location: "Dwarka, Delhi",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150",
    content: "Filters aur search system bohot fast hai. Budget aur location ke hisab se exact options mil jate hain. Totally recommended!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-linear-to-b from-blue-50/50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorative Blur Circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100/80 px-3 py-1.5 rounded-full border border-blue-200">
              CLIENT STORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight font-serif">
              Trusted by Homeowners & Buyers
            </h2>
            <p className="mt-2 text-gray-500 text-base">
              See how we helped hundreds of clients find their dream spaces.
            </p>
          </div>

          </div>
        

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => {
            const isFeatured = idx === activeIndex;
            return (
              <div
                key={item.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between hover:-translate-y-2 border-gray-100 hover:border-blue-300 bg-white 
                  
                }`}
              >
                <div>
                  {/* Top Bar: Stars + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 text-sm leading-relaxed italic mb-8 relative z-10">
                    "{item.content}""
                  </p>
                </div>

                {/* Profile Footer */}
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {item.role} • <span className="text-blue-600">{item.location}</span>
                    </p>
                  </div>
                </div>

                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Home, 
  Landmark, 
  Store, 
  Building, 
  Briefcase 
} from "lucide-react";

const propertyCategories = [
  {
    id: 1,
    title: "Apartment",
    type: "Apartment",
    count: "12+ Properties",
    icon: Building2,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "Villa",
    type: "Villa",
    count: "8+ Properties",
    icon: Home,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    title: "Plot",
    type: "Plot",
    count: "15+ Properties",
    icon: Landmark,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: 4,
    title: "Commercial",
    type: "Commercial",
    count: "5+ Properties",
    icon: Store,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 5,
    title: "Independent House",
    type: "Independent House",
    count: "10+ Properties",
    icon: Building,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: 6,
    title: "Office",
    type: "Office",
    count: "6+ Properties",
    icon: Briefcase,
    color: "bg-indigo-50 text-indigo-600",
  },
];

export default function CategorySection() {
  const navigate = useNavigate();

  const handleCategoryClick = (type) => {
    navigate(`/properties?type=${encodeURIComponent(type)}`);
  };

  return (
    <section className="py-12 bg-white from-blue-50/50">
         <div className="absolute top-140 -left-20 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl font-serif">
         Property Type
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Find the right property space tailored for your needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {propertyCategories.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleCategoryClick(item.type)}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-200"
              >
                {/* Icon Container */}
                <div
                        className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.color}`}
                >
                  <IconComponent className="w-7 h-7 stroke-[1.75]" />
                </div>

                {/* Title & Count */}
                <h3 className="mt-4 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-400">
                  {item.count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
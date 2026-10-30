import { mockProperties } from "../data/mockProperties";
import PropertyCard from "../components/PropertyCard";
import SearchBox from "../components/SearchBox";
import CategorySection from "../components/CategorySection";
import Testimonials from "../components/Testimonials";
import { Building, ShieldCheck, Zap, BadgeIndianRupee } from "lucide-react";

export default function Home() {
    const features = [
  {
    id: 1,
    title: "Wide Range of Properties",
    description: "Find apartments, villas, plots, and commercial spaces tailored to your needs.",
    icon: Building,
    bgColor: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "Trusted & Verified Listings",
    description: "Every property listing is thoroughly checked for authenticity and accuracy.",
    icon: ShieldCheck,
    bgColor: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    title: "Easy & Fast Process",
    description: "Connect directly with property managers and owners with zero hassle.",
    icon: Zap,
    bgColor: "bg-amber-50 text-amber-600",
  },
  {
    id: 4,
    title: "Transparent Pricing",
    description: "No hidden charges or unexpected fees during your property hunt.",
    icon: BadgeIndianRupee,
    bgColor: "bg-purple-50 text-purple-600",
  },
];
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-700 to-indigo-800 text-white pt-24 pb-24 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-serif">
            Find Your Dream Property
          </h1>
          <p className="text-gray-200 text-lg">
            Discover thousands of apartments, villas, and plots available for sale and rent.
          </p>
        </div>
      </section>

      {/* Floating Search Bar */}
      <div className="px-4 overflow-hidden">
        <SearchBox />
      </div>

      {/* Category Section */}
      <CategorySection className=" relative overflow-hidden"/>

      

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 font-serif">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>
       {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50/50 from-blue-70/70">
      <div className="absolute top-290 -right-10 w-80 h-80 bg-blue-100/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
              Why Choose Us
            </h2>
            <p className="mt-3 text-base text-gray-600">
              We help you find the best properties with complete peace of mind.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className=" group hover:border-blue-300 bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-gray-400 transition-all duration-300 hover:-translate-y-2 flex flex-col items-start"
                >
                  {/* Icon Box */}
                  <div className={` group-hover:scale-110 transition-all w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.bgColor}`}>
                    <IconComponent className="w-6 h-6 stroke-2" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Testimonial Section */}
      <Testimonials/>
    </div>
  );
}
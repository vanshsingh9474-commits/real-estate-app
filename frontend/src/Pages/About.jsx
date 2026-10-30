import React from "react";
import { 
  ShieldCheck, 
  Search, 
  PhoneCall, 
  Building2, 
  Users, 
  Award,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Verified Listings",
    description: "Every property listed on our platform is verified to ensure authentic pricing and legal clarity.",
    icon: ShieldCheck,
    bgColor: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "Smart Search",
    description: "Filter properties by location, type, and budget to find exact match for your requirement.",
    icon: Search,
    bgColor: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    title: "Direct Contact",
    description: "Connect directly with verified owners and agents without any hidden middleman charges.",
    icon: PhoneCall,
    bgColor: "bg-purple-50 text-purple-600",
  },
];

const stats = [
  { id: 1, value: "2,500+", label: "Properties Listed", icon: Building2 },
  { id: 2, value: "1,200+", label: "Happy Buyers & Renters", icon: Users },
  { id: 3, value: "15+", label: "Cities Covered", icon: Award },
];

export default function About() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      
      {/* Hero Header Section */}
      <section className="py-15 bg-linear-to-b from-blue-50/60 via-white to-white relative overflow-hidden">
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold tracking-widest px-3.5 py-1.5 bg-blue-100/80 border border-blue-200 rounded-full uppercase text-blue-600">ABOUT US</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-4 tracking-tight ">
            About <span className="text-blue-500 ml-2 font-serif">REAL</span>ESTATE
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to helping you find your perfect home, apartment, or plot. Our platform connects property buyers, sellers, and renters with complete transparency and ease.
          </p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-gray-400 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start"
                >
                  {/* Icon Box */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.bgColor}`}>
                    <IconComponent className="w-7 h-7 stroke-2" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter Bar Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-100 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 bg-blue-100/80 text-blue-600 rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission / Values Section */}
      <section className="pb-20 pt-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-blue-100 text-base leading-relaxed mb-6">
              Real estate transaction ko simple, transparent aur digital banana. Humara goal hai ki chahe aap khareed rahe ho, bech rahe ho ya rent par le rahe ho—aapko hassle-free experience mile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-blue-50">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>100% Verified Owners & Listings</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Zero Hidden Commissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Instant Direct Communication</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Smart Search Algorithms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
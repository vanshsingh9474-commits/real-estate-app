import { useParams, Link } from "react-router-dom";
import { mockProperties } from "../data/mockProperties";

export default function PropertyDetails() {
  const { slug } = useParams();
  const property = mockProperties.find((p) => p.slug === slug);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
        <p className="text-gray-500 mt-2">The requested property details are unavailable.</p>
        <Link to="/properties" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link> /{" "}
        <Link to="/properties" className="hover:text-blue-600">Properties</Link> /{" "}
        <span className="text-gray-800 font-medium">{property.title}</span>
      </div>

      {/* Property Media / Main Image */}
<div className="relative w-full h-80 md:h-100 rounded-2xl overflow-hidden shadow-md mb-8 bg-gray-900 flex items-center justify-center">
  {/* Blurred background image */}
  <img
    src={property.images[0]}
    alt={property.title}
    className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-105"
  />
  {/* Main crisp image inside */}
  <img
    src={property.images[0]}
    alt={property.title}
    className="relative z-10 max-h-full max-w-full object-contain"
  />
</div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-4">
              <div>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded">
                  For {property.purpose}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                  {property.title}
                </h1>
                <p className="text-gray-500 text-sm mt-1">📍 {property.location}, {property.city}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                  ₹{property.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Quick Overview Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 bg-gray-50 rounded-xl text-center">
              <div>
                <p className="text-xs text-gray-500">Bedrooms</p>
                <p className="text-base font-bold text-gray-800">🛏️ {property.bedrooms}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Bathrooms</p>
                <p className="text-base font-bold text-gray-800">🚿 {property.bathrooms}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Area</p>
                <p className="text-base font-bold text-gray-800">📐 {property.area} {property.areaUnit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Furnishing</p>
                <p className="text-base font-bold text-gray-800">{property.furnished}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About this property</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Action Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-20">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Owner / Agent</h3>
            <p className="text-xs text-gray-500 mb-6">Send an inquiry to get response from the seller.</p>
            
            <button
              onClick={() => alert("Inquiry sent successfully!")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm mb-3 text-sm"
            >
              Send Message
            </button>
            <button
              onClick={() => alert("Phone number: +91 98765 43210")}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-xl transition-colors text-sm"
            >
              Show Contact Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
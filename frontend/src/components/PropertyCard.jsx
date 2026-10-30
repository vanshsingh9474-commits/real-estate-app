import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-2 hover:shadow-gray-400">
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
          For {property.purpose}
        </span>
        {property.featured && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xl font-bold text-blue-600 mb-1">
          ₹{property.price.toLocaleString("en-IN")}
        </p>
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-2">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          📍 {property.location}, {property.city}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
          <span>📐 {property.area} {property.areaUnit}</span>
        </div>

        <Link
          to={`/properties/${property.slug}`}
          className="mt-4 block w-full text-center bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
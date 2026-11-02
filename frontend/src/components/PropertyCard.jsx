import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  if (!property) return null;

  // 1. Backend Image Handling (Agar array ho, single path ho, ya local uploads folder ka path ho)
  let imageUrl = "https://via.placeholder.com/400x300?text=No+Image";

  if (Array.isArray(property?.images) && property.images.length > 0) {
    imageUrl = property.images[0];
  } else if (typeof property?.images === "string" && property.images.trim() !== "") {
    try {
      const parsed = JSON.parse(property.images);
      imageUrl = Array.isArray(parsed) ? parsed[0] : property.images;
    } catch {
      imageUrl = property.images;
    }
  } else if (property?.image) {
    imageUrl = property.image;
  }

  // Backend local uploads path fixing (agar backend path slash se start na ho)
  if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
    imageUrl = `http://localhost:5000/${imageUrl}`;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all ">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={property?.title || "Property"}
          className="w-full h-48 object-cover"
        />
        {(property?.type || property?.purpose) && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
            For {property?.type || property?.purpose}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xl font-bold text-blue-600 mb-1">
          ₹ {property?.price ? Number(property.price).toLocaleString("en-IN") : "N/A"}
        </p>
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-2">
          {property?.title || "Property Title"}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          📍 {property?.address || property?.location || property?.city || "Location N/A"}
        </p>

        {/* Dynamic Database Fields */}
        <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100">
          <span>🛏️ {property?.bedrooms ?? 0} Beds</span>
          <span>🛁 {property?.bathrooms ?? 0} Baths</span>
          <span>📐 {property?.area ?? 0} sq.ft</span>
        </div>

        <Link
          to={`/properties/${property?.id || property?._id || property?.uuid}`}
          className="mt-4 block w-full text-center bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
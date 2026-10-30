import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { mockProperties } from "../data/mockProperties";
import PropertyCard from "../components/PropertyCard";

export default function Properties() {
  const [searchParams] = useSearchParams();

  // Read search query params dynamically
  const purposeParam = searchParams.get("purpose");
  // Check both 'location' and 'city' params safely
  const locationParam = (searchParams.get("location") || searchParams.get("city") || "").trim().toLowerCase();
  const typeParam = searchParams.get("type");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  // Robust Filter Logic
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((item) => {
      // 1. Purpose Filter (Sale / Rent)
      if (purposeParam && item.purpose && item.purpose.toLowerCase() !== purposeParam.toLowerCase()) {
        return false;
      }

      // 2. Property Type Filter (Villa / Apartment / etc)
      if (typeParam && item.propertyType && item.propertyType.toLowerCase() !== typeParam.toLowerCase()) {
        return false;
      }

      // 3. Location / City Match (Handles commas and spaces)
      if (locationParam) {
        // Remove commas and split into individual search terms
        const searchWords = locationParam
          .split(/[\s,]+/)
          .filter((word) => word.length > 0);

        const propertyFullText = `
          ${item.city || ""} 
          ${item.location || ""} 
          ${item.title || ""}
        `.toLowerCase();

        // Ensure all input words match somewhere in city/location/title
        const matchesAll = searchWords.every((word) => propertyFullText.includes(word));
        if (!matchesAll) return false;
      }

      // 4. Min Price Filter
      if (minPriceParam && Number(item.price) < Number(minPriceParam)) {
        return false;
      }

      // 5. Max Price Filter
      if (maxPriceParam && Number(item.price) > Number(maxPriceParam)) {
        return false;
      }

      return true;
    });
  }, [purposeParam, locationParam, typeParam, minPriceParam, maxPriceParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh]">
      {/* Fixed Header String Interpolation */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {purposeParam ? `Properties for ${purposeParam}` : "All Properties"}
      </h1>

      {filteredProperties.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm my-6">
          <p className="text-gray-600 text-lg font-semibold">
            No properties found matching your criteria.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try searching for another locality or clear your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </div>
  );
}
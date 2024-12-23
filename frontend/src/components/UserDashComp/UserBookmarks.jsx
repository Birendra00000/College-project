import React from "react";

const UserBookmarks = ({ bookmarks, packages }) => {
  if (!packages || packages.length === 0) {
    return <div>No bookmarks found.</div>;
  }

  const bookmarkedPackages = packages.filter((pkg) =>
    bookmarks.includes(pkg.id)
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Bookmarked Packages</h1>
      {bookmarkedPackages.length === 0 ? (
        <p className="text-gray-600">
          You haven't bookmarked any packages yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
            >
              <img
                src={pkg.image}
                alt={pkg.destination}
                className="h-48 w-full object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{pkg.destination}</h2>
              <p className="text-teal-600 text-lg font-semibold">{pkg.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookmarks;

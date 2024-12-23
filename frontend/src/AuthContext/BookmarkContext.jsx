import { createContext, useContext, useState } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [userBookmarks, setUserBookmarks] = useState([]);

  const toggleBookmark = (id) => {
    setUserBookmarks((prev) =>
      prev.includes(id)
        ? prev.filter((bookmark) => bookmark !== id)
        : [...prev, id]
    );
  };

  return (
    <BookmarkContext.Provider value={{ userBookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);

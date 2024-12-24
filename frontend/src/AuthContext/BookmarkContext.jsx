import { createContext, useContext, useState } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkAllProduct, setBookmarkAllProduct] = useState([]);
  console.log("bookmarkAllProduct,bookmarkAllProduct", bookmarkAllProduct);
  return (
    <BookmarkContext.Provider
      value={{ bookmarkAllProduct, setBookmarkAllProduct }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  return useContext(BookmarkContext);
};

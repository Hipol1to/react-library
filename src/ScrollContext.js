import React, { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrollToId, setScrollToId] = useState(null);

  const triggerScroll = (id) => {
    setScrollToId(id);
  };

  return (
    <ScrollContext.Provider value={{ scrollToId, triggerScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);

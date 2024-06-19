// UserContext.js
import React, { createContext, useState, useContext } from "react";

const OurCategoriesContext = createContext();

export const useOurCategoriesContext = () => {
  return useContext(OurCategoriesContext);
};

export const OurCategoriesProvider = ({ children }) => {
  const [ourCategories, setOurCategories] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <OurCategoriesContext.Provider
      value={{ ourCategories, setOurCategories, messages, setMessages }}
    >
      {children}
    </OurCategoriesContext.Provider>
  );
};

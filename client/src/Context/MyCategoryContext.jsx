// UserContext.js
import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export const MyCategoryProvider = ({ children }) => {
  const [myCategory, setMyCategory] = useState([]);
  const [messages, setMessages] = useState([]);
  

  return (
    <CategoryContext.Provider
      value={{ myCategory, setMyCategory, messages, setMessages }}
    >
      {children}
    </CategoryContext.Provider>
  );
};


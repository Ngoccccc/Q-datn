// UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { apiUrl } from "../../../setupAxios";

const OurCategoriesContext = createContext();

export const useOurCategoriesContext = () => {
  return useContext(OurCategoriesContext);
};

export const OurCategoriesProvider = ({ children }) => {
  const [ourCategories, setOurCategories] = useState([]);
  const [ourIncomes, setOurIncomes] = useState([]);
  const [messages, setMessages] = useState([]);
  const {selectedChat} = ChatState();

 useEffect(() => {
   if (selectedChat) {
     const config = {
       headers: {
         "Content-type": "application/json",
       },
     };

     axios
       .get(`${apiUrl}/api/category/${selectedChat?._id}`, config)
       .then((res) => {
         setOurCategories(res.data);
       })
       .catch((error) => {
         console.log(error);
       });
   }
 }, [selectedChat]);
  
  useEffect(() => {
    if (selectedChat) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios
        .get(`${apiUrl}/api/income/${selectedChat?._id}`, config)
        .then((res) => {
          setOurIncomes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedChat]);

  return (
    <OurCategoriesContext.Provider
      value={{
        ourCategories,
        setOurCategories,
        messages,
        setMessages,
        ourIncomes,
        setOurIncomes,
      }}
    >
      {children}
    </OurCategoriesContext.Provider>
  );
};

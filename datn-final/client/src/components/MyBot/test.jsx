// src/components/MentionInput.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { useCategoryContext } from "../../Context/MyCategoryContext";
import { toast } from "react-toastify";
import useConversation from "../../zustand/useConversation";

const MentionInput = () => {
  const { myChat } = ChatState();
  const { messages, setMessages } = useConversation();

  const { myCategory } = useCategoryContext();

  const [inputValue, setInputValue] = useState("");
  const [mentions, setMentions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [trigger, setTrigger] = useState(null);
  const [mention, setMention] = useState(null);
  const [category, setCategory] = useState(null);

  const [subcategories, setSubcategories] = useState([]);

  const categories = ["chi tiêu", "lập kế hoạch", "thu nhập"];

  // const subcategories = ["quần áo", "sức khỏe", "cafe"];

  useEffect(() => {
    if (myCategory) {
      const categoryNames = myCategory.map((category) => category.name);
      setSubcategories(categoryNames);
    }
  }, [myCategory]);

  useEffect(() => {
    const triggerChar = inputValue.match(/[@/][^@/]*$/);
    if (triggerChar) {
      const char = triggerChar[0][0];
      if (char === "@") {
        setSuggestions(categories);
        setShowSuggestions(true);
        setTrigger("@");
      } else if (char === "/") {
        setSuggestions(subcategories);
        setShowSuggestions(true);
        setTrigger("/");
      }
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (myChat) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios
        .get(`/api/category/${myChat?._id}`, config)
        .then((res) => {
          const categoryNames = res.data.map((category) => category.name);
          setSubcategories(categoryNames);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [myChat]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    const cursorPosition = inputValue.search(/[@/][^@/]*$/);
    const newValue = inputValue.replace(
      /[@/][^@/]*$/,
      `${trigger}${suggestion} `
    );
    setInputValue(newValue);
    if (trigger === "@") {
      setMention({ value: suggestion, position: cursorPosition });
    } else if (trigger === "/") {
      setCategory({ value: suggestion, position: cursorPosition });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
      handleSubmit();
      setInputValue(""); // Call your function to handle data submission
      setMention(null);
      setCategory(null);
    }
  };

  const handleSubmit = async () => {
    console.log(mention, category, inputValue);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/message`,
        {
          mention: mention,
          category: category,
          content: inputValue,
          chatId: myChat?._id,
        },
        config
      );

      setMessages([...messages, data]);
      console.log(data);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full mx-auto border rounded-lg shadow-md bg-white">
      {showSuggestions && (
        <ul
          //   role="menu"
          //   data-popover="menu"
          data-popover-placement="top"
          className=" z-10 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-800 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          {suggestions.map((suggestion, index) => (
            <li
              role="menuitem"
              className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <input
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type @ for categories or / for subcategories"
      />
    </div>
  );
};

export default MentionInput;

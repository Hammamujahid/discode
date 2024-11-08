"use client";

import Content from "./content/page";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import UploadContent from "./content/upload";
import TopicListWithFollow from "./topic/page";

const HomePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 flex flex-col justify-start items-center pt-10">
        <Content />
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center py-12 px-8">
        <div className="fixed">
        <TopicListWithFollow/>
        <div className="flex justify-center items-center">
        <button
          onClick={togglePopup}
          className="p-2 rounded-full flex justify-center items-center bg-blue-600"
        >
          <FaPlus className="text-white text-4xl" />
        </button>
        </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <UploadContent isOpen={isPopupOpen} onClose={togglePopup} />
        </div>
      )}
    </div>
  );
};

export default HomePage;

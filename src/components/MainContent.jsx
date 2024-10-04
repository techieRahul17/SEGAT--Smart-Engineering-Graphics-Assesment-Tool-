import React, { useContext, useState } from "react";
import {
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import logo from "../assets/custom-logo.png";
import Tesseract from "tesseract.js";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

const MainContent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context);

  const [isDarkTheme, setIsDarkTheme] = useState(false); // Managing theme state

  const handleThemeToggle = () => {
    setIsDarkTheme((prevTheme) => !prevTheme); // Toggle theme state
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const processedImageBuffer = reader.result;

        await uploadBytes(imageRef, processedImageBuffer);
        console.log("Image uploaded successfully!");

        const { data: { text } } = await Tesseract.recognize(
            processedImageBuffer,
            "eng",
            {
              logger: (info) => console.log(info),
            }
        );

        setInput(text);
        onSent(text);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSent();
    }
  };

  // Styles based on light or dark theme
  const themeClass = isDarkTheme ? "dark-theme" : "light-theme";

  return (
      <div className={`flex-1 min-h-screen pb-[15vh] relative ${themeClass}`}>
        {/* Theme Toggle Button */}
        <div className="absolute top-0 left-0 p-5">
          <button
              onClick={handleThemeToggle}
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full shadow-md transition-colors"
          >
            {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </button>
        </div>

        {/* Profile icon placed on top right */}
        <div className="absolute top-0 right-0 p-5">
          <FaUserCircle className="text-4xl cursor-pointer" />
        </div>

        {/* Logo and SEGAT text */}
        <div className="flex flex-col items-center justify-center p-5">
          <img src={logo} alt="Logo" className="w-32 rounded-[50%] mb-3" />
        </div>

        <div className="max-w-[900px] mx-auto">
          {!showResult ? (
              <>
                {/* Centered text */}
                <div className="my-12 text-center p-5">
                  <p className="text-[60px] font-extrabold tracking-wide"
                     style={{fontFamily: 'Nunito, sans-serif'}}>
                    Welcome to SEGAT
                  </p>
                  <p className="text-[28px] font-medium mt-4">
                    Your Smart Engineering Graphics Assistant
                  </p>
                </div>
              </>
          ) : (
              <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
                <div className="my-10 mx-0 flex items-center gap-5">
                  <FaUserCircle className="text-3xl" />
                  <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
                </div>

                <div className="flex items-start gap-5">
                  {loading ? (
                      <div className="w-full flex flex-col gap-2">
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                      </div>
                  ) : (
                      <div
                          className="result-display text-lg font-[400] leading-[1.8]"
                          dangerouslySetInnerHTML={{ __html: cleanResultData(resultData) }}
                      />
                  )}
                </div>
              </div>
          )}

          <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
            <div className="flex items-center justify-between gap-20 bg-gray-200 dark:bg-gray-700 py-2 px-5 rounded-full">
              <input
                  type="text"
                  placeholder="Enter your Engineering Graphics question...."
                  className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
              />
              <div className="flex gap-4 items-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                />
                <label htmlFor="image-upload">
                  <MdAddPhotoAlternate className="text-2xl cursor-pointer" />
                </label>
                <FaMicrophone className="text-2xl cursor-pointer" />
                {input && (
                    <IoMdSend
                        onClick={() => onSent()}
                        className="text-2xl cursor-pointer"
                    />
                )}
              </div>
            </div>
            <p className="text-sm my-4 mx-auto text-center font-[500]">
              This prompt gives you the desired solution for your problem!! Happy Imagining!!!
            </p>
          </div>
        </div>
      </div>
  );
};

// Function to clean the resultData by removing unwanted sections and symbols
const cleanResultData = (data) => {
  const cleanedData = data
      .replace(/\*\*/g, "") // Remove double asterisks used for bolding
      .replace(/Diagram[^]*$/, ""); // Remove everything after "Diagram"

  return cleanedData;
};

export default MainContent;

import React, { useContext } from "react";
import {
<<<<<<< HEAD
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import compass from "../assets/img1.jpg";
=======
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
>>>>>>> main/frontend
import logo from "../assets/custom-logo.png";
import Tesseract from "tesseract.js";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
<<<<<<< HEAD
import {myFunction} from "../firebase.js"


=======
>>>>>>> main/frontend

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

<<<<<<< HEAD
  const handleSend = () => {
        myFunction({ question: input })  // Send the input question to the function
            .then(result => {
                // Access the svg and answer from result.data
                const svg = result.data.svg; // Ensure this corresponds to your Firebase function's response
                const answer = result.data.answer;

                console.log("SVG:", svg); // Log the SVG
                console.log("Answer:", answer); // Log the answer


            })
            .catch(error => {
                console.error("Error calling Firebase function: ", error);
            });
    };


  return (
      <div className="flex-1 min-h-screen pb-[15vh] relative">
        <div className="flex items-center justify-between text-xl p-5 text-slate-700">
          <p>SEGAT</p>
          <img src={logo} alt="" className="w-8 rounded-[50%]" />
          <FaUserCircle />
=======
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSent();
    }
  };

  return (
      <div className="flex-1 min-h-screen pb-[15vh] relative">
        {/* Profile icon placed on top right */}
        <div className="absolute top-0 right-0 p-5">
          <FaUserCircle className="text-4xl cursor-pointer" />
        </div>

        {/* Logo and SEGAT text */}
        <div className="flex flex-col items-center justify-center p-5">
          <img src={logo} alt="Logo" className="w-32 rounded-[50%] mb-3" />
>>>>>>> main/frontend
        </div>

        <div className="max-w-[900px] mx-auto">
          {!showResult ? (
              <>
<<<<<<< HEAD
                <div className="my-12 text-[56px] text-slate-500 font-semibold p-5">
                  <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Engineer!!
                </span>
                  </p>
                  <p className="text-slate-400">Ready to imagine?</p>
=======
                {/* Centered text without gradient */}
                <div className="my-12 text-center p-5">
                  <p className="text-[60px] font-extrabold text-slate-600 tracking-wide"
                     style={{fontFamily: 'Nunito, sans-serif'}}>
                    Welcome to SEGAT
                  </p>
                  <p className="text-[28px] text-slate-500 font-medium mt-4">
                    Your Smart Engineering Graphics Assistant
                  </p>
>>>>>>> main/frontend
                </div>
              </>
          ) : (
              <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
                <div className="my-10 mx-0 flex items-center gap-5">
                  <FaUserCircle className="text-3xl" />
                  <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
                </div>

                <div className="flex items-start gap-5">
<<<<<<< HEAD
                  <img src={compass} alt="" className="w-8 rounded-[50%]" />

                  {loading ? (
                      <div className="w-full flex flex-col gap-2">
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#080000] via-[#ffffff] to-[#080000] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#080000] via-[#ffffff] to-[#080000] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#080000] via-[#ffffff] to-[#080000] p-4 animate-scroll-bg" />
=======
                  {loading ? (
                      <div className="w-full flex flex-col gap-2">
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
>>>>>>> main/frontend
                      </div>
                  ) : (
                      <div
                          className="result-display text-lg font-[400] leading-[1.8]"
                          dangerouslySetInnerHTML={{ __html: resultData }}
                      />
                  )}
                </div>
              </div>
          )}

          <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
            <div className="flex items-center justify-between gap-20 bg-gray-200 py-2 px-5 rounded-full">
<<<<<<< HEAD
            <input
                  type="text"
                  placeholder="Enter a prompt here..."
                  className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSend();
                    }
                  }}
                  />
=======
              <input
                  type="text"
                  placeholder="Enter Engineering Graphics questions...."
                  className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
              />
>>>>>>> main/frontend
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
            <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-600">
              SEGAT may display inaccurate info, including about people, so
              double-check its responses.
            </p>
          </div>
        </div>
      </div>
  );
};

export default MainContent;

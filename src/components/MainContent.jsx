import React, { useContext } from "react";
import {
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

  return (
      <div className="flex-1 min-h-screen pb-[15vh] relative">
        <div className="flex items-center justify-between text-xl p-5 text-slate-700">
          <p>SEGAT</p>
          <img src={logo} alt="" className="w-8 rounded-[50%]" />
          <FaUserCircle />
        </div>

        <div className="max-w-[900px] mx-auto">
          {!showResult ? (
              <>
                <div className="my-12 text-[56px] text-slate-500 font-semibold p-5">
                  <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Engineer!!
                </span>
                  </p>
                  <p className="text-slate-400">Ready to imagine?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
                  <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                    <p className="text-slate-700 text-lg">
                      What is Engineering Graphics?
                    </p>
                    <FaCompass className="text-4xl p-1 absolute bottom-2 right-2" />
                  </div>
                  <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                    <p className="text-slate-700 text-lg">
                      What is isometric projection?
                    </p>
                    <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2" />
                  </div>
                  <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                    <p className="text-slate-700 text-lg">
                      Who is the Father of EG?
                    </p>
                    <FaMessage className="text-4xl p-1 absolute bottom-2 right-2" />
                  </div>
                  <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300">
                    <p className="text-slate-700 text-lg">
                      Which subject does EG belong to?
                    </p>
                    <FaCode className="text-4xl p-1 absolute bottom-2 right-2" />
                  </div>
                </div>
              </>
          ) : (
              <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
                <div className="my-10 mx-0 flex items-center gap-5">
                  <FaUserCircle className="text-3xl" />
                  <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
                </div>

                <div className="flex items-start gap-5">
                  <img src={compass} alt="" className="w-8 rounded-[50%]" />

                  {loading ? (
                      <div className="w-full flex flex-col gap-2">
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                        <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
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
              <input
                  type="text"
                  placeholder="Enter a prompt here..."
                  className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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

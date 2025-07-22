"use client";
import { ArrowRightCircleIcon } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, sendMessageToServer } from "@/app/store/slices/chatSlice";
import { AppDispatch, RootState } from "@/app/store";
import ReactMarkDown from "react-markdown";
import Image from "next/image";

const ChatPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading } = useSelector((state: RootState) => state.chat);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    dispatch(addMessage({ id: Date.now(), text: input, sender: "me" }));
    dispatch(sendMessageToServer(input));
    setInput("");
  };

  return (
    <div className="flex flex-col h-[89vh] md:h-[85vh]">
      <div className="flex-1 w-[98%] md:w-[80%] mx-auto custom-scrollbar overflow-y-auto p-5 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex  ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-3xl max-w-xs overflow-hidden md:max-w-lg ${
                msg.sender === "me"
                  ? "bg-popover text-gray-300"
                  : "bg-popover text-gray-300"
              }`}
            >
              {msg.sender === "me" ? (
                ""
              ) : (
                <div className="flex gap-2 items-center pb-2">
                  <Image
                    src={`https://avatars.githubusercontent.com/u/130303397?v=4`}
                    height={20}
                    width={20}
                    className="aspect-square h-6 w-6 rounded-full"
                    alt="admin profile"
                  />
                  <h1 className="text-xs">Prashant Adhikari | Admin bot</h1>
                </div>
              )}
              <div className="text-sm">
                <ReactMarkDown
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 underline font-bold hover:text-blue-300"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkDown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 flex gap-3 py-2 items-center  rounded-3xl max-w-xs md:max-w-lg bg-popover text-gray-300">
              <div className="flex gap-2 items-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/130303397?v=4"
                  height={20}
                  width={20}
                  className="aspect-square h-6 w-6 rounded-full"
                  alt="admin profile"
                />
              </div>
              <div className="flex space-x-1 h-full items-center justify-center">
                <div className="animate-bounce h-full flex items-center [animation-delay:-0.3s]">
                  <div className=" h-1 w-1 bg-white rounded-full"></div>
                </div>
                <div className="animate-bounce h-full flex items-center [animation-delay:-0.15s]">
                  <div className=" h-1 w-1 bg-white rounded-full"></div>
                </div>
                <div className="animate-bounce h-full flex items-center ">
                  <div className=" h-1 w-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={sendMessage}
        className="p-2 mt-2 rounded-full  w-[98%] md:w-[80%] mx-auto bg-popover flex gap-2"
      >
        <input
          className="flex-1 px-4 py-3 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Powered by Gemini Flash 1.5 | Start typing....."
        />
        <button
          type="submit"
          disabled={loading}
          className={` text-white px-4 py-2 rounded-full ${
            loading
              ? "bg-purple-300 transition-all duration-300"
              : "bg-purple-500 transition-all duration-300"
          }`}
        >
          <ArrowRightCircleIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatPage;

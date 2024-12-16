"use client";
import { useState } from "react";
import { sendMessage } from "./actions";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!prompt.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: prompt.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    // setInput("");
    // setIsLoading(true);

    try {
      const response = await sendMessage();
      const systemMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        role: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      console.error("Failed to send message:");
    } finally {
      alert("Mensaje enviado");
      console.log(messages);
    }
  };

  return (
    <div className='rounded-2xl p-[1px] bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] w-1/2 mx-auto transition-all duration-300 opacity-90 ease-in-out'>
      <div className='relative'>
        <textarea
          className='bg-white rounded-2xl w-full mx-auto self-center h-24 border-[1px] border-solid border-gray-200 p-4 text-gray-400 m-0 resize-none focus:outline-none opacity-100!'
          placeholder='Escribe aquí lo que quieras ...'
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        ></textarea>
        <a
          className='flex flex-col items-center justify-center bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] absolute w-10 h-10 text-white z-10 right-2 top-2 rounded-full'
          onClick={handleSubmit}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.5em'
            height='1.5em'
            viewBox='0 0 16 16'
          >
            <path
              fill='currentColor'
              d='M5 6.5L7.5 4h.7l2.5 2.5l-.7.71l-1.65-1.64v5.57h-1V5.57L5.7 7.22z'
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Chat;

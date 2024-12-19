'use client';
import { useEffect, useState } from 'react';
import { generarPauta, sendMessage } from './actions';
import Markdown from 'react-markdown';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pauta, setPauta] = useState('');
  const [loadingPauta, setLoadingPauta] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [opacity, setOpacity] = useState('opacity-100');

  useEffect(() => {
    const fetchPauta = async () => {
      try {
        const response = await generarPauta();
        await setPauta(response.message.response.text);
        setOpacity('opacity-0');
        setTimeout(() => {
          setLoadingPauta(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch pauta:', error);
      }
    };

    fetchPauta();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!prompt.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: prompt.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    // setIsLoading(true);
    try {
      const response = await sendMessage(prompt.trim(), pauta);
      const systemMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        role: 'system',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      console.log(messages);
    }
  };

  return (
    <main className="w-full max-w-10/12 flex flex-col">
      {loadingPauta && (
        <div
          className={`absolute top-0 left-0 w-full h-full grid place-items-center bg-gray-50 z-50 ${opacity} transition-all duration-500 ease-in-out`}
        >
          <div className="card">
            <div className="loader">
              <p>Estamos cargando</p>
              <div className="words">
                <span className="word font-bold">tendencias</span>
                <span className="word font-bold">marcas</span>
                <span className="word font-bold">keywords</span>
                <span className="word font-bold">emojis</span>
                <span className="word font-bold">a la IA</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        id="mensajes"
        className="w-[90%] mx-auto flex flex-col flex-1 min-w-0 overflow-y-auto overscroll-contain max-h-[calc(100vh-300px)]"
      >
        {messages && messages.length === 0 && (
          <div className="flex flex-row items-center justify-center h-auto mb-10 gap-6">
            <div className="flex flex-row w-1/3 p-4 drop-shadow-sm rounded-lg bg-gradient-to-b from-violet-300/10 to-pink-200/20 font-light text-gray-500 text-sm cursor-pointer border-b-pink-300/40 border-b-8">
              Consulta tendencias y estadisticas de tus redes sociales
            </div>
            <div className="flex flex-row w-1/3 p-4 drop-shadow-sm rounded-lg bg-gradient-to-b from-violet-300/10 to-pink-200/20 font-light text-gray-500 text-sm cursor-pointer border-b-green-300/40 border-b-8">
              Sugerencias de contenido y palabras clave
            </div>
            <div className="flex flex-row w-1/3 p-4 drop-shadow-sm rounded-lg bg-gradient-to-b from-violet-300/10 to-pink-200/20 font-light text-gray-500 items-center justify-center gap-4 text-sm border-b-8 border-b-solid border-b-violet-300/40 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              >
                <path d="M16.5 5V3m-9 2V3M3.25 8h17.5M3 10.044c0-2.115 0-3.173.436-3.981a3.896 3.896 0 0 1 1.748-1.651C6.04 4 7.16 4 9.4 4h5.2c2.24 0 3.36 0 4.216.412.753.362 1.364.94 1.748 1.65.436.81.436 1.868.436 3.983v4.912c0 2.115 0 3.173-.436 3.981a3.896 3.896 0 0 1-1.748 1.651C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.412a3.896 3.896 0 0 1-1.748-1.65C3 18.128 3 17.07 3 14.955z" />
              </svg>
              Generación de pautas, calendarios y contenido
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col items-start ${
              message.role === 'user' ? 'items-end' : ''
            }`}
          >
            <div
              className={`mensajecontent bg-white rounded-2xl p-4 m-2 drop-shadow-sm ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] text-white'
                  : 'text-gray-700 max-w-[60%]'
              }`}
            >
              <Markdown>{message.content}</Markdown>
            </div>
            <div className="text-xs text-gray-400 px-4">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] w-1/2 mx-auto transition-all duration-300 opacity-90 ease-in-out">
        <div className="relative">
          <textarea
            className="bg-white rounded-2xl w-full mx-auto self-center h-22 border-[1px] border-solid border-gray-200 p-4 text-gray-400 m-0 resize-none focus:outline-none opacity-100!"
            placeholder="Escribe aquí lo que quieras ..."
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          ></textarea>
          <a
            className="flex flex-col items-center justify-center bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] absolute w-10 h-10 text-white z-10 right-2 top-2 rounded-full cursor-pointer"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M5 6.5L7.5 4h.7l2.5 2.5l-.7.71l-1.65-1.64v5.57h-1V5.57L5.7 7.22z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}

export default Chat;

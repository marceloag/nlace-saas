'use client';
// TODO: Message history
// TODO: Bug on avatar image on switching accounts
import { useEffect, useState, useRef } from 'react';
import { sendMessage, getMessages, saveMessageSB } from './actions';
import Loading from '../ui/Loading';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { useAccount } from '@/context/AccountContext';

function Chat({ userId }) {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pauta, setPauta] = useState('');
  // TODO: Set to true to wait to load pauta
  const [prompt, setPrompt] = useState('');
  const { currentAccount } = useAccount();
  const avatar = currentAccount?.avatar;

  useEffect(() => {
    setMessages([]);
    const fetchMessages = async () => {
      try {
        const messagesSB = await getMessages(userId, currentAccount?.id);
        setMessages(messagesSB);
        console.log(messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchMessages();
  }, [currentAccount]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCommandEnter = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = {
      id: Date.now().toString(),
      content: prompt.trim(),
      role: 'user',
      timestamp: new Date(),
      accountId: currentAccount.id
    };

    setMessages((prev) => [...prev, userMessage]);
    try {
      const guardarMensaje = await saveMessageSB(
        prompt.trim(),
        'user',
        currentAccount.id,
        userId
      );
    } catch (error) {
      console.error('Failed to save message:', error);
    }

    setPrompt('');
    setIsLoading(true);

    try {
      const response = await sendMessage(
        prompt.trim(),
        pauta,
        userId,
        currentAccount.id,
        currentAccount.nombre,
        currentAccount.descripcion
      );
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
      setIsLoading(false);
      console.log(messages);
    }
  };

  return (
    <>
      <div className="bg-transparent m-0 p-0 after:via-gray-50 after:via-40% w-full after:absolute after:w-full after:z-50 after:pb-10 after:bg-gradient-to-b after:flex  after:from-gray-50 after:to-transparent">
        <h1 className="text-3xl font-thin">
          👋 Bienvenido al agente de : {currentAccount?.nombre}
        </h1>
      </div>

      <main className="w-full max-w-10/12 flex flex-col">
        <div
          id="mensajes"
          className="w-[90%] mx-auto flex flex-col flex-1 min-w-0 overflow-y-auto overscroll-contain max-h-[calc(100vh-250px)] pt-7"
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={message.id}
              className={`relative flex flex-col items-start ${
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
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full overflow-hidden border-white border-2 bg-gray-500 absolute -top-2">
                  <img src={avatar} alt="Avatar" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-row items-start justify-start h-auto mb-10 gap-6"
            >
              <div className="mensajecontent bg-white rounded-2xl p-4 m-2 drop-shadow-sm ">
                <Loading />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] w-1/2 mx-auto transition-all duration-300 opacity-90 ease-in-out">
          <div className="relative">
            <textarea
              className="bg-white rounded-2xl w-full mx-auto self-center h-22 border-[1px] border-solid border-gray-200 p-4 text-gray-400 m-0 resize-none focus:outline-none opacity-100! pr-20"
              placeholder="Escribe aquí lo que quieras ..."
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              onKeyDown={handleCommandEnter}
            ></textarea>
            <a
              className="flex flex-col items-center justify-center bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] absolute w-10 h-10 text-white z-10 right-2 top-5 rounded-full cursor-pointer"
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
        <small className="text-center mt-1 text-gray-500 flex flex-row items-center justify-center gap-1">
          Presiona
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#888888"
              d="M17.5 3C15.57 3 14 4.57 14 6.5V8h-4V6.5C10 4.57 8.43 3 6.5 3S3 4.57 3 6.5S4.57 10 6.5 10H8v4H6.5C4.57 14 3 15.57 3 17.5S4.57 21 6.5 21s3.5-1.57 3.5-3.5V16h4v1.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5H16v-4h1.5c1.93 0 3.5-1.57 3.5-3.5S19.43 3 17.5 3M16 8V6.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S18.33 8 17.5 8zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5S8 5.67 8 6.5V8zm3.5 6v-4h4v4zm7.5 5c-.83 0-1.5-.67-1.5-1.5V16h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5m-11 0c-.83 0-1.5-.67-1.5-1.5S5.67 16 6.5 16H8v1.5c0 .83-.67 1.5-1.5 1.5"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
          >
            <g
              fill="none"
              stroke="#888888"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="13" height="13" x=".5" y=".5" rx="1"></rect>
              <path d="m5.5 10.5l-2-2l2-2"></path>
              <path d="M3.5 8.5h5a1 1 0 0 0 1-1v-3"></path>
            </g>
          </svg>
          para enviar
        </small>
      </main>
    </>
  );
}

export default Chat;

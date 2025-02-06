'use client';
// TODO: Message history
// TODO: Bug on avatar image on switching accounts
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { sendMessage, getMessages, saveMessageSB } from './actions';
import Loading from '../ui/Loading';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { useAccount } from '@/context/AccountContext';
import {
  CommandIcon,
  EnterIcon,
  SendIcon,
  EditIcon
} from '@/components/icons/Icons';

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
  }, [messages, isLoading]);

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
        timestamp: new Date(),
        posts: response.posts || []
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
      <header className="bg-transparent m-0 p-0 after:via-gray-50 after:via-40% w-full after:absolute after:w-full after:z-50 after:pb-10 after:bg-gradient-to-b after:flex  after:from-gray-50 after:to-transparent">
        <h1 className="text-3xl font-thin">
          👋 Bienvenido al agente de : {currentAccount?.nombre}
        </h1>
      </header>

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
                className={`max-w-[60%] mensajecontent bg-white rounded-2xl p-4 m-2 drop-shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-[#ffc4f9] to-[#95a9fc] text-white'
                    : 'text-gray-700 max-w-[60%]'
                }`}
              >
                <Markdown>{message.content}</Markdown>
                {message.posts && message.posts.length > 0 && (
                  <div className="flex flex-row items-center justify-start gap-2 mt-2">
                    <Link
                      href={{
                        pathname: '/dashboard/editor',
                        query: { posts: JSON.stringify(message.posts) }
                      }}
                    >
                      <span className="text-xs text-gray-400 flex flex-row items-center gap-1 cursor-pointer">
                        <EditIcon />
                        Editar Posts
                      </span>
                    </Link>
                  </div>
                )}
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
              <SendIcon />
            </a>
          </div>
        </div>
        <small className="text-center mt-1 text-gray-500 flex flex-row items-center justify-center gap-1">
          Presiona
          <CommandIcon /> <EnterIcon />
          para enviar
        </small>
      </main>
    </>
  );
}

export default Chat;

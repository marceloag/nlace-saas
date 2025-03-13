'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquarePlus } from 'lucide-react';
import Loading from '@/components/ui/Loading';
// ai sdk
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Post from '@/components/Post';

const components = {
  h1: (props) => {
    return (
      <h1 className=" text-violet-600 dark:text-violet-400 text-3xl font-bold mt-4 mb-2">
        {props.children}
      </h1>
    );
  },
  Post: (props) => {
    return <Post {...props} />;
  }
};

function MdxContent({ content }) {
  const [mdxSource, setMdxSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepareMdx = async () => {
      try {
        const serialized = await serialize(content);
        setMdxSource(serialized);
      } catch (error) {
        console.error('Error serializing MDX:', error);
      } finally {
        setIsLoading(false);
      }
    };

    prepareMdx();
  }, [content]);

  if (isLoading) return <p>Cargando...</p>;
  if (!mdxSource) return <p>{content}</p>; // Fallback a texto plano si hay error

  return (
    <MDXRemote
      {...mdxSource}
      className="prose lg:prose-xl"
      // options={options}
      components={components}
    />
  );
}

// Componente para determinar cómo renderizar el contenido
function MessageContent({ content }) {
  // Verificar si el contenido parece ser MDX (contiene sintaxis MDX)
  const isMdxLike =
    content.includes('#') ||
    content.includes('```') ||
    content.includes('**') ||
    content.includes('<'); // Detección simple de posible MDX

  if (isMdxLike) {
    return <MdxContent content={content} />;
  }

  // Si no parece MDX, renderizarlo como texto normal
  return <p>{content}</p>;
}

function ChatMessages({ messages, status, selectedAgent }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', delay: 100 });
  }, [messages, status]);

  return (
    <div
      id="mensajes"
      className="w-[90%] mx-auto flex flex-col flex-1 min-w-0 overflow-y-auto overscroll-contain max-h-[calc(100vh-250px)] pt-7 no-scrollbar"
    >
      {messages && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="w-32 h-32 bg-apple-50 rounded-full flex items-center justify-center mb-6 shadow-md">
            <MessageSquarePlus className="h-16 w-16 text-apple-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Comienza una nueva conversación
          </h3>
          <p className="text-gray-500 max-w-md">
            Escribe un mensaje abajo para iniciar una conversación con el agente
            de{' '}
            <span className="font-medium text-apple-600">
              {selectedAgent || ''}
            </span>
            .
          </p>
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
            className={`prose prose-sm max-w-[80%] mensajecontent rounded-2xl p-4 m-2 drop-shadow-sm bg-[#F1F5F9] ${
              message.role == 'user'
                ? 'bg-apple-700 text-white'
                : 'bg-[#F1F5F9] text-gray-700 max-w-[60%]'
            }`}
          >
            {message.content && (
              <MessageContent
                content={message.content}
                components={components}
              />
            )}
            {/* <MessageContent
              content={message.content}
              // components={components}
            /> */}
            {message.parts.map((part) => {
              if (part.type === 'tool-invocation') {
                switch (part.toolInvocation.state) {
                  case 'partial-call':
                    return <>render partial tool call</>;
                  case 'call':
                    return <>🧠 Consultando a la base de conocimiento</>;
                  case 'result':
                    return <></>;
                }
              }
            })}
          </div>
          <div className="text-xs text-gray-400 px-4">
            {/* {message.timestamp.toLocaleTimeString()} */}
          </div>
          {/* 
          {message.role === 'user' && (
            <div className="w-8 h-8 rounded-full overflow-hidden border-white border-2 bg-gray-500 absolute -top-2">
              <img src={avatar} alt="Avatar" />
            </div>
          )} */}
        </motion.div>
      ))}
      {status == 'submitted' && (
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
  );
}

export default ChatMessages;

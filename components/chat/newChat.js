'use client';

import { useEffect, useState, useRef } from 'react';
import useAccountStore from '@/stores/accountStore';
import { useUserStore } from '@/stores/userStore';
import ChatInput from '@/components/chat/ui/ChatInput';
import ChatMessages from '@/components/chat/ui/ChatMessages';
import { useChat } from '@ai-sdk/react';
import {
  getConversationMessages,
  getOrCreateConversation
} from '@/app/actions/conversationActions';

function NewChat() {
  const userId = useUserStore((state) => state.user.user.id);
  const [bdMessages, setBDMessages] = useState([]);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages
  } = useChat({
    maxSteps: 5,
    initialMessages: bdMessages
  });
  const [conversationId, setConversationId] = useState(null);

  const currentAccount = useAccountStore((state) => state.currentAccount);
  const avatar = currentAccount?.avatar;
  const prevAccountRef = useRef();

  useEffect(() => {
    async function fetchMessages() {
      if (prevAccountRef.current?.id === currentAccount?.id) {
        return;
      }
      prevAccountRef.current = currentAccount;
      const conversationIdGetter = await getOrCreateConversation(
        userId,
        currentAccount.id
      );
      setConversationId(conversationIdGetter);
      const messagesSB = await getConversationMessages(conversationIdGetter);
      // console.log('Mensajes obtenidos de la base de datos:', messagesSB);
      if (messagesSB) {
        setMessages(messagesSB);
      } else {
        setMessages([]);
      }
    }

    fetchMessages();
  }, [currentAccount]);

  return (
    <>
      <main className="w-full flex flex-1 flex-col bg-white px-4">
        <ChatMessages
          messages={messages}
          status={status}
          selectedAgent={currentAccount?.nombre}
        />
        <div className=" w-full mx-auto transition-all duration-300 opacity-90 ease-in-out">
          <ChatInput
            handleSubmit={handleSubmit}
            input={input}
            handleIChange={handleInputChange}
            onSubmit={(event) => {
              handleSubmit(event, {
                body: {
                  userId,
                  accountId: currentAccount.id,
                  promptAgente: currentAccount.prompt_agente,
                  accountNombre: currentAccount.nombre,
                  conversationId
                }
              });
            }}
          />
        </div>
      </main>
    </>
  );
}

export default NewChat;

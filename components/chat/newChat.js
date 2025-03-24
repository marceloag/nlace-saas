'use client';

import { useEffect, useRef } from 'react';
import useAccountStore from '@/stores/accountStore';
import ChatInput from '@/components/chat/ui/ChatInput';
import ChatMessages from '@/components/chat/ui/ChatMessages';
import { useChat } from '@ai-sdk/react';
import { useUserStore } from '@/stores/userStore';
import { set } from 'date-fns';

function NewChat() {
  const userId = useUserStore((state) => state.user.id);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages
  } = useChat({
    maxSteps: 5
  });

  const currentAccount = useAccountStore((state) => state.currentAccount);
  const avatar = currentAccount?.avatar;
  const prevAccountRef = useRef();

  useEffect(() => {
    if (prevAccountRef.current?.id === currentAccount?.id) {
      return;
    }
    setMessages([]);
    prevAccountRef.current = currentAccount;
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
                  accountNombre: currentAccount.nombre
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

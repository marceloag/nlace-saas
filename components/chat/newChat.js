'use client';

import { useEffect, useRef } from 'react';
import useAccountStore from '@/stores/accountStore';
import ChatInput from '@/components/chat/ui/ChatInput';
import ChatMessages from '@/components/chat/ui/ChatMessages';
import { useChat } from '@ai-sdk/react';

function NewChat({ userId }) {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    maxSteps: 5
  });

  const currentAccount = useAccountStore((state) => state.currentAccount);
  const avatar = currentAccount?.avatar;
  const prevAccountRef = useRef();

  useEffect(() => {
    if (prevAccountRef.current?.id === currentAccount?.id) {
      return;
    }
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
                  accountId: currentAccount.id
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

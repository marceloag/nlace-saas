'use client';

import { useEffect, useRef } from 'react';
import { useAccount } from '@/context/AccountContext';
import ChatInput from '@/components/chat/ui/ChatInput';
import ChatMessages from '@/components/chat/ui/ChatMessages';
import SocialPostItem from '@components/ui/social-post-item';

function NewChat({ userId }) {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    maxSteps: 5
  });
  const { currentAccount } = useAccount();
  const avatar = currentAccount?.avatar;
  const prevAccountRef = useRef();
  const post = {
    id: '2',
    content:
      'Estamos emocionados de anunciar nuestra colaboración con @empresa. Juntos crearemos experiencias increíbles para nuestros usuarios.',
    platform: 'linkedin',
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    time: '14:30'
  };

  useEffect(() => {
    if (prevAccountRef.current?.id === currentAccount?.id) {
      return;
    }
    console.log(currentAccount);
    prevAccountRef.current = currentAccount;
  }, [currentAccount]);

  return (
    <>
      <main className="w-full flex flex-1 flex-col bg-white px-4">
        <SocialPostItem
          key={post.id}
          id={post.id}
          content={post.content}
          platform={post.platform}
          date={post.date}
          time={post.time}
          onSave={handleSavePost}
        />
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

'use client';

import { useState } from 'react';
import { PaperclipIcon, Send, Image, FileUp, SearchCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SelectModel from '@/components/ModelSelect';

function ChatInput(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('4o');

  const handleKeyDown = (e) => {
    if (
      (e.metaKey || e.ctrlKey) &&
      e.key === 'Enter' &&
      !isLoading &&
      props.input.trim()
    ) {
      e.preventDefault(); // Evita el salto de línea en el textarea
      props.handleSubmit(); // Envía el mensaje
    }
  };

  return (
    <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={props.onSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <Textarea
            value={props.input}
            onChange={props.handleIChange}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="flex-1 min-h-[80px] resize-none rounded-2xl border-slate-200 focus-visible:ring-apple-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-apple-500 hover:bg-apple-700 text-white hover:scale-105 transition-all duration-200 shadow-md hover:shadow-apple-300/50 hover:cursor-pointer"
            disabled={!props.input.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SelectModel
            setModel={setModel}
            className="bg-gray-50 border-gray-200"
          />

          {/* <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-slate-200 text-slate-600 hover:bg-apple-50 hover:text-apple-600"
            disabled={isLoading}
          >
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-slate-200 text-slate-600 hover:bg-apple-50 hover:text-apple-600"
            disabled={isLoading}
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-slate-200 text-slate-600 hover:bg-apple-50 hover:text-apple-600"
            disabled={isLoading}
          >
            <FileUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-slate-200 text-slate-600 hover:bg-apple-50 hover:text-apple-600"
            disabled={isLoading}
          >
            <SearchCode className="h-4 w-4" />
          </Button> */}
        </div>
      </form>
    </div>
  );
}

export default ChatInput;

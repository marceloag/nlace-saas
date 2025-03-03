'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { OpenAI, Gemini, Anthropic } from '@/components/icons/Icons';

export default function SelectModel({ setModel }) {
  const handleSelectModel = (value) => {
    setModel(value);
  };

  return (
    <Select
      className="text-sm rounded-lg"
      defaultValue="4o"
      onValueChange={handleSelectModel}
    >
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Modelo de IA" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="4o" className="text-sm" selected>
            <OpenAI className="fill-gray-800 inline-block mr-1 -mt-[2px]" />
            Open Ai GPT 4o
          </SelectItem>
          <SelectItem value="3.5-turbo" className="text-sm" selected>
            <OpenAI className="fill-gray-800 inline-block mr-1 -mt-[2px]" />
            Open Ai GPT 3.5 Turbo
          </SelectItem>
          <SelectItem value="4.5" className="text-sm" selected>
            <OpenAI className="fill-gray-800 inline-block mr-1 -mt-[2px]" />
            Open Ai GPT 4.5
          </SelectItem>
          {/* <SelectItem value="gemini-2.0-flash" className="text-sm">
            <Gemini className="fill-gray-800 inline-block mr-1 -mt-[2px]" />
            Gemini 2.0 Flash
          </SelectItem> */}
          <SelectItem value="sonnet-3.7" className="text-sm">
            <Anthropic className="fill-gray-800 inline-block mr-1 -mt-[2px]" />
            Anthropic Claude 3.7 Sonnet
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

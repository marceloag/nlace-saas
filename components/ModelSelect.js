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
import { OpenAI, Gemini } from '@/components/icons/Icons';

export default function SelectModel() {
  return (
    <Select className="text-sm rounded-lg" defaultValue="4o">
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Modelo de IA" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="4o" className="text-sm" selected>
            <OpenAI className="fill-gray-800 inline-block mr-1 -mt-[2px]" />
            Open Ai 4o-mini
          </SelectItem>
          <SelectItem value="gemini" className="text-sm">
            <Gemini className="fill-gray-800 inline-block mr-1 -mt-[2px]" />
            Gemini Flash 2.0
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

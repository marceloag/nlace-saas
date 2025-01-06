'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

// const accounts = [
//   {
//     id: '1',
//     name: 'Alicia Koch',
//     email: 'alicia@example.com',
//     avatarUrl: '/placeholder.svg?height=32&width=32'
//   },
//   {
//     id: '2',
//     name: 'Acme Inc.',
//     email: 'acme@example.com',
//     avatarUrl: '/placeholder.svg?height=32&width=32'
//   },
//   {
//     id: '3',
//     name: 'Monsters Inc.',
//     email: 'monsters@example.com',
//     avatarUrl: '/placeholder.svg?height=32&width=32'
//   }
// ];

export default function AccountSwitcher({ accounts }) {
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecciona una cuenta"
          className="w-[280px] justify-between"
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={selectedAccount.avatar}
              alt={selectedAccount.nombre}
            />
            <AvatarFallback>{selectedAccount.nombre[0]}</AvatarFallback>
          </Avatar>
          {selectedAccount.nombre}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Buscar Cuentas..." />
          <CommandList>
            <CommandEmpty>No se encontraron cuentas.</CommandEmpty>
            <CommandGroup heading="Cuentas">
              {accounts.map((account) => (
                <CommandItem
                  key={account.id}
                  onSelect={() => {
                    setSelectedAccount(account);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage src={account.avatar} alt={account.nombre} />
                    <AvatarFallback>{account.nombre[0]}</AvatarFallback>
                  </Avatar>
                  <span>{account.nombre}</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedAccount.id === account.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

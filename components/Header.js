'use client'; // This is a global CSS file

import AccountSwitcher from '@/components/AccountSwitch';

function Header({ cuentas }) {
  return (
    <header className="w-full px-8 flex flex-row gap-4 border-b-[1px] border-gray-200 pb-4 justify-between items-start">
      <img src="/nlace_black.svg" alt="Nlace Logo" className="w-32" />
    </header>
  );
}

export default Header;

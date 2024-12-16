"use client"; // This is a global CSS file

function Header() {
  return (
    <header className='w-full px-8 flex flex-row gap-4 border-b-[1px] border-gray-200 pb-4 justify-between items-center'>
      <img src='/nlace_black.svg' alt='Nlace Logo' className='w-32' />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.5em'
        height='1.5em'
        viewBox='0 0 16 16'
        className='text-gray-600'
      >
        <path
          fill='currentColor'
          d='M13.377 10.573a7.6 7.6 0 0 1-.383-2.38V6.195a5.12 5.12 0 0 0-1.268-3.446a5.14 5.14 0 0 0-3.242-1.722c-.694-.072-1.4 0-2.07.227c-.67.215-1.28.574-1.794 1.053a4.9 4.9 0 0 0-1.208 1.675a5.1 5.1 0 0 0-.431 2.022v2.2a7.6 7.6 0 0 1-.383 2.37L2 12.343l.479.658h3.505c0 .526.215 1.04.586 1.412c.37.37.885.586 1.412.586s1.04-.215 1.411-.586s.587-.886.587-1.412h3.505l.478-.658zm-4.69 3.147a1 1 0 0 1-.705.299a1 1 0 0 1-.706-.3a1 1 0 0 1-.3-.705h1.999a.94.94 0 0 1-.287.706zm-5.515-1.71l.371-1.114a8.6 8.6 0 0 0 .443-2.691V6.004c0-.563.12-1.113.347-1.616c.227-.514.55-.969.969-1.34c.419-.382.91-.67 1.436-.837c.538-.18 1.1-.24 1.65-.18a4.15 4.15 0 0 1 2.597 1.4a4.13 4.13 0 0 1 1.004 2.776v2.01c0 .909.144 1.818.443 2.691l.371 1.113h-9.63v-.012z'
        ></path>
      </svg>
    </header>
  );
}

export default Header;
"use client";
function SideMenu({ userData }) {
  return (
    <aside className='w-14 shadow-md h-screen flex flex-col gap-2 py-2 px-2 items-center justify-between bg-white z-50'>
      <figure className='rounded-full overflow-hidden border-[2px] border-solid border-pink-100 w-full'>
        <img
          src={userData.user_metadata.picture}
          className='aspect-square w-full'
        />
      </figure>
      <div className='flex flex-col gap-2 py-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1.5em'
          height='1.5em'
          viewBox='0 0 16 16'
          className='fill-gray-600 text-gray-500'
        >
          <path
            fill='currentColor'
            fillRule='evenodd'
            d='M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46l5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984zM7 14.28l-4-1.34V3.72l4 1.34zm6.52-5.8H8.55v-1h4.93l-1.6-1.6l.71-.7l2.47 2.46v.71l-2.49 2.48l-.7-.7z'
            clipRule='evenodd'
          ></path>
        </svg>
      </div>
    </aside>
  );
}

export default SideMenu;

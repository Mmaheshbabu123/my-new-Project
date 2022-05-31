/*  ./components/Navbar.jsx     */
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { UTILITYFN } from '../../UtilityFunctions/Utility';

export const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  function handleUserClick(e){
    UTILITYFN.resetUserSessionDataforMoveOut();
  }
  return (
    <>
      <nav className='flex items-center flex-wrap bg-blue-400 nav_sec_main p-3 '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
            {/* <Image
              src='/dwg-logo1.svg'
              alt="watergoep logo"
              title="logo"
              width="100px"
              height="50px"
              className='fill-current text-white h-8 w-8 mr-2'
            /> */}
            {/* <span className='text-xl text-white font-bold uppercase tracking-wide'>
              De Watergroep
            </span> */}
          </a>
        </Link>
        <button
          className=' inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6 hamberger_menu'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
            <Link href='/news'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  font-bold items-center justify-center hover:bg-blue-600 hover:text-white custom_nav_menu' >
              Nieuws
              </a>
            </Link>
            <Link href='/malfunction'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  font-bold items-center justify-center hover:bg-blue-600 hover:text-white custom_nav_menu'>
              Storingen en werken
              </a>
            </Link>
            <Link href='/event'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  font-bold items-center justify-center hover:bg-blue-600 hover:text-white custom_nav_menu'>
              Evenementen
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
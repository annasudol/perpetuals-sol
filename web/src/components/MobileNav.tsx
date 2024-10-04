import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useHydrationErrorFix } from '../hooks/useHydrationErrorFix';
import { twMerge } from 'tailwind-merge';

interface NavbarItemProps {
  title: string;
  target: string;
}
interface NavbarItemMobileProps extends NavbarItemProps {
  setMenuOpen: (newMenuOpenState: boolean) => void;
}

const NavItems: { path: string; title: string }[] = [
  {
    path: '/trade',
    title: 'trade',
  },
  {
    path: '/rewards',
    title: 'rewards',
  },
  {
    path: '/roadmap',
    title: 'roadmap',
  },
  {
    path: '/team',
    title: 'team',
  },
];


export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="sm:hidden flex justify-center items-center mr-6 ml-4 relative right-4">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="z-[9999] w-8 h-8 relative left-[16%] top-1/2 flex justify-center items-center`"
      >
        <AnimatedBurger menuOpen={menuOpen} />
      </button>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}

function MobileMenu({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (newMenuOpen: boolean) => void;
}) {
  const isClient = useHydrationErrorFix();
  if (!isClient) return null;
  const baseClass = "flex flex-col items-end w-[100vw] h-[100vh] overflow-hidden z-50 fixed top-0 left-0 py-5 bg-[rgba(0,0,0,0.8)] backdrop-blur-lg";
  const conditionalClass = menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none";
  return (
    <div className={twMerge(baseClass, conditionalClass)}>
      <div className="mt-10 w-full">
        {NavItems.map((navItem, indx) => {
          return (
            <NavbarItemMobile
              title={navItem.title}
              target={navItem.path}
              setMenuOpen={setMenuOpen}
              key={indx}
            />
          );
        })}
      </div>
    </div>
  );
}


function NavbarItemMobile({
  title,
  target,
  setMenuOpen,
}: NavbarItemMobileProps) {
  const active = target === usePathname();
  const isActiveClass = active ? 'text-amber-400' : 'text-white';
  const baseClass = "text-2xl text-center py-4"
  return (
    <Link
      className="my-2 hover:!no-underline"
      href={target}
      onClick={() => setMenuOpen(false)}
    >
      <p className={twMerge(isActiveClass, baseClass)}>{title}</p>
    </Link>
  );
}

const AnimatedBurger = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <div
      className={`
            z-[9999]
            absolute
            top-1/2
            ${menuOpen ? '-translate-y-1' : ''}
            h-[0.175rem] w-7

            rounded-sm
            ${menuOpen ? 'bg-transparent' : 'bg-gray-400'}
            transition-all
            duration-500

            before:absolute
            before:content-[""]
            before:h-[0.175rem] before:w-7
            before:-translate-x-3.5
            before:-translate-y-[0.65rem]
            before:rounded-sm
            before:transition-all
            before:duration-500
            before:bg-gray-400
            ${menuOpen ? 'before:rotate-45 before:translate-y-[45%]' : ''}

            after:absolute
            after:content-[""]
            after:h-[0.175rem] after:w-7
            after:-translate-x-3.5
            after:translate-y-[0.65rem]
            after:rounded-sm
            after:transition-all after:duration-500
            after:bg-gray-400
            ${menuOpen ? 'after:translate-y-[65%] after:-rotate-45' : ''}
            `}
    ></div>
  );
};

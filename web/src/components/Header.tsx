import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';





import { usePathname } from 'next/navigation';
import { isMobile } from '../utils';
import { useHydrationErrorFix } from '../hooks/useHydrationErrorFix';
import MobileNav from './MobileNav';




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

export default function Header() {


  return (
    <nav className="sticky top-0 sm:border-b-0 border-b-2 sm:border-none border-gray-800 sm:static bg-base-200 sm:bg-transparent flex items-center justify-between w-full !h-[64px] !min-h-[64px]">
      <div className="flex h-full">
        <Logo />
        <NavbarItemsDesktop />
      </div>
      <MobileNav />
    </nav>
  );
}




function Logo() {
  return (
    <>
      <Link className="flex justify-center items-center" href="/">
        logo
      </Link>
    </>
  );
}

function NavbarItemsDesktop() {
  return (
    <>
      <div className="hidden sm:flex h-full items-center flex-1 px-2 mx-2 z-10">
        {NavItems.map((navItem, indx) => {
          return (
            <NavbarItemDesktop
              title={navItem.title}
              target={navItem.path}
              key={indx}
            />
          );
        })}
      </div>
    </>
  );
}

function NavbarItemDesktop({ title, target }: NavbarItemProps) {
  const active = target === usePathname();
  return (
    <Link
      className={`h-full flex items-center px-5 hover:!no-underline hover:text-accent mb-0 ${
        active ? 'border-b-2 border-mber-400' : ''
      }`}
      href={target}
    >
      <p className={`text-sm ${active ? 'text-mber-400' : 'text-white'}`}>
        {title}
      </p>
    </Link>
  );
}

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: JSX.Element;
}

export function NavbarLink(props: Props) {
 const active = props.href === usePathname();

  return (
    <Link
      href={props.href}
      className={twMerge(
        'font-medium',
        'flex',
        'h-full',
        'items-center',
        'px-5',
        'text-sm',
        'text-gray-500',
        'transition-colors',
        'active:text-gray-200',
        'hover:text-white',
        active && 'text-white',
        active && 'border-b',
        active && 'border-purple-500',
        props.className
      )}
    >
      <div className="hidden md:block">{props.children}</div>
      {cloneElement(props.icon, {
        className: twMerge(
          props.icon.props.className,
          'block',
          'fill-current',
          'h-4',
          'w-4',
          'md:hidden'
        ),
      })}
    </Link>
  );
}

'use client'; 

import Link from 'next/link';

import { usePathname } from 'next/navigation'; 

export default function NavLink({ href, children, className, ...props }) {

  const pathname = usePathname(); 

const isActive = href !== '/' 
  ? pathname.startsWith(href) 
  : pathname === href;
  
  const classes = `${className} ${isActive ? 'active' : ''}`;

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
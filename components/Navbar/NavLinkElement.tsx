"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

interface NavLinkElementProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string; 
    href: string;
    last?: boolean;
}

export default function NavLinkElement({ href, title, last = false, ...props } : NavLinkElementProps){
    const currentPath = usePathname();
    return (
        <li className="flex items-center space-x-5">
            <Link { ...props } href={href} className={"hover:opacity-75 transition-opacity " + ((currentPath == href) ? "font-light" : "font-light")}>
                {title}
            </Link>
            { !last && 
                <span 
                    style={{
                        background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 100%)"
                    }}
                    className="h-[1.5rem] w-[1px] bg-white inline-block" 
                />
            }
        </li>
    )
}
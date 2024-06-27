"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

function NavigationBar() {
  const segment = useSelectedLayoutSegment();

  const isActive = (href: string | null) => {
    return segment === href;
  };

  const NavLink = ({ href, active, children }: NavLinkProps) => {
    return (
      <Link
        href={href}
        className={`${
          active ? "font-semibold underline" : "hover:font-semibold"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="container mx-auto flex gap-12 justify-end items-center h-20">
      <NavLink href="/" active={isActive(null)}>
        Home
      </NavLink>
      <NavLink href="/posts" active={isActive("posts")}>
        Posts
      </NavLink>
    </div>
  );
}

export default NavigationBar;

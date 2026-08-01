"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "Home", href: isHomePage ? "#home" : "/", isRoute: !isHomePage },
    { name: "Upcoming Events", href: "/events", isRoute: true },
    { name: "Past Events", href: "/timeline", isRoute: true },
    { name: "Team", href: "/team", isRoute: true },
    { name: "Join Us", href: "/join", isRoute: true },
    { name: "Contact", href: "/contact", isRoute: !isHomePage },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
              <img src="https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/logo.webp" alt="Logo" />
            </div>
            <span className="font-display text-xl text-foreground">
              University Cultural Society
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link key={link.name} href={link.href} className="nav-link text-sm font-medium tracking-wide">
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className="nav-link text-sm font-medium tracking-wide">
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
            <img src="https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/gbpuat%20logo.webp" alt="GBPUAT Logo" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-foreground/80 hover:text-foreground transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-foreground/80 hover:text-foreground transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

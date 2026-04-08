"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export interface NavigationProps {
  navItems: {
    label: string;
    href: string;
  }[];
}
export function NavBar({ navItems }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      console.log("scroll");
      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 border-border border-b py-4 backdrop-blur-md"
          : "bg-transparent py-6",
      )}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24">
        <a
          href="#"
          className="hover:text-accent text-2xl transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          BA
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "relative text-sm transition-colors",
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="bg-accent absolute right-0 -bottom-1 left-0 h-px"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu indicator */}
        <div className="flex items-center gap-1 md:hidden">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                activeSection === item.href.slice(1)
                  ? "bg-accent"
                  : "bg-border",
              )}
              aria-label={item.label}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

"use client"

import { useState, useEffect } from "react"
import { cn } from "../../lib/utils/cn"

export interface NavigationProps {
  navItems: {
    label: string
    href: string

  }[]
}
export function Navigation({ navItems }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.getElementById(href.slice(1))
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <a
          href="#"
          className="text-2xl hover:text-accent transition-colors"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          BA
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "text-sm transition-colors relative",
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu indicator */}
        <div className="md:hidden flex items-center gap-1">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                activeSection === item.href.slice(1)
                  ? "bg-accent"
                  : "bg-border"
              )}
              aria-label={item.label}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

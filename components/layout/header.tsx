"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { logos, navigation, siteConfig } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      {/* Top bar - hidden on mobile */}
      <div className={cn(
        "hidden lg:block border-b border-secondary-foreground/10 transition-all duration-300",
        isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100 pb-2 mb-2"
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between text-secondary-foreground/80 text-sm">
          <div className="flex items-center gap-6">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            {siteConfig.phones.slice(0, 2).map((phone) => (
              <a 
                key={phone.country} 
                href={`tel:${phone.number.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-primary">{phone.country}:</span> {phone.number}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logos.main}
              alt="Universal Solutions Consultancy"
              width={60}
              height={60}
              className="h-12 w-auto md:h-14"
            />
            <Image
              src={logos.text}
              alt="Universal Solutions Consultancy"
              width={180}
              height={40}
              className="h-8 w-auto hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => (
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="text-secondary-foreground hover:text-primary hover:bg-transparent gap-1"
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-gray-200 shadow-lg min-w-[200px]">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link 
                          href={child.href}
                          className="text-gray-800 hover:text-primary hover:bg-gray-50 cursor-pointer"
                        >
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.label} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className="text-secondary-foreground hover:text-primary hover:bg-transparent"
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-secondary-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-secondary border-secondary-foreground/10 w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src={logos.main}
                    alt="USC"
                    width={50}
                    height={50}
                    className="h-12 w-auto"
                  />
                </Link>
                <nav className="flex flex-col gap-2">
                  {navigation.main.map((item) => (
                    item.children ? (
                      <div key={item.label} className="space-y-2">
                        <span className="text-secondary-foreground font-semibold px-4 py-2 block">
                          {item.label}
                        </span>
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <SheetClose key={child.label} asChild>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-secondary-foreground/70 hover:text-primary transition-colors"
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SheetClose key={item.label} asChild>
                        <Link
                          href={item.href}
                          className="px-4 py-2 text-secondary-foreground font-semibold hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    )
                  ))}
                </nav>
                <SheetClose asChild>
                  <Link href="/contact" className="px-4">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}

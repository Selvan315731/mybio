"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal, Sun, Moon, Gamepad2 } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import profileData from "@/data/profile.json";
import siteData from "@/data/site.json";
import socialData from "@/data/social.json";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["hero", "work", "experience", "stack", "architecture", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -80 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-8 ${
          isScrolled
            ? "backdrop-blur-md bg-background/85 border-b border-border shadow-lg py-3"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-foreground focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_20px_var(--accent-glow)]">
              <Terminal className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs tracking-wider uppercase text-foreground font-bold">
                  {profileData.name}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                SENIOR FULL STACK
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-border">
            {siteData.navLinks.map((link) => {
              const sectionKey = link.href.replace("#", "");
              const isActive = activeSection === sectionKey;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-accent/15 rounded-full -z-10 border border-accent/40 shadow-[0_0_12px_var(--accent-glow)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Theme Switcher & Actions */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Switcher */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme Mode"
                className="p-2.5 rounded-xl bg-surface border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-1.5 shadow-sm group"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                    <span className="text-[10px] font-mono font-semibold hidden md:inline text-slate-300">
                      LIGHT
                    </span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-accent group-hover:-rotate-12 transition-transform duration-300" />
                    <span className="text-[10px] font-mono font-semibold hidden md:inline text-slate-700">
                      DARK
                    </span>
                  </>
                )}
              </button>
            )}

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-[0_0_20px_var(--accent-glow)]"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl bg-surface border border-border text-foreground hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-between px-6 pt-24 pb-12 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-accent uppercase tracking-widest border-b border-border pb-2 flex justify-between">
                <span>NAVIGATION MENU</span>
              </span>
              <div className="flex flex-col gap-4">
                {siteData.navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="text-2xl font-display font-bold text-foreground hover:text-accent flex items-center justify-between py-1 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      0{idx + 1}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  STATUS: ONLINE
                </span>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono flex items-center gap-1.5"
                >
                  {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-accent" />}
                  <span>{theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span>
                </button>
              </div>
              <a
                href={`mailto:${socialData.email}`}
                className="w-full py-3 text-center text-xs font-mono font-bold rounded-xl bg-accent text-white"
              >
                EMAIL DIRECTLY
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

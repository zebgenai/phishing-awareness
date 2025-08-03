
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, BookOpen, MessageSquare, Trophy, Search } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Shield },
    { name: "Learn", path: "/learn", icon: BookOpen },
    { name: "Email Check", path: "/email-check", icon: MessageSquare },
    { name: "Link Verify", path: "/link-verify", icon: Search },
    { name: "Quiz", path: "/quiz", icon: Trophy },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className="bg-card shadow-card border-b sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group focus-visible-ring rounded-md p-1"
            aria-label="PhishGuard home page"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
            </motion.div>
            <span className="text-xl font-bold text-foreground">PhishGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6" role="menubar">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={item.path}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 focus-visible-ring relative ${
                      active
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.name}</span>
                    {active && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="focus-visible-ring"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              id="mobile-menu"
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t" role="menu">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 focus-visible-ring ${
                          active
                            ? "text-primary bg-accent"
                            : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;

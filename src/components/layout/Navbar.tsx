import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ASSETS } from '@/lib/assets'
import { db } from '@/services/database'

export function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // Update cart count
  useEffect(() => {
    const updateCount = () => {
      setCartCount(db.getCartCount())
    }
    
    updateCount()
    const unsubscribe = db.onCartUpdate(updateCount)
    return unsubscribe
  }, [])

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'HEADPHONES', href: '/headphones' },
    { name: 'SPEAKERS', href: '/speakers' },
    { name: 'EARPHONES', href: '/earphones' },
  ]

  return (
    <header className="bg-[#191919] border-b border-white/10">
      <div className="w-full max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        <nav className="flex items-center justify-between h-[90px] relative">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 p-0 h-auto">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-card w-64">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-[13px] font-bold tracking-[2px] uppercase text-foreground hover:text-[#D87D4A] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center z-10">
            <img src={ASSETS.logo} alt="Audiophile" className="h-[25px] w-auto" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-[51px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white text-[13px] font-bold leading-[25px] tracking-[2.1px] uppercase hover:text-[#D87D4A] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart Icon */}
          <button 
            onClick={() => navigate('/cart')}
            className="relative text-white hover:opacity-80 transition-opacity p-0 h-auto z-10"
          >
            <img src={ASSETS.icons.cart} alt="Cart" className="h-[20px] w-[23px]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

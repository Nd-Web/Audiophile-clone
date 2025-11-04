import { Link } from 'react-router-dom'
import { ASSETS } from '@/lib/assets'

export function Footer() {
  return (
    <footer className="bg-[#101010]">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        <div className="border-t-4 border-[#D87D4A] w-[101px] mx-auto md:mx-0" />
        
        <div className="pt-[48px] md:pt-[60px] lg:pt-[80px] pb-[48px]">
          <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:items-start gap-[56px] md:gap-[40px] lg:gap-0">
            <div className="flex flex-col gap-[48px] md:gap-[32px] lg:gap-[40px] md:col-span-2 lg:col-span-1">
              <Link to="/" className="flex justify-center md:justify-start">
                <img src={ASSETS.logo} alt="audiophile" className="h-[25px]" />
              </Link>
              
              <nav className="lg:hidden">
                <ul className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-[36px] text-[13px] font-bold tracking-[2px] uppercase">
                  <li>
                    <Link to="/" className="text-white hover:text-[#D87D4A] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/headphones" className="text-white hover:text-[#D87D4A] transition-colors">
                      Headphones
                    </Link>
                  </li>
                  <li>
                    <Link to="/speakers" className="text-white hover:text-[#D87D4A] transition-colors">
                      Speakers
                    </Link>
                  </li>
                  <li>
                    <Link to="/earphones" className="text-white hover:text-[#D87D4A] transition-colors">
                      Earphones
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-[36px] text-[13px] font-bold tracking-[2px] uppercase">
                <li>
                  <Link to="/" className="text-white hover:text-[#D87D4A] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/headphones" className="text-white hover:text-[#D87D4A] transition-colors">
                    Headphones
                  </Link>
                </li>
                <li>
                  <Link to="/speakers" className="text-white hover:text-[#D87D4A] transition-colors">
                    Speakers
                  </Link>
                </li>
                <li>
                  <Link to="/earphones" className="text-white hover:text-[#D87D4A] transition-colors">
                    Earphones
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-[48px] md:mt-[32px] lg:mt-[36px] grid md:grid-cols-2 gap-[48px] md:gap-[0]">
            <p className="text-white/50 text-[15px] leading-[25px] font-medium text-center md:text-left max-w-[540px] mx-auto md:mx-0">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.
            </p>

            <div className="flex items-end justify-center md:justify-end">
              <div className="flex items-center gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D87D4A] transition-colors"
                >
                  <img src={ASSETS.icons.facebook} alt="Facebook" className="w-6 h-6" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D87D4A] transition-colors"
                >
                  <img src={ASSETS.icons.twitter} alt="Twitter" className="w-6 h-6" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D87D4A] transition-colors"
                >
                  <img src={ASSETS.icons.instagram} alt="Instagram" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-[48px] md:mt-[80px] lg:mt-[56px] text-center md:text-left">
            <p className="text-white/50 text-[15px] leading-[25px] font-bold">
              Copyright {new Date().getFullYear()}. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

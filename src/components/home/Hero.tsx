import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import heroDesktop from "@/assets/headphones.png";
import { ASSETS } from '@/lib/assets'

export function Hero() {
  return (
    <section className="bg-[#131313] text-white relative overflow-hidden">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[510px] md:min-h-[639px]">
          <div className="text-center lg:text-left py-[108px] md:py-[126px] lg:py-0 flex flex-col gap-6 md:gap-8 lg:gap-10">
            <p className="text-white/50 text-[13px] tracking-[12px] uppercase font-normal">
              New Product
            </p>
            <h1 className="text-[36px] md:text-[56px] leading-[44px] md:leading-[58px] tracking-[1.5px] md:tracking-[2px] font-bold uppercase">
              XX99 Mark II<br />Headphones
            </h1>
            <p className="text-white/75 text-[15px] leading-[26px] font-medium max-w-[349px] mx-auto lg:mx-0">
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <Link to="/product/xx99-mark-two-headphones" className="w-fit mx-auto lg:mx-0 mt-4">
              <Button 
                className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white font-bold text-[13px] tracking-[1px] uppercase h-[48px] px-[30px] transition-colors"
              >
                SEE PRODUCT
              </Button>
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-end absolute right-40 top-0 bottom-0">
            <img 
              src={heroDesktop}
              alt="XX99 Mark II Headphones"
              className="w-auto h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

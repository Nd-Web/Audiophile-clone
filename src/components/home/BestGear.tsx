import { ASSETS } from '@/lib/assets'
import bestGear from "@/assets/bestgear.png";

export function BestGear() {
  return (
    <section className="pb-[120px] md:pb-[96px] lg:pb-[200px]">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-[64px] md:gap-[72px] lg:gap-[125px] items-center">
          <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left">
            <h2 className="text-[28px] md:text-[40px] lg:text-[48px] leading-[38px] md:leading-[44px] lg:leading-[52px] tracking-[0.9px] md:tracking-[1.4px] font-bold uppercase text-[#000000]">
              Bringing you the <span className="text-[#D87D4A]">best</span> audio gear
            </h2>
            <p className="text-[15px] leading-[25px] font-medium text-[#000000]/50 max-w-[573px] mx-auto lg:mx-0">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src={bestGear}
              alt="Best gear"
              className="w-full h-auto rounded-[8px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

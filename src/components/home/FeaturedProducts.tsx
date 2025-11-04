import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ASSETS } from '@/lib/assets'
import zx9Speaker from "@/assets/zx9Speaker.png";


export function FeaturedProducts() {
  return (
    <section className="pb-[120px] md:pb-[96px] lg:pb-[200px]">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 space-y-[32px] md:space-y-[40px] lg:space-y-[56px]">
        {/* ZX9 Speaker */}
        <div className="bg-[#D87D4A] rounded-[8px] overflow-hidden relative grid lg:grid-cols-2 items-center px-6 md:px-[95px] lg:pl-[95px] lg:pr-[95px] pt-[55px] pb-[55px] md:pt-[64px] md:pb-[64px] lg:pt-[96px] lg:pb-[0]">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex items-end justify-center lg:justify-start lg:ml-[-150px] overflow-hidden">
            <img 
              src={ASSETS.home.zx9Speaker.pattern}
              alt=""
              className="w-[558px] h-[558px] lg:w-[944px] lg:h-[944px]"
            />
          </div>
          <div className="relative z-10 flex justify-center lg:justify-start">
            <img 
              src= {zx9Speaker}
              alt="ZX9 Speaker"
              className="w-[172px] h-[207px] md:w-[197px] md:h-[237px] lg:w-[410px] lg:h-[493px] object-contain scale-150"
            />  
          </div>
          <div className="relative z-10 text-center lg:text-left mt-[32px] lg:mt-0 flex flex-col gap-8">
            <h2 className="text-[36px] md:text-[56px] leading-[44px] md:leading-[58px] tracking-[1.5px] md:tracking-[2px] font-bold uppercase text-white">
              ZX9<br />Speaker
            </h2>
            <p className="text-white/75 text-[15px] leading-[26px] font-medium max-w-[349px] mx-auto lg:mx-0">
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
            </p>
            <Link to="/product/zx9-speaker" className="w-fit mx-auto lg:mx-0 mt-4">
              <Button 
                variant="outline"
                className="bg-[#000000] hover:bg-[#4C4C4C] text-white border-0 font-bold text-[13px] tracking-[1px] uppercase h-[48px] px-[30px] transition-colors"
              >
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div 
          className="bg-[#F1F1F1] rounded-[8px] px-6 md:px-[95px] py-[101px] bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: `url('${ASSETS.home.zx7Speaker.desktop}')`
          }}
        >
          <div className="relative z-10 flex flex-col gap-8">
            <h2 className="text-[28px] leading-[38px] tracking-[2px] font-bold uppercase text-[#000000]">
              ZX7 Speaker
            </h2>
            <Link to="/product/zx7-speaker">
              <Button 
                variant="outline"
                className="bg-transparent hover:bg-[#000000] text-[#000000] hover:text-white border-[#000000] border-[1px] font-bold text-[13px] tracking-[1px] uppercase h-[48px] px-[30px] transition-colors w-fit"
              >
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>

        {/* YX1 Earphones */}
        <div className="grid md:grid-cols-2 gap-[24px] md:gap-[11px] lg:gap-[30px]">
          <div 
            className="bg-[#F1F1F1] rounded-[8px] h-[200px] md:h-[320px] bg-cover bg-center"
            style={{
              backgroundImage: `url('${ASSETS.home.yx1Earphones.desktop}')`
            }}
          />
          <div className="bg-[#F1F1F1] rounded-[8px] px-6 md:px-[41px] lg:px-[95px] py-[41px] md:py-[101px] flex flex-col gap-8 justify-center">
            <h2 className="text-[28px] leading-[38px] tracking-[2px] font-bold uppercase text-[#000000]">
              YX1 Earphones
            </h2>
            <Link to="/product/yx1-earphones">
              <Button 
                variant="outline"
                className="bg-transparent hover:bg-[#000000] text-[#000000] hover:text-white border-[#000000] border-[1px] font-bold text-[13px] tracking-[1px] uppercase h-[48px] px-[30px] transition-colors w-fit"
              >
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

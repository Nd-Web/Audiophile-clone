import { CategoryCard } from './CategoryCard'
import { ASSETS } from '@/lib/assets'
import headphone from "@/assets/headphone.png";
import speakers from "@/assets/speakers.png";
import earphones from "@/assets/earphones.png";

const CATEGORIES = [
  {
    title: 'Headphones',
    image: headphone,
    link: '/headphones'
  },
  {
    title: 'Speakers',
    image: speakers,
    link: '/speakers'
  },
  {
    title: 'Earphones',
    image: earphones,
    link: '/earphones'
  }
]

export function Categories() {
  return (
    <section className="py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        {/* Added pt-12 to provide space for overlapping product images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[68px] md:gap-[10px] lg:gap-[30px] pt-12">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}

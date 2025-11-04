import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface CategoryCardProps {
  title: string
  image: string
  link: string
}

export function CategoryCard({ title, image, link }: CategoryCardProps) {
  return (
    <Link 
      to={link}
      className="relative group"
    >
      {/* Product Image - positioned above card */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 w-full flex items-center justify-center">
        <img 
          src={image} 
          alt={title}
          className="w-auto h-[160px] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Card Content */}
      <div className="bg-[#F1F1F1] rounded-[8px] pt-[110px] pb-[22px] px-6 flex flex-col items-center group-hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-[15px] font-bold tracking-[1.07px] uppercase text-[#000000] mb-[15px]">
          {title}
        </h3>
        <div className="flex items-center gap-[13.32px] text-[13px] font-bold tracking-[1px] uppercase text-[#000000]/50 group-hover:text-[#D87D4A] transition-colors">
          <span>Shop</span>
          <ChevronRight className="w-[5px] h-[10px] text-[#D87D4A]" strokeWidth={3} />
        </div>
      </div>
    </Link>
  )
}

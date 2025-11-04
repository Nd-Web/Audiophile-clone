import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Categories } from '@/components/home/Categories'
import { BestGear } from '@/components/home/BestGear'
import { Button } from '@/components/ui/button'
import { db } from '@/services/database'
import type { Product } from '@/types/database'

export default function SpeakersPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const fetchedProducts = await db.getProductsByCategory('speakers')
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Failed to load speakers:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading speakers...</p>
      </div>
    )
  }

  return (
    <>
      {/* Category Header */}
      <div className="bg-[#191919] py-[32px] md:py-[105px] lg:py-[98px]">
        <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
          <h1 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] tracking-[2px] md:tracking-[1.43px] font-bold uppercase text-white text-center">
            Speakers
          </h1>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 py-[64px] md:py-[120px] lg:py-[160px]">
        <div className="space-y-[120px] md:space-y-[120px] lg:space-y-[160px]">
          {products.map((product, index) => (
            <div
              key={product.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-[32px] md:gap-[52px] lg:gap-[125px] items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Product Image */}
              <div
                className={`w-full h-[352px] md:h-[352px] lg:h-[560px] rounded-[8px] overflow-hidden bg-[#F1F1F1] flex items-center justify-center ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}
              >
                <picture>
                  <source media="(min-width: 1024px)" srcSet={product.mainImage.desktop} />
                  <source media="(min-width: 768px)" srcSet={product.mainImage.tablet} />
                  <img
                    src={product.mainImage.mobile}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </div>

              {/* Product Info */}
              <div
                className={`flex flex-col justify-center gap-[24px] md:gap-[32px] text-center lg:text-left ${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}
              >
                {product.new && (
                  <p className="text-[14px] leading-[19px] tracking-[10px] uppercase text-[#D87D4A] font-normal">
                    NEW PRODUCT
                  </p>
                )}

                <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] tracking-[1px] md:tracking-[1.43px] font-bold uppercase text-[#000000] max-w-[398px] mx-auto lg:mx-0">
                  {product.name}
                </h2>

                <p className="text-[15px] leading-[25px] font-medium text-[#000000]/50 max-w-[572px] mx-auto lg:mx-0">
                  {product.description}
                </p>

                <div className="flex justify-center lg:justify-start">
                  <Link to={`/product/${product.slug}`}>
                    <Button className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white text-[13px] font-bold tracking-[1px] uppercase h-[48px] px-[30px] rounded-none transition-colors duration-300">
                      SEE PRODUCT
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pb-[120px] md:pb-[96px] lg:pb-[168px]">
        <Categories />
      </div>

      {/* Best Gear Section */}
      <BestGear />
    </>
  )
}

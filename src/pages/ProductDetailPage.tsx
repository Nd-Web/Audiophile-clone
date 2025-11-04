import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Categories } from '@/components/home/Categories'
import { BestGear } from '@/components/home/BestGear'
import { db } from '@/services/database'
import type { Product } from '@/types/database'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        if (productSlug) {
          const fetchedProduct = await db.getProductBySlug(productSlug)
          setProduct(fetchedProduct)
        }
      } catch (error) {
        console.error('Failed to load product:', error)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productSlug])

  const handleAddToCart = async () => {
    if (!product) return

    try {
      db.addToCart(product.slug, quantity)
      toast.success(`${product.name} added to cart!`)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast.error('Failed to add to cart')
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Product not found</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Go Back Button */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pt-[16px] md:pt-[33px] lg:pt-[80px] pb-[24px] md:pb-[24px] lg:pb-[56px]">
        <Link
          to="/"
          className="text-[15px] leading-[25px] font-medium text-[#000000]/50 hover:text-[#D87D4A] transition-colors duration-300"
        >
          Go Back
        </Link>
      </div>

      {/* Product Info Section */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pb-[88px] md:pb-[120px] lg:pb-[160px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] md:gap-[69px] lg:gap-[128px] items-center">
          {/* Product Image */}
          <div className="w-full h-[327px] md:h-[480px] lg:h-[560px] rounded-[8px] overflow-hidden bg-[#F1F1F1] flex items-center justify-center">
            <picture>
              <source media="(min-width: 1024px)" srcSet={product.mainImage.desktop} />
              <source media="(min-width: 768px)" srcSet={product.mainImage.tablet} />
              <img
                src={product.mainImage.mobile}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </picture>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-[24px] md:gap-[32px]">
            {product.new && (
              <p className="text-[14px] leading-[19px] tracking-[10px] uppercase text-[#D87D4A] font-normal">
                NEW PRODUCT
              </p>
            )}

            <h1 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] tracking-[1px] md:tracking-[1.5px] font-bold uppercase text-[#000000] max-w-[398px]">
              {product.name}
            </h1>

            <p className="text-[15px] leading-[25px] font-medium text-[#000000]/50">
              {product.description}
            </p>

            <p className="text-[18px] leading-[25px] tracking-[1.29px] font-bold text-[#000000]">
              $ {product.price.toLocaleString()}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-[16px]">
              {/* Quantity Selector */}
              <div className="flex items-center bg-[#F1F1F1] h-[48px]">
                <button
                  onClick={decrementQuantity}
                  className="w-[48px] h-[48px] flex items-center justify-center text-[#000000]/25 hover:text-[#D87D4A] transition-colors text-[13px] font-bold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-[48px] text-center text-[13px] font-bold text-[#000000] tracking-[1px]">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-[48px] h-[48px] flex items-center justify-center text-[#000000]/25 hover:text-[#D87D4A] transition-colors text-[13px] font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white text-[13px] font-bold tracking-[1px] uppercase h-[48px] px-[32px] rounded-none transition-colors duration-300"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features and In The Box Section */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pb-[88px] md:pb-[120px] lg:pb-[160px]">
        <div className="grid grid-cols-1 lg:grid-cols-[635px_350px] gap-[88px] md:gap-[120px] lg:gap-[130px]">
          {/* Features */}
          <div className="flex flex-col gap-[24px] md:gap-[32px]">
            <h2 className="text-[24px] md:text-[32px] leading-[36px] md:leading-[36px] tracking-[0.86px] md:tracking-[1.14px] font-bold uppercase text-[#000000]">
              FEATURES
            </h2>
            <p className="text-[15px] leading-[25px] font-medium text-[#000000]/50 whitespace-pre-line">
              {product.features}
            </p>
          </div>

          {/* In The Box */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-[24px] md:gap-[165px] lg:gap-[32px]">
            <h2 className="text-[24px] md:text-[32px] leading-[36px] md:leading-[36px] tracking-[0.86px] md:tracking-[1.14px] font-bold uppercase text-[#000000] md:w-[300px] lg:w-auto">
              IN THE BOX
            </h2>
            <ul className="space-y-[8px]">
              {product.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-[24px]">
                  <span className="text-[15px] leading-[25px] font-bold text-[#D87D4A]">
                    {item.quantity}x
                  </span>
                  <span className="text-[15px] leading-[25px] font-medium text-[#000000]/50">
                    {item.item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pb-[120px] md:pb-[120px] lg:pb-[160px]">
        <div className="grid grid-cols-1 md:grid-cols-[277px_395px] lg:grid-cols-[445px_635px] gap-[20px] md:gap-[18px] lg:gap-[32px]">
          {/* Left Column - Two Small Images Stacked */}
          <div className="flex flex-col gap-[20px] md:gap-[18px] lg:gap-[32px]">
            <div className="w-full h-[174px] md:h-[174px] lg:h-[280px] rounded-[8px] overflow-hidden">
              <picture>
                <source media="(min-width: 1024px)" srcSet={product.gallery.first.desktop} />
                <source media="(min-width: 768px)" srcSet={product.gallery.first.tablet} />
                <img
                  src={product.gallery.first.mobile}
                  alt={`${product.name} gallery 1`}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
            <div className="w-full h-[174px] md:h-[174px] lg:h-[280px] rounded-[8px] overflow-hidden">
              <picture>
                <source media="(min-width: 1024px)" srcSet={product.gallery.second.desktop} />
                <source media="(min-width: 768px)" srcSet={product.gallery.second.tablet} />
                <img
                  src={product.gallery.second.mobile}
                  alt={`${product.name} gallery 2`}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>

          {/* Right Column - One Tall Image */}
          <div className="w-full h-[368px] md:h-[368px] lg:h-[592px] rounded-[8px] overflow-hidden">
            <picture>
              <source media="(min-width: 1024px)" srcSet={product.gallery.third.desktop} />
              <source media="(min-width: 768px)" srcSet={product.gallery.third.tablet} />
              <img
                src={product.gallery.third.mobile}
                alt={`${product.name} gallery 3`}
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pb-[120px] md:pb-[120px] lg:pb-[160px]">
        <h2 className="text-[24px] md:text-[32px] leading-[36px] md:leading-[36px] tracking-[0.86px] md:tracking-[1.14px] font-bold uppercase text-[#000000] text-center mb-[40px] md:mb-[56px] lg:mb-[64px]">
          YOU MAY ALSO LIKE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[56px] md:gap-[11px] lg:gap-[30px]">
          {product.relatedProducts.map((item) => (
            <div key={item.slug} className="flex flex-col items-center gap-[32px] md:gap-[40px]">
              <div className="w-full h-[120px] md:h-[318px] lg:h-[318px] rounded-[8px] overflow-hidden bg-[#F1F1F1] flex items-center justify-center">
                <picture>
                  <source media="(min-width: 1024px)" srcSet={item.image.desktop} />
                  <source media="(min-width: 768px)" srcSet={item.image.tablet} />
                  <img
                    src={item.image.mobile}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </picture>
              </div>

              <h3 className="text-[24px] leading-[33px] tracking-[1.71px] font-bold uppercase text-[#000000]">
                {item.name}
              </h3>

              <Link to={`/product/${item.slug}`}>
                <Button className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white text-[13px] font-bold tracking-[1px] uppercase h-[48px] px-[30px] rounded-none transition-colors duration-300">
                  SEE PRODUCT
                </Button>
              </Link>
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

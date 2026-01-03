import { Link } from 'react-router-dom'

const ProductCard = ({ product, layout = 'landscape' }) => {
  if (layout === 'portrait') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="flex items-center gap-10 flex-col md:flex-row group relative z-10"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl mb-2 font-medium">{product.name}</h3>
          <p className="text-lg text-tweed">₨{product.price.toLocaleString()}</p>
        </div>
      </Link>
    )
  }

  /* Landscape Layout (Default) */
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col md:block items-center group relative z-10"
    >
      <div className="w-full flex justify-center mb-3 md:mb-3">
        {/* Mobile: Consistent aspect ratio. Desktop: Max height constraint */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto aspect-[3/4] md:aspect-auto object-cover md:object-contain md:max-h-[500px] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="text-center md:text-center w-full">
        <h3 className="text-xl md:text-xl mb-1 font-medium mt-3">{product.name}</h3>
        <p className="text-tweed mt-1">₨{product.price.toLocaleString()}</p>
      </div>
    </Link>
  )
}

export default ProductCard


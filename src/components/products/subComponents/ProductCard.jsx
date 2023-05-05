import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { MdAddShoppingCart, MdOutlineFavoriteBorder } from "react-icons/md";

import PriceDiscount from "./PriceDiscount";
import RatingStar from "./RatingStar";

const ProductCard = ({
  id,
  title,
  category,
  price,
  thumbnail,
  rating,
  discountPercentage,
}) => {
  return (
    <div className="group relative flex cursor-pointer flex-col gap-4 overflow-hidden">
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <MdAddShoppingCart
          className="translate-x-[150%] cursor-pointer rounded-full bg-[#13101E]/80 p-2 text-4xl text-white transition-transform duration-200 group-hover:translate-x-0"
          aria-label="Add to Cart"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart
          }}
        />
        <MdOutlineFavoriteBorder
          className="translate-x-[150%] cursor-pointer rounded-full bg-[#13101E]/80 p-2 text-4xl text-white transition-transform delay-100 duration-200 group-hover:translate-x-0"
          aria-label="Add to Favorite"
          onClick={(e) => {
            e.stopPropagation();
            // Add to favorite
          }}
        />
      </div>
      <div className="z-0 h-full w-full">
        <Image
          src={thumbnail}
          alt={title}
          placeholder="blur"
          className="aspect-square w-full rounded-lg shadow-md group-hover:blur-sm"
          blurDataURL={thumbnail}
          width={286}
          height={286}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="flex-1 text-xl font-semibold">{title}</h2>
        </div>
        <div className="mb-1">
          <p>{category}</p>
          {rating && <RatingStar rate={rating} />}
        </div>
        {discountPercentage ? (
          <PriceDiscount price={price} discount={discountPercentage} />
        ) : (
          <div className="flex items-center gap-2">
            <p className="font-semibold">{`$ ${price.toFixed(3)}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

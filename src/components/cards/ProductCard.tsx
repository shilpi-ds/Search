import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import RtfConverter from "@yext/rtf-converter";
import Product from "../../types/products";


const ProductCard: CardComponent<Product> = ({
  result,
}: CardProps<Product>): JSX.Element => {
  const product: Product = result.rawData;
  console.log(product, "Product");
  return (
    <>
       <div className="faq-sec">
        <div className="faq-blocks">
         
              <span className="faq-icon"></span>
              <div className="faq-content new-accr">
                <p>Product Name : {product?.name}</p>
                {/* <p>{product?.price.currencyCode}</p>*/} <p>Price : ${product?.price.value}</p>  
                <p>Color : {product?.color}</p>
                <p>Size : {product?.size}</p>
                <p>Brand : {product?.brand}</p>
                <p><img src={product?.primaryPhoto?.image?.sourceUrl} height="300px" width="300px"/></p>
              </div>
           
        </div>
      </div>
    </>
  );
};

export default ProductCard;

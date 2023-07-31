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
                <p>{product?.name}</p>
                <p>{product?.price.currencyCode}</p> <p>{product?.price.value}</p> 
                <p>{product?.color}</p>
                <p>{product?.size}</p>
                <p>{product?.brand}</p>
                <p><img src={product?.primaryPhoto?.image?.sourceUrl} height="300px" width="300px"/></p>
              </div>
           
        </div>
      </div>
    </>
  );
};

export default ProductCard;

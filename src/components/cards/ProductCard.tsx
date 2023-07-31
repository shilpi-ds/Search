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
              </div>
           
        </div>
      </div>
    </>
  );
};

export default ProductCard;

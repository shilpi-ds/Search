import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Faq from "../../types/faqs";
import { Accordion, AccordionItem } from "react-light-accordion";
import "react-light-accordion/demo/css/index.css"; // Import the accordion CSS (adjust the path accordingly)

const FaqCard: CardComponent<Faq> = ({
  result,
}: CardProps<Faq>): JSX.Element => {
  const faq: Faq = result.rawData;
  console.log(faq, "faq");

  return (
    <>
      <div className="faq-sec">
        <div className="faq-blocks">
          <Accordion atomic={false}>
            <AccordionItem className="faq-title" title={faq?.question}>
              <span className="faq-icon"></span>
              <div className="faq-content new-accr">
                <p>{faq?.answer}</p>
              </div>
            </AccordionItem>
            {/* Add more AccordionItem components for additional FAQs */}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FaqCard;
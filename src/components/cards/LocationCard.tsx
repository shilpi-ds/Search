import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import RtfConverter from "@yext/rtf-converter";


const LocationCard: CardComponent<LocationCard> = ({
  result,
}: CardProps<LocationCard>): JSX.Element => {
  const location: LocationCard = result.rawData;

  return (
    <>
      <div>Test
      </div>
    </>
  );
};

export default LocationCard;

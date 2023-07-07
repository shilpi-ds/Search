import StandardSection from "../sections/StandardSection";
import { VerticalConfig } from "../components/UniversalResults";
import FaqCard from "../components/cards/FaqCard";
import LocationCard from "../components/cards/LocationCard";

export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {
  faqs: {
    SectionComponent: StandardSection,
    label: "FAQ",
    viewAllButton: true,
    cardConfig: {
      CardComponent: FaqCard,
      showOrdinal: false,
    },
  },
  locations: {
    SectionComponent: StandardSection,
    label: "Locations",
    viewAllButton: true,
    cardConfig: {
      CardComponent: LocationCard,
      showOrdinal: false,
    },
  },

};

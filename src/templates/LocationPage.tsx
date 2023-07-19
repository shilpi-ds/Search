// src/templates/search.tsx

import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchBar,
  Facets,
  StandardFacet,
  StandardCard,
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  } from "@yext/search-ui-react";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { searchConfig } from "../config/searchConfig";
import PageLayout from "../components/common/PageLayout";

export const getPath: GetPath<TemplateProps> = () => {
  return "locations";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `Turtlehead Tacos Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};
const verticalKey :string = "locations"
const limit:number = 5;
searchConfig.verticalKey = verticalKey;
const searcher = provideHeadless(searchConfig);

const Location: Template<TemplateRenderProps> = () => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <PageLayout  verticalKey={verticalKey} limit={limit}>
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
          <SearchBar />
          <SpellCheck />
          <ResultsCount />
         <Facets onlyRenderChildren={true}>
  <StandardFacet fieldId={"address.city"} defaultExpanded={false} label={"Filter By City"}
  />
    <StandardFacet fieldId={"address.region"} defaultExpanded={false} label={"Filter By Region"}/>
</Facets>
          <VerticalResults
            CardComponent={StandardCard}
            displayAllOnNoResults={false}
          />
        </div>
        <Pagination />
      </div>
      </PageLayout>
    </SearchHeadlessProvider>
  );
};

export default Location;
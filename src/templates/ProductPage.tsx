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
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  Facets,
  StandardFacet,
  NumericalFacet,
  NumericalFacets,
  } from "@yext/search-ui-react";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { searchConfig } from "../config/searchConfig";
import PageLayout from "../components/common/PageLayout";
import ProductCard from "../components/cards/ProductCard";

export const getPath: GetPath<TemplateProps> = () => {
  return "product";
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
const verticalKey :string = "products";
const limit:number = 5;
searchConfig.verticalKey = verticalKey;
const searcher = provideHeadless(searchConfig);

const Product: Template<TemplateRenderProps> = () => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <PageLayout verticalKey={verticalKey}  limit={limit}>
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
          <SearchBar placeholder="Search for Products..."/>
          <SpellCheck />
          <ResultsCount />
          <Facets onlyRenderChildren={true}>
  <StandardFacet fieldId={"brand"} defaultExpanded={false} label={"Filter By Brands"}
  />
    <StandardFacet fieldId={"size"} defaultExpanded={false} label={"Filter By Size"}/>
    <NumericalFacets fieldId={"price.value"}
              customCssClasses={{ container: "mr-10" }}
              searchOnChange={false}
              inputPrefix={<p>$</p>}
              label={"Filter By Price"}
            />
    {/* <StandardFacet fieldId={"price"} defaultExpanded={false} label={"Filter By Price"}/> */}
</Facets>
          <VerticalResults
            CardComponent={ProductCard}
            displayAllOnNoResults={false}
          />
        </div>
        <Pagination />
      </div>
      </PageLayout>
    </SearchHeadlessProvider>
  );
};

export default Product;
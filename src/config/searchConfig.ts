import { HeadlessConfig } from "@yext/search-headless-react";

export const UniversalLimit = { locations: 3, products:5,faqs: 2};
export const endpoints = {
  universalSearch:
  "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
verticalSearch:
  "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
questionSubmission:
  "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
universalAutocomplete:
  "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
verticalAutocomplete:
  "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
filterSearch:
  "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
}

export const searchConfig: HeadlessConfig = {
  apiKey: "b1950856909b2a61491063724454bf4c",
  experienceKey: "search",
  experienceVersion: "STAGING",
  locale: "en_GB",
  endpoints: endpoints,
};
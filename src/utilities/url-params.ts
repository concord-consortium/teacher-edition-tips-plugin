import { parse } from "query-string";

export interface QueryParams {
  authoring?: boolean;
}

const params = parse(location.search);

export const DefaultUrlParams: QueryParams = {
  authoring: false
};

export const urlParams: QueryParams = params;

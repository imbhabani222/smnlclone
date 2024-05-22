import { searchApi } from "../../api/doctype";

export const globalModulesSearch = (target: any, source: any) => {
  const matchingSuggestions = source.filter((item: any) =>
    item?.label?.toLowerCase().includes(target.toLowerCase())
  );
  return matchingSuggestions;
};

export const tableDataSearch = (
  target: any,
  source: any,
  searchIndexes: any
) => {
  const matchingSuggestions = source.filter((item: any) => {
    let match = false;
    for (let x of searchIndexes) {
      if (item?.[x]?.toLowerCase().includes(target.toLowerCase())) {
        match = true;
        return match;
      }
    }
    return match;
  });
  return matchingSuggestions;
};

export const onSearchThroughApi = (
  searchKeyWord: any,
  appName: string
) => {
  return searchApi(searchKeyWord, appName);
};

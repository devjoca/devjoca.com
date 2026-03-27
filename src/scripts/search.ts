import Fuse from "fuse.js";
import slugify from "@utils/slugify";
import { formatDatetime } from "@utils/formatDatetime";
import type { Frontmatter } from "src/types";

type SearchItem = {
  title: string;
  description: string;
  headings: string[];
  frontmatter: Frontmatter;
};

const SELECTORS = {
  root: "[data-search-root]",
  input: "[data-search-input]",
  results: "[data-search-results]",
  status: "[data-search-status]",
};

const cardClasses = {
  container: "my-6",
  link: "text-skin-accent font-medium text-lg underline-offset-4 decoration-dashed focus-visible:no-underline focus-visible:underline-offset-0 inline-block",
  heading: "font-medium text-lg decoration-dashed hover:underline",
  datetime: "opacity-80 flex items-center space-x-2",
  datetimeIcon: "scale-90 w-6 h-6 inline-block fill-skin-base",
  datetimeText: "italic text-sm",
};

const createCalendarIcon = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("class", cardClasses.datetimeIcon);

  const firstPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  firstPath.setAttribute(
    "d",
    "M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"
  );

  const secondPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  secondPath.setAttribute(
    "d",
    "M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"
  );

  svg.append(firstPath, secondPath);
  return svg;
};

const createDatetime = (datetime: string) => {
  const wrapper = document.createElement("div");
  wrapper.className = cardClasses.datetime;
  wrapper.append(createCalendarIcon());

  const srLabel = document.createElement("span");
  srLabel.className = "sr-only";
  srLabel.textContent = "Posted on:";
  wrapper.append(srLabel);

  const content = document.createElement("span");
  content.className = cardClasses.datetimeText;

  const { date, time } = formatDatetime(datetime);
  content.append(date);

  if (time) {
    const separator = document.createElement("span");
    separator.setAttribute("aria-hidden", "true");
    separator.textContent = " | ";

    const srTime = document.createElement("span");
    srTime.className = "sr-only";
    srTime.textContent = "\u00A0at\u00A0";

    content.append(separator, srTime, time);
  }

  wrapper.append(content);
  return wrapper;
};

const createSearchResult = (item: SearchItem) => {
  const listItem = document.createElement("li");
  listItem.className = cardClasses.container;

  const link = document.createElement("a");
  link.href = `/posts/${slugify(item.frontmatter)}`;
  link.className = cardClasses.link;

  const heading = document.createElement("h2");
  heading.className = cardClasses.heading;
  heading.textContent = item.frontmatter.title;

  link.append(heading);
  listItem.append(link, createDatetime(item.frontmatter.datetime));

  const description = document.createElement("p");
  description.textContent = item.frontmatter.description;
  listItem.append(description);

  return listItem;
};

const updateSearchUrl = (value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (value.length > 0) {
    searchParams.set("q", value);
  } else {
    searchParams.delete("q");
  }

  const query = searchParams.toString();
  const nextPath = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
  history.pushState(null, "", nextPath);
};

export const initSearch = () => {
  const root = document.querySelector<HTMLElement>(SELECTORS.root);

  if (!root || root.dataset.searchReady === "true") {
    return;
  }

  root.dataset.searchReady = "true";

  const input = root.querySelector<HTMLInputElement>(SELECTORS.input);
  const results = root.querySelector<HTMLUListElement>(SELECTORS.results);
  const status = root.querySelector<HTMLElement>(SELECTORS.status);
  const rawSearchData = root.dataset.searchData;

  if (!input || !results || !status || !rawSearchData) {
    return;
  }

  const searchList = JSON.parse(rawSearchData) as SearchItem[];
  const fuse = new Fuse(searchList, {
    keys: ["title", "description", "headings"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  });

  const renderResults = (value: string) => {
    const searchResults = value.length > 1 ? fuse.search(value) : [];
    results.replaceChildren(
      ...searchResults.map(({ item }) => createSearchResult(item))
    );

    if (value.length > 1) {
      status.textContent = `Found ${searchResults.length} ${
        searchResults.length === 1 ? "result" : "results"
      } for '${value}'`;
      status.classList.remove("hidden");
    } else {
      status.textContent = "";
      status.classList.add("hidden");
    }

    updateSearchUrl(value);
  };

  const initialQuery =
    new URLSearchParams(window.location.search).get("q") ?? "";
  input.value = initialQuery;

  requestAnimationFrame(() => {
    input.focus();
    input.setSelectionRange(initialQuery.length, initialQuery.length);
  });

  renderResults(initialQuery);
  input.addEventListener("input", () => renderResults(input.value));
};

import { articles } from "./articles";

const nodeNameWIhiteList = [
  "SPAN",
  "DIV",
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "STRONG",
  "EM",
  "I",
  "B",
];

const ucFirst = (str: string) =>
  str.length ? `${str[0].toUpperCase()}${str.slice(1)}` : "";

export function getArticleElementsWithContainers(rootNode: Node) {
  const articleElements: Array<{
    options: string[];
    validValue: string;
  }> = [];

  processAllTextNodes([rootNode], (element) => {
    if (nodeNameWIhiteList.includes(element.parentNode?.nodeName ?? "")) {
      let html = element.textContent ?? "";

      Object.values(articles).forEach((lowerCaseArticles) => {
        const upperCaseArticles = lowerCaseArticles.map((article) =>
          ucFirst(article)
        );

        lowerCaseArticles.forEach((article) => {
          html = html.replace(new RegExp(` ?${article} `, "igm"), (match) => {
            const currentElementIndex = articleElements.length;

            const trimmedMatch = match.trim();
            const isUcFirst = trimmedMatch[0] === trimmedMatch[0].toUpperCase();

            if (match[0] !== " " && !isUcFirst) return match;

            const options = isUcFirst ? upperCaseArticles : lowerCaseArticles;

            articleElements.push({
              options,
              validValue: trimmedMatch,
            });

            return `<span data-article-trainer="${currentElementIndex}"></span>`;
          });
        });
      });

      const container = document.createElement("span");
      container.innerHTML = html;
      element.parentNode?.replaceChild(container, element);
    }
  });

  const containers = document.querySelectorAll<HTMLSpanElement>(
    "span[data-article-trainer]"
  );

  const articleElementsWithContainersInDOMOrder = [...containers].map(
    (container) => ({
      ...articleElements[+container.dataset["articleTrainer"]!]!,
      container,
      selectedValue: "",
    })
  );

  return articleElementsWithContainersInDOMOrder;
}

function processAllTextNodes(
  elements: Node[],
  callback: (element: Node) => void
) {
  elements.forEach((element) => {
    if (element.nodeType === 3) {
      callback(element);
    } else {
      if (element instanceof HTMLElement) {
        if (
          ["comment", "header", "footer", "newsletter", "login", "menu"].find(
            (disabledClassName) =>
              [...element.classList].find((className) =>
                className.includes(disabledClassName)
              )
          ) ||
          ["A", "SCRIPT", "HEADER", "FOOTER"].includes(element.nodeName)
        )
          return;

        const isElementVisible = !!element.offsetHeight;
        if (!isElementVisible) return;

        const children = element.childNodes;
        if (children.length) {
          processAllTextNodes([...children], callback);
        }
      }
    }
  });
}

function findNextWord(
  container: HTMLSpanElement,
  matcher: (word: string) => boolean
) {
  let node = container?.nextSibling;

  while (node) {
    if (node.nodeType === 3) {
      const words = node?.textContent?.split(/\W/) ?? [];
      console.log(words);

      const matchingWord = words.find((word) => matcher(word));
      if (matchingWord) return matchingWord;
    }
    node = node.nextSibling;
  }

  return null;
}

function findPreviousWord(
  container: HTMLSpanElement,
  matcher: (word: string) => boolean
) {
  let node = container?.previousSibling;

  while (node) {
    if (node.nodeType === 3) {
      const words = node?.textContent?.split(/\W/) ?? [];
      console.log(words);

      const matchingWord = words.find((word) => matcher(word));
      if (matchingWord) return matchingWord;
    }
    node = node.previousSibling;
  }

  return null;
}

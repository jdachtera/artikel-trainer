import { StyledEngineProvider } from "@mui/styled-engine";
import React from "react";
import ReactDOM from "react-dom";

import { ArticleTrainer } from "./components/ArticleTrainer";
import { getArticleElementsWithContainers } from "./helpers";

const lang = `${document.getElementsByTagName("html")[0].getAttribute("lang")}`;

if (lang.substr(0, 2) === "de") {
  const counter = document.createElement("div");
  document.body.appendChild(counter);

  const articleElementsWithContainers = getArticleElementsWithContainers(
    document.body
  );
  ReactDOM.render(
    <StyledEngineProvider injectFirst>
      <ArticleTrainer initialElements={articleElementsWithContainers} />
    </StyledEngineProvider>,
    counter
  );
}

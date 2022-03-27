import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import { getArticleElementsWithContainers } from "../helpers";
import { ArticleChooser } from "./ArticleChooser";
import { css } from "@emotion/css";
import { SuccessModal } from "./SuccessModal";
import { CircularProgressWithPercentage } from "./CircularProgressWithPercentage";

export const ArticleTrainer = ({
  initialElements,
}: {
  initialElements: ReturnType<typeof getArticleElementsWithContainers>;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [elements, setElements] = useState(initialElements);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(-1);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "sync" && changes.isEnabled) {
        const isEnabled = Boolean(changes.isEnabled.newValue?.[location.host]);
        setIsEnabled(isEnabled);
      }
    });

    chrome.storage.sync.get(["isEnabled"], ({ isEnabled }) => {
      setIsEnabled(isEnabled?.[location.host]);
    });
  });

  const onSelectValue = useCallback((index: number, selectedValue: string) => {
    const element = elements[index];

    setElements((prevElements) => [
      ...prevElements.slice(0, index),
      { ...element, selectedValue },
      ...prevElements.slice(index + 1),
    ]);

    setLastSelectedIndex(index);

    if (selectedValue === element.validValue) {
      setScore((score) => score + 1);
    } else {
      setScore((score) => score - 1);
    }
  }, []);

  const validElements = useMemo(
    () =>
      elements.filter((element) => element.selectedValue === element.validValue)
        .length,
    [elements]
  );

  useEffect(() => {
    if (elements.length > 0 && validElements === elements.length) {
      setIsModalOpen(true);
    }
  }, [validElements]);

  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const focusedElementIndex = useMemo(() => {
    const nextUnselectedElement = elements.findIndex(
      ({ selectedValue, validValue }, index) =>
        selectedValue !== validValue && index >= lastSelectedIndex
    );

    if (nextUnselectedElement) return nextUnselectedElement;

    const previousUnselectedElement = elements.findIndex(
      ({ selectedValue, validValue }, index) =>
        selectedValue !== validValue && index <= lastSelectedIndex
    );

    return previousUnselectedElement;
  }, [elements, setLastSelectedIndex]);

  return (
    <>
      {elements.map((element, index) => {
        return isEnabled ? (
          <ArticleChooser
            key={`element-${index}`}
            index={index}
            focus={focusedElementIndex === index}
            element={element}
            onSelectValue={onSelectValue}
          />
        ) : (
          ReactDOM.createPortal(` ${element.validValue} `, element.container)
        );
      })}
      {isEnabled && (
        <>
          {elements.length && (
            <div
              className={css`
                z-index: 10000;
                position: fixed;
                padding: 5px;
                background-color: #54ff05a6;
                top: 20px;
                right: 20px;
              `}
            >
              <CircularProgressWithPercentage
                value={(validElements / elements.length) * 100}
              />
            </div>
          )}

          <SuccessModal
            isModalOpen={isModalOpen}
            score={Math.round((score / elements.length) * 100)}
            onClose={handleModalClose}
          ></SuccessModal>
        </>
      )}
    </>
  );
};

/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getArticleElementsWithContainers } from "../helpers";

export const ArticleChooser = React.memo(
  ({
    element: { validValue, selectedValue, options, container },
    index,
    focus,
    onSelectValue,
  }: {
    element: ReturnType<typeof getArticleElementsWithContainers>[number];
    index: number;
    focus: boolean;
    onSelectValue: (index: number, selectedValue: string) => void;
  }) => {
    const onChange = useCallback(
      (event: SelectChangeEvent) => {
        onSelectValue(index, event.target.value);
      },
      [index]
    );

    const selectRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (focus) {
        selectRef.current?.focus();
      }
    }, [focus]);

    return ReactDOM.createPortal(
      <Select
        inputRef={selectRef}
        MenuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          anchorEl: container,
        }}
        css={css`
          background-color: transparent;
          border: none;
          color: unset;
          font-size: unset;
          letter-spacing: unset;
          border-bottom: 2px gray dashed;
          -webkit-appearance: none;
          padding-left: 0.2em;
          padding-right: 0.2em;
          margin-left: 0.2em;
          margin-right: 0.2em;
          border-radius: 0;
          outline: none;
          &:hover,
          &:focus,
          &:active {
            outline: none;
          }

          ${focus &&
          css`
            background-color: lightgrey;
          `}

          ${selectedValue === validValue &&
          css`
            background-color: #54ff05a6;
            &:hover,
            &:focus,
            &:active {
              outline: none;
              background-color: #54ff05a6;
            }
          `}

          ${selectedValue !== "" &&
          selectedValue !== validValue &&
          css`
            background-color: #ff0505a6;
            &:hover,
            &:focus,
            &:active {
              outline: none;
              background-color: #ff0505a6;
            }
          `}
        .MuiSelect-select {
            padding: 0;
            padding-right: 0 !important;
            min-width: 40px;
            border-radius: 0;
          }
          .MuiSvgIcon-root,
          .MuiOutlinedInput-notchedOutline {
            display: none;
          }
        `}
        value={selectedValue}
        onChange={onChange}
      >
        {options.map((option, optionIndex) => (
          <MenuItem key={`article-trainer-${optionIndex}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>,
      container
    );
  }
);

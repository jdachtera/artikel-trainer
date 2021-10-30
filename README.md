# Artikel Trainer Chrome Extension

![build](https://github.com/jdachtera/artikel-trainer/workflows/build/badge.svg)

Train your german article skills by reading websites in german
Visit any german webseite and train your german grammar skills. All the "Artikel"s will be replaced by a multiple choice test. You can turn the extension on and off by clicking the german flag symbol in the toolbar.

https://chrome.google.com/webstore/detail/artikel-trainer/gfdjeoegpepninhhccjelomgohccpmlf

## Prerequisites

- [node + yarn](https://nodejs.org/) (Current Version)

## Option

- [Visual Studio Code](https://code.visualstudio.com/)

## Includes the following

- TypeScript
- Webpack
- React
- Jest
- Example Code
  - Chrome Storage
  - Options Version 2
  - content script
  - count up badge number
  - background

## Project Structure

- src/typescript: TypeScript source files
- src/assets: static files
- dist: Chrome Extension directory
- dist/js: Generated JavaScript files

## Setup

```
yarn
```

## Import as Visual Studio Code project

...

## Build

```
yarn build
```

## Build in watch mode

### terminal

```
yarn watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

## Test

`npx jest` or `yarn test`

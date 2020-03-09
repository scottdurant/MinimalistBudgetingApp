# Minimalist Budgeting App

This project is a React Native app that will help users budget their money. The main goal with this project is to create something that is simple and
easy to use, which will encourage users to enter their purchases regularly and stay within their budgets.

## Structure
The main directories to look at are the `components` and `screens` directories. `components` includes things like an `AddPurchase` component, which displays a text input and a button for users to enter a purchase. `screens` contains all of the screens for the app, such as the `HomeScreen`, and `AddPurchaseScreen`. 

## Getting Started
If you just want to quickly run the app on your Android device, visit the [Expo Page](https://expo.io/@scottd/MinimalistBudgetingApp) and scan the QR code with the [Expo Client App](https://expo.io/tools).

If you want to make changes to the code and see them appear on your device, follow these steps (adapted from the [React Native Getting Started Page](https://reactnative.dev/docs/getting-started)) to run this app on your local machine for development/testing purposes. Check the React Native instructions if you run into problems. 


### Prerequisites

Install [Node 10 LTS](https://nodejs.org/en/download/) or greater.

Use npm to install the Expo CLI command line utility

```
npm install -g expo-cli
```



### Installing and running

Next, clone the repository, change directories, and run. 

```
git clone https://github.com/scottdurant/MinimalistBudgetingApp.git
```

```
cd MinimalistBudgetingApp
```

```
npm start
```
or
```
yarn start
```

You may need to run `npm install` in the project directory if `npm start` causes errors. 

From this point, you can install the [Expo Client for Android](https://expo.io/tools#client) on a phone and scan the QR code to run the app on an actual Android device. You may need to click tunnel above the QR code before scanning it.

You can also follow the more detailed [React Native CLI Quickstart](https://reactnative.dev/docs/getting-started) instructions to get an emulator installed and running. 



## Tools Used

* [React Native](https://reactnative.dev/)
* [Expo Client](https://expo.io/tools)
* [React Navigation](https://reactnavigation.org/)
* [Visual Studio Code](https://code.visualstudio.com/)

## Authors

* **Scott Durant** - [github](https://github.com/scottdurant)
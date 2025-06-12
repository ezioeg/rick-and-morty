## 🔬 Rick and Morty  
Mobile application developed with React Native CLI. It allows users to explore characters and episodes from the Rick and Morty series using the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql).

### Features  
- **Character List**  
  Paginated list of characters with filters by name, species, and status.  
  - Each item shows image, name, and species.  
  - Reset options available for filters.

- **Character Detail**  
  Displays full character information: name, image, species, gender, status, last known location, and episodes.

- **Episode List**  
  Scrollable list of episodes including episode name and air date.

- **Episode Detail**  
  Displays detailed episode info: name, air date, episode code, and character list.

- **Internationalization**  
  Supports English and Spanish with a toggle button in the UI.

- **Theming**  
  Includes four switchable themes: `light`, `dark`, `portal`, and `multiverse`.

## Technologies Used
### Core
- [React Native](https://reactnative.dev/) `v0.79.3`
- [React](https://reactjs.org/) `v19.0.0`
- [React Navigation Native](https://reactnavigation.org/docs/getting-started) `v7.1.10`
- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator) `v7.3.14`
- [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator) `v7.3.14`
- [Apollo Client](https://www.apollographql.com/docs/react/) `v3.13.8`
- [GraphQL](https://graphql.org/) `v16.11.0`

### UI/Styling
- [React Native Svg](https://github.com/react-native-svg/react-native-svg) `v15.12.0`

### State Management & Persist
- [Zustand](https://github.com/pmndrs/zustand) `v5.0.5` – used to store language preferences with persistent state.
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) `v2.2.0`

### Internationalization
- [i18next](https://www.i18next.com/) `v25.2.1`
- [react-i18next](https://react.i18next.com/) `v15.5.2`

### Testing
- [Jest](https://jestjs.io/) `v29.6.3`
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) `v13.2.0`

## Setup
Install dependencies:
```bash
# Using npm
npm install

# OR using Yarn
yarn install
   ```

## Run
Start metro:
```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Build and run for Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### Build and run for iOS
Before running on iOS for the first time, make sure to install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

Then:
```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Testing
To run unit tests:

```bash
npm test
# OR using
npm run test
```
> **Note**  
> Most important components have dedicated unit tests using **Jest** and **React Native Testing Library**.

## Contributions
Contributions are welcome. If you wish to improve the project, please fork it and submit a pull request.

## Contact
For questions or suggestions, you can contact me at [ezioeg@gmail.com].

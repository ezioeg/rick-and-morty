# RickAndMorty App
RickAndMorty App is a technical test using React Native CLI. The goal is to create an app that allows users to explore characters and episodes from the Rick and Morty series using the Rick and Morty GraphQL API.

## Features

### Character List

- Paginated list of characters from the Rick and Morty universe.
- Each item includes:
  - Character image.
  - Name.
  - Species.
- Filter options:
  - **Name**: Alphabetical search by character name.
  - **Species**: Filter by species with a reset option to show all.
  - **Status**: Filter by status (Alive, Dead, Unknown), also with a reset option.

### Character Detail

- Displays detailed information about the selected character:
  - Name
  - Image
  - Species
  - Gender
  - Status
  - Last known location
  - List of episodes where the character appears

### Episode List

- Scrollable list of episodes including:
  - Episode name
  - Air date

### Episode Detail

- Displays detailed information about the selected episode:
  - Name
  - Air date
  - Episode code (e.g., S01E01)
  - List of characters featured in the episode

## Technologies Used
### Core
- [React Native](https://reactnative.dev/) `0.79.3`
- [React](https://reactjs.org/) `v19.0.0`
- [React Navigation Native](https://reactnavigation.org/docs/getting-started) `v7.1.10`
- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator) `v7.3.14`
- [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator) `v7.3.14`
- [Apollo Client](https://www.apollographql.com/docs/react/) `v3.13.8`
- [GraphQL](https://graphql.org/) `v16.11.0`

### UI/Styling
- [React Native Svg](https://github.com/react-native-svg/react-native-svg) `v15.12.0`

### State Management
- [Zustand](https://github.com/pmndrs/zustand)

### Testing
- [Jest](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

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
npm run test
```
> **Note**  
> Most important components have dedicated unit tests using **Jest** and **React Native Testing Library**.

## Contributions
Contributions are welcome. If you wish to improve the project, please fork it and submit a pull request.

## Contact
For questions or suggestions, you can contact me at [ezioeg@gmail.com].

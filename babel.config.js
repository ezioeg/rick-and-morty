module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@features': './src/features',
          '@shared': './src/shared',
          '@theme': './src/theme',
          '@stores': './src/stores',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin', // Debe ir al final
  ],
};

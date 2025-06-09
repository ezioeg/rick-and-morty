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
        },
      },
    ],
    'react-native-reanimated/plugin', // debe ir al final
  ],
};

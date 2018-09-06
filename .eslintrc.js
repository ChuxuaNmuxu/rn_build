module.exports = {
    "extends": "airbnb",
    "plugins": [
      "react",
      "react-native"
    ],
    "globals": {
      "__DEV__": true,
      "fetch": true,
      "PixelRatio": true,
      "SCREEN_WIDTH": true,
      "SCREEN_HEIGHT": true,
      "storage": true,
      "Fetch": true,
      "Actions": true,
      "PX_WIDTH": true,
      "PX_HEIGHT": true,
      "Android": true,
    },
    "parser": "babel-eslint",
    "rules": {
      "max-len": ["error", 120],
      "no-console": 0,
      "react/forbid-prop-types": [0, { "forbid": ["any", "array", "object"] }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "import/prefer-default-export": 0,
      "linebreak-style": 2,
      "no-restricted-syntax": 0,
      "no-underscore-dangle": 0,
      "guard-for-in": 0,
      "react/jsx-one-expression-per-line": 0,
      "linebreak-style": 0,
      "no-plusplus": 0,
      "no-throw-literal": 0,
      "no-multi-assign": 0
    }
  }
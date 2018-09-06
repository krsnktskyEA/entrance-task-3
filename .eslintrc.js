module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "rules": { 
      "semi": ["error", "never"],
      "no-param-reassign": ["warn", { "props": true }],
    }
  }
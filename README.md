# HadoukenTyping


  ### ADD Webpack

``
  npm init -y
  npm install webpack webpack-cli --save-dev
``

``
  mkdir src //for sources
  mkdir dist //for distribution
  
  npx webpack //test from src create main.js to dist
  
  touch webpack.config.js
  
  const path = require('path');
``

  ```
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
      }
    };
  ```

const path = require('path');

module.exports = {
  target: 'node',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    // publicPath:'/'
    filename: 'bundle.js',
  },
  optimization: {
    minimize: false
  },
  mode: 'production',
};

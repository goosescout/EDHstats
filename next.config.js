path = require('path');

module.exports = {
  basePath: process.env.BASE_PATH,
  sassOptions: {
    includePaths: [path.join(__dirname, './app')],
    prependData: `@import "src/app/styles/variables.scss";`,
  },
};

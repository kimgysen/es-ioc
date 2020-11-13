const env = process.env.NODE_ENV;

module.exports = env => {
  console.log(`Running ${env} Mode using ./webpack/webpack.${env}.js`);
  return require(`./webpack/webpack.${env}.js`);
};
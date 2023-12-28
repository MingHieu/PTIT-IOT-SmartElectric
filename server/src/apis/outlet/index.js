module.exports = {
  outletRouter: require('./outlet.router'),
  outletService: require('./outlet.service'),
  ...require('./outlet.socket'),
};

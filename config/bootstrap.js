/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  sails.OK = 0
  sails.ERROR_URL_NEEDED = 1
  sails.ERROR_HASH_CREATION = 2
  var redis = require('redis')
  sails.redisClient = redis.createClient(6379, '127.0.0.1')
  //sails.redisClient.auth(sails.config.redis.password)
  cb();
};

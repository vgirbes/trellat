var Sails = require('sails'),
  sails;

before(function(done) {
  this.timeout(300000);
  Sails.lift({
    log: 'error',
    port: 3000
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
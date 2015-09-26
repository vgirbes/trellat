var HashModel = {
	getRandomHash : function (howMany, chars) {
		var crypto = require('crypto')
	    chars = chars
	        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
	    var rnd = crypto.randomBytes(howMany)
	        , value = new Array(howMany)
	        , len = chars.length;

	    for (var i = 0; i < howMany; i++) {
	        value[i] = chars[rnd[i] % len]
	    };

	    return value.join('')
	},
	checkHash : function (hash, cb) {
		sails.redisClient.get(hash, function (err, reply) {
			if (err) throw new err;
			if (reply) {
				cb(true)
			} else {
				cb(false)
			}
		})
	}
};
module.exports = HashModel;
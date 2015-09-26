var HashModel = {
	getRandomHash : function (howMany, cb, chars) {
		var crypto = require('crypto')
	    chars = chars
	        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
	    var rnd = crypto.randomBytes(howMany)
	        , value = new Array(howMany)
	        , len = chars.length;

	    for (var i = 0; i < howMany; i++) {
	        value[i] = chars[rnd[i] % len]
	    };

	    var hash = value.join('')
	    this.checkHash(hash, function (exist) {
	    	if (exist) cb(false)
	    	cb(hash)
	    }.bind(this))
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
	},
	setHash : function (hash, obj, cb) {
		this.checkHash(hash, function (exist) {
			if (exist) cb(false)
			if (typeof obj === "object" && !exist) {
				sails.redisClient.HMSET(hash, obj, function (err, res) {
					console.log(hash)
					if (err) cb(false)
					sails.redisClient.send_command('EXPIRE', [hash, '2629743'])
					cb(true)			
				}.bind(this))
			} else {
				cb(false)
			}
		}.bind(this))
	}
};
module.exports = HashModel;
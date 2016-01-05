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
	    }

	    var hash = value.join('')
	    this.checkHash(hash, (exist) => {
	    	if (exist) {
	    		return cb(false)
	    	}

	    	return cb(hash)
	    })
	},
	checkHash : function (hash, cb) {
		sails.redisClient.hgetall(hash, (err, reply) => {
			if (reply) {
				return cb(true)
			}

			return cb(false)
		})
	},
	setHash : function (hash, obj, cb) {
		this.checkHash(hash, (exist) => {
			if (exist) {
				return cb(false)
			}

			if (typeof obj === "object" && !exist) {
				sails.redisClient.HMSET(hash, obj, (err, res) => {
					if (err) {
						return cb(false)
					}

					sails.redisClient.send_command('EXPIRE', [hash, '2629743'])
					return cb(true)
				})
			} else {
				return cb(false)
			}
		})
	},
	getHashList : function (hash, cb) {
		sails.redisClient.hgetall(hash, (err, result) => {
			if (err || result === null) cb(false)
			return cb(result)
		})
	}
};
module.exports = HashModel;
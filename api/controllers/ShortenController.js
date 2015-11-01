var ShortenController = {
	request : function (req, res) {
		var values = Object.keys(req.body).map((key) => {return req.body[key]})

		var check = values.filter((url, index) => {
			if (index === 0) return url
			if (index > 0 && this.isValidUrl(url)) {
				return url
			}
		})
		
		if (check.length > 1) {
			HashModel.getRandomHash(4, function (hash) {
				HashModel.setHash(hash, check, function (result) {
					if (!result) {
						this.manageResponse(res, hash, sails.ERROR_HASH_CREATION, 'An error has occurred. Please, try again.')
						return
					}
					this.manageResponse(res, hash, sails.OK, 'All went fine! Enjoy! That\'s your shorted url: http://trell.at/'+hash)
				}.bind(this))
			}.bind(this))
		} else {
			this.manageResponse(res, '*', sails.ERROR_URL_NEEDED, 'Please, insert valid URL\'s.')
			return
		}
	},
	isValidUrl : function (url) {
		var validator = require('validator')
		return validator.isURL(url)
	},
	manageResponse : function (res, hash, error, error_msg) {
		var response = {
			error: error,
			status_msg: error_msg,
			hash: hash
		}
		res.end(JSON.stringify(response))
	}
};
module.exports = ShortenController;
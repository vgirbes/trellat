var ShortenController = require('../../../api/controllers/ShortenController');
var request = require('supertest')
var chai = require("chai")
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should

describe('Shorten Controller', () => {
	it('should get true if post a valid url list', (done) => {
		var urls = ['http://www.google.es', 'http://www.github.com']
		var result_url1 = ShortenController.isValidUrl(urls[0]);
		var result_url2 = ShortenController.isValidUrl(urls[1]);
		expect(result_url1).to.be.true
		expect(result_url2).to.be.true
		done()
	}),
	it('should get false if post an invalid url list', (done) => {
		var urls = ['htt//www.google.es', 'javascript:exploit()']
		var result_url1 = ShortenController.isValidUrl(urls[0]);
		var result_url2 = ShortenController.isValidUrl(urls[1]);
		expect(result_url1).to.be.false
		expect(result_url2).to.be.false
		done()
	}),
	it('should return 404 if no url list returned', (done) => {
		request(sails.hooks.http.app)
	    .get('/testfail')
	    .expect(404)
    	.end((err, res) => {
			expect(res).to.exist
			expect(res.status).to.equal(404)
			done()
    	})
	}),
	it('should return a valid url list', (done) => {
		try {
			var obj = {
				0: '',
				1: "http://url1.com",
				2: "http://url2.com"
			}

			HashModel.setHash('test', obj, (result) => {
				request(sails.hooks.http.app)
			    .get('/test')
			    .expect(200)
		    	.end((err, res) => {
					expect(res).to.exist
					expect(res.status).to.equal(200)
					done()
		    	})
			})
		} catch (err) {
			if (err) throw new err
		}
	})
})
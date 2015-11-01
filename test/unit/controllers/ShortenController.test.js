var ShortenController = require('../../../api/controllers/ShortenController');
var request = require('supertest')
var chai = require("chai")
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should

describe('Shorten request', function () {
	it('should get true if post a valid url list', function (done) {
		var urls = ['http://www.google.es', 'http://www.github.com']
		var result_url1 = ShortenController.isValidUrl(urls[0]);
		var result_url2 = ShortenController.isValidUrl(urls[1]);
		expect(result_url1).to.be.true
		expect(result_url2).to.be.true
		done()
	}),
	it('should get false if post a invalid url list', function (done) {
		var urls = ['htt//www.google.es', 'javascript:exploit()']
		var result_url1 = ShortenController.isValidUrl(urls[0]);
		var result_url2 = ShortenController.isValidUrl(urls[1]);
		expect(result_url1).to.be.false
		expect(result_url2).to.be.false
		done()
	})
})
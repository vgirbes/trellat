var request = require('supertest')
var chai = require("chai")
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should

describe('Shorten request', function () {
	it('should get true if post a valid url list', function (done) {
		var urls = ['http://www.google.es', 'http://www.github.com']
		var result = ShortenController.isValidUrlList(urls);
		expect(result).to.be.true
	}),
	it('should get false if post a invalid url list', function (done) {
		var urls = ['htt//www.google.es', 'javascript:exploit()']
		var result = ShortenController.isValidUrlList(urls);
		expect(result).to.be.false
	})
})
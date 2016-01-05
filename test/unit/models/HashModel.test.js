var request = require('supertest')
var chai = require("chai")
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should

describe('Request hash', () => {
	it('should get a hash string', (done) => {
		HashModel.getRandomHash(4, (hash) => {
			expect(hash).to.be.a('string')
			done()
		})
	}),
	it('should get error if size is < 0', (done) => {
		try {
			var result = HashModel.getRandomHash(-4)
		} catch(err) {
			done()
		}
	}),
	it('should get true if hash exists', (done) => {
		HashModel.checkHash('test', (result) => {
			expect(result).to.be.true
			done()
		})
	}),
	it('should get false if hash not exists', (done) => {
		var result = HashModel.checkHash('aaaaa', (result) => {
			expect(result).to.be.false
			done()
		})
	}),
	it('should save an associative list in Redis', (done) => {
		try {
			HashModel.getRandomHash(4, (hash) => {
				var obj = {
					0: '',
					1: "http://url1.com",
					2: "http://url2.com"
				}
				HashModel.setHash(hash, obj, (result) => {
					expect(result).to.be.true
					done()
				})
			})
		} catch (err) {
			if (err) throw new err
		}
	}),
	it('should not save an associative list in Redis if obj has an incorrect type', (done) => {
		HashModel.getRandomHash(4, (hash) => {
			var obj
			HashModel.setHash(hash, obj, (result) => {
				expect(result).to.be.false
				done()
			})
		})
	}),
	it('should return an url list if hash exists', (done) => {
		try {
			var obj = {
					0: '',
					1: "http://url1.com",
					2: "http://url2.com"
				}

			HashModel.setHash('test', obj, (result) => {
				var result = HashModel.getHashList('test', (result) => {
					expect(result).to.be.an('object')
					done()
				})
			})
		} catch (err) {
			if (err) throw new err
		}
	}),
	it('should return false if hash not exists', (done) => {
		var result = HashModel.getHashList('aaaaa', (result) => {
			expect(result).to.be.false
			done()
		})
	})
})
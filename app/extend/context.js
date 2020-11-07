'use strict'

const TRACER = Symbol('tracer')
const Tracer = require('../../lib/tracer.js')

module.exports = {
	get tracer() {
		if (!this[TRACER]) {
			this[TRACER] = new Tracer(this)
		}
		return this[TRACER]
	},
}

'use strict'

const { v1: uuidv1 } = require('uuid')

class Tracer {
	constructor(ctx) {
		this.ctx = ctx

		const { mode, idHeaders } = this.ctx.app.config.tracer

		if (mode === 'apigw') {
			/** 原始的请求头，可能夹带了用户篡改的信息 */
			const original = this.get(idHeaders)

			/** 对原始请求头做处理之后的请求ID */
			this.traceId = original.split(',')[arr.length - 1].replace(' ', '')
		} else if (mode === 'uuid') {
			this.traceId = uuidv1()
		} else {
			throw new Error('[egg-apigw-tracer] 参数错误，tracer.mode 参数异常')
		}
	}
}

module.exports = Tracer

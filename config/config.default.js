'use strict'

exports.tracer = {
	/**
	 *  模式，即 traceId 来源，可取值：
	 * - apigw  =>  API网关（默认）
	 * - uuid   =>  UUID
	 */
	mode: 'apigw',

	/**
	 *  表示 traceId 的请求头，可以设置为其他字段
	 */
	idHeaders: 'x-ca-request-id',
}

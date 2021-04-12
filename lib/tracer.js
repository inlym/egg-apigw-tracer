'use strict'

const { v4: uuidv4 } = require('uuid')

class Tracer {
  constructor(ctx) {
    this.ctx = ctx

    const { uppercase, mode, idHeader } = this.ctx.app.config.tracer

    if (mode === 'apigw') {
      /** 原始的请求头，可能夹带了用户篡改的信息 */
      const original = this.ctx.get(idHeader)

      /** 对原始请求头做处理之后的请求ID */
      const idList = original.split(',')

      /** trace Id */
      this.traceId = idList[idList.length - 1].replace(/ /g, '')
    } else if (mode === 'uuid') {
      const str = uuidv4()
      this.traceId = uppercase ? str.toUpperCase() : str
    } else {
      throw new Error('[egg-apigw-tracer] 参数错误，tracer.mode 参数异常')
    }
  }
}

module.exports = Tracer

'use strict'

module.exports = (options, app) => {
  return async function tracer(ctx, next) {
    const { mode, idHeader } = options
    if (!ctx.response.get(idHeader) && mode !== 'apigw') {
      ctx.set(idHeader, ctx.traceId)
    }
    await next()
  }
}

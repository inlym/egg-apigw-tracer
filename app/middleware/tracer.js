'use strict'

module.exports = (options, app) => {
  return async function tracer(ctx, next) {
    const { idHeader } = options
    if (!ctx.response.get(idHeader)) {
      ctx.set(idHeader, ctx.traceId)
    }
    await next()
  }
}

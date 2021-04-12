'use strict'

exports.tracer = {
  /**
   *  模式，即 traceId 来源，可取值：
   * - apigw  =>  API网关（默认）
   * - uuid   =>  UUID
   */
  mode: 'apigw',

  /**
   * 使用 'uuid' 模式时，决定显示的 traceId 为大写还是小写
   *
   * 取值：
   * - true   => 大写（默认）
   * - false  => 小写
   */
  uppercase: true,

  /**
   *  表示 traceId 的请求头，可以设置为其他字段
   */
  idHeader: 'X-Ca-Request-Id',
}

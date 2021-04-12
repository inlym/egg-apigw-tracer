# egg-apigw-tracer

[![npm version](https://img.shields.io/npm/v/egg-apigw-tracer)](https://www.npmjs.com/package/egg-apigw-tracer) [![MIT](https://img.shields.io/npm/l/egg-apigw-tracer)](https://github.com/inlym/egg-apigw-tracer/blob/master/LICENSE) [![npm](https://img.shields.io/npm/dw/egg-apigw-tracer)](https://www.npmjs.com/package/egg-apigw-tracer) [![star](https://gitee.com/inlym/egg-apigw-tracer/badge/star.svg?theme=dark)](https://gitee.com/inlym/egg-apigw-tracer/stargazers)

![egg-apigw-tracer-image](https://img.inlym.com/dca8bebe5e534bfa87b52f42e7be282c.png)

适配 API 网关的 HTTP 请求示踪器，用于 Egg.js 框架。

## 目录

- [egg-apigw-tracer](#egg-apigw-tracer)
  - [目录](#目录)
  - [介绍](#介绍)
  - [安装](#安装)
  - [使用](#使用)
    - [启用插件](#启用插件)
    - [配置方式](#配置方式)
    - [使用说明](#使用说明)
  - [示例](#示例)
  - [相关](#相关)
  - [作者](#作者)
  - [参与](#参与)
  - [许可证](#许可证)

## 介绍

在对外提供 Web 服务时，可能在线上环境出现偶发性的错误，为了方便排查问题，给所有的请求都提供一个 **唯一请求 ID** 是一个不错的实践，开发者可以根据这个请求 ID 去相关日志中找寻对应的错误内容。

这个「唯一请求 ID」（Unique Request ID）有的时候也叫「示踪 ID」（trace ID），一个通俗的做法是使用 UUID 生成一个字符串，并在响应中附带该字符串。另外一些 Web 服务，会使用云厂商的 API 网关作为接入层，然后将请求转发到开发者自己的服务器上。此时我们往往希望使用 API 网关自带的请求 ID 作为示踪 ID，本插件就是为了解决这个问题诞生的。

本插件完美适配 **Egg.js** 框架，只需要按照框架要求启用插件，可以**零配置**使用。

## 安装

按照通用的方式使用 npm 下载安装到你的项目下即可，无需全局安装。

安装命令：

```shell
npm i egg-apigw-tracer
```

## 使用

在使用前，请确保你已经阅读 Egg.js 框架关于**插件**的 [文档](https://eggjs.org/zh-cn/basics/plugin.html) 。

下面说明如何配置以及使用插件。

### 启用插件

在 `config/plugin.js` 文件中中声明启用插件：

```js
exports.tracer = {
  /** 是否启用插件，true 为启用，false 为禁用 */
  enable: true,

  /** 指定插件使用的包，为 'egg-apigw-tracer' */
  package: 'egg-apigw-tracer',
}
```

### 配置方式

本插件无需任何配置即可使用。但考虑到以下使用场景：

> 线上生产环境使用 API 网关做接入层，使用 API 网关自带的请求 ID 做示踪 ID，但本地开发环境无该接入层，同时为了保持功能逻辑一致，也需要一个类似的示踪 ID，因此使用 UUID 做示踪 ID。

在 `config/config.${env}.js` 文件配置插件的使用方式（以下为默认配置）：

```js
exports.tracer = {
  mode: 'apigw',
  idHeader: 'x-ca-request-id',
}
```

各配置项的含义是：

|   属性   |  类型  |      默认值       | 是否必填 |                                        说明                                        |
| :------: | :----: | :---------------: | :------: | :--------------------------------------------------------------------------------: |
|   mode   | string |      'apigw'      |    否    | 模式，使用 `apigw` 表示存在 API 网关接入层，使用 `uuid` 表示使用 uuid 生成示踪 ID  |
| idHeader | string | 'x-ca-request-id' |    否    | 仅在使用`apigw` 模式下该设置项有效，表明从指定的请求头中获取`requestId`用作示踪 ID |

### 使用说明

主要有 2 处使用场景，一是你可以直接通过 `ctx.traceId` 获取示踪 ID，二是你使用 `ctx.logger` 打印日志时，框架会自动在日志前附上示踪 ID，前缀格式为：`[$userId/$ip/$traceId/${cost}ms $method $url]` ，详情见 [文档](https://eggjs.org/zh-cn/core/logger.html#如何打印日志) 。

## 示例

我们模拟以下这个使用场景，来演示如何配置和使用本插件：

> 线上生产环境使用 [阿里云](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=lzfqdh6g) API 网关做接入层，本地开发测试未使用特定接入层。

在 `config/plugin.js` 文件中中声明启用插件：

```js
exports.tracer = {
  enable: true,
  package: 'egg-apigw-tracer',
}
```

在 `config.local.js` 文件中配置内容为：

```js
exports.tracer = {
  mode: 'uuid',
}
```

在 `config.prod.js` 文件中配置内容为：

```js
exports.tracer = {
  mode: 'apigw',
}
```

## 相关

以下是作者开发的 Egg.js 框架的插件系列，已用于作者的生产项目中，推荐使用。

- [egg-apigw-tracer](https://github.com/inlym/egg-apigw-tracer) - ⚡ 适配 API 网关的 HTTP 请求示踪器，用于 Egg.js 框架
- [egg-aliyun-tablestore](https://github.com/inlym/egg-aliyun-tablestore) - 🚚 阿里云表格存储（Tablestore）插件，用于 Egg.js 框架
- [egg-load](https://github.com/inlym/egg-load) - 🚀 自动挂载第三方模块至 Egg.js 框架上

## 作者

我是 [inlym](https://www.inlym.com) ，一个产品经理和全栈开发者。

如果你有任何问题或者建议，欢迎联系我，以下是我的联系方式：

- 邮箱：inlym@qq.com
- 主页：[www.inlym.com](https://www.inlym.com)

## 参与

非常欢迎你能够参与这个项目的开发和维护。

你可以通过以下几种方式参与到项目中：

1.  提建议和需求。对于几句话就能说清楚的建议和需求，你可以直接 提一个 [New Issue](https://github.com/inlym/egg-apigw-tracer/issues/new) 。
2.  Fork 项目，修改代码，然后提交 Pull requests 。（提交前请检查务必通过 ESLint 检查）

## 许可证

本插件使用 [MIT](LICENSE) 许可证。

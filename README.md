# babel

1. 安装
```javascript
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

2. 在工程根目录下，创建```babel.config.json``` （或者在 webpack.config.js的 loader options 下添加配置项）
```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.0"
      }
    ]
  ]
}
````
### polyfill 
基础的```@babel/preset-env``` 只会对ES6的语法进行转化，ES6的API和方法不生效，所以就需要```polyfill```。
1. ```@babel/preset-env``` 的 useBuiltIns - 此选项配置 ```@babel/preset-env``` 如何处理 polyfill
    * entry - 根据target浏览器将不支持的ES6+语法全部引入,使用前现在项目入口文件出引入包
    ```javascript
    import 'core-js/stable';
    import 'regenerator-runtime/runtime';
    ```
    * usage - 按需引入需要的包，不会造成体积过大
    * false (default)

  2. @babel/runtime
 > @babel/preset-env 引入polyfill，是通过注入浏览器不支持的 polyfill 在对应的全局对象上增加功能实现，这样无疑是会污染全局环境。
```javascript
  npm install --save @babel/runtime
  npm install --save-dev @babel/plugin-transform-runtime
```

```javascript
// babel.config.js 或 webpack.config.js

  plugins: [
    ['@babel/plugin-transform-runtime']
  ]
  ```

  * @babel/runtime - @babel/runtime 提供了一种不污染全局作用域的 polyfill 的方式，但是需要我们自己在代码中手动引入相关 polyfill 对应的包。转译后会在每个模块中各自实现一遍一些 _extend()， classCallCheck() 之类的辅助工具函数，当我们项目中的模块比较多时每个项目中都实现一次这些方法，这无疑是一种噩梦。
  * @babel/plugin-transform-runtime - 这个插件正式基于 @babel/runtime 可以更加智能化的分析我们的代码，同时 @babel/plugin-transform-runtime 支持一个 helper 参数默认为 true 它会提取 @babel/runtime 编译过程中一些重复的工具函数变成外部模块引入的方式。
  
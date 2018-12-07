# wepy-plugin-wux
> 一个wux-weapp的wepy插件，fork自 https://github.com/jardenliu/wepy-plugin-iview 原作者：jardenliu

## 特性
* 自动注入
* 简易配置
* px转换(rpx, rem, em, px)

## 用法
1. 安装`wux-app`
```bash
  $ npm i wux-weapp -S
```
2. 安装`wepy-plugin-wux`
```bash
  $ npm i wepy-plugin-wux
```
3. 在`wepy.config.js`中`plugins`项中添加 `wux:{}`
```javascript
  plugins: {
    // ...
    wux: {
    }
    // ...
  }
```
4. 运行项目，即可使用wux的全部组件啦~~   如:`<wux-button></wux-button>`

5. `$wuxToast`、`$wuxNotification`的引入
```javascript
    import {$wuxToast, $wuxNotification} from '../wux/index'
```

## 全局注入配置

默认是在`pages`目录下的所有页面的`usingComponents`中，自动注入全部wux的组件。
```javascript
  wux: {
      pagePath: 'pages',
      // 可选，默认为 pages。如果页面目录不为pages，或有多个目录, 通过此值设置。
      // 参考配置：
      // pagePath: 'page2'                         page2为页面有目录
      // pagePath:['page1','page2',...]            多页面目录
         
      config: {
        inject: true,
        // 可选，默认为 true, 注入wux的全部组件。 如果不想全部, 通过此值设置。
        // 参考配置：
        // inject: false                           不注入任何组件 
        // inject:['button','icon',...]            只注入部分组件
                
        prefix: 'wux',
        // 可选，默认为 'wux', 组件名前缀。 如果使用其他组件名前缀, 通过此值设置。
        // 参考配置：
        // prefix: 'a-'                            button的组件名为'a-button'

        px2: false  
        // 可选，默认为false, 开启px单位转换。 可选值 true, false, config object {...}
       // 参考配置：
       // px2: true
       // px2: {}

      //  px2: {
      //       relative: 400,          // 相对值,rpx是 相对于750宽度 ；  rem，em 是相对的 font-size
      //       decimalPlaces: 2,       //  保留的小数位数
      //       targetUnits: 'rpx'      // 目标转换的单位 支持 rpx rem em px
      //   }
      }
    }
```

## 页面注入配置

很多情况下，不希望注入太多的组件。可以通过全局配置的`inject:false`或`inject:['button','icon',...]`来实现。
但是某些特殊的页面又需要一些特殊的组件。可以通过下面的方式设置。

1. 在页面的config中添加 `wux: ['button', 'toast']`,即可快速注入。该配置在当前页面，权重高于全局的inject设置
```javascript
  config = {
    wux: ['button', 'toast']
  }

```

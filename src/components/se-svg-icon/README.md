# SeSvgIcon - svg icon 组件
> 使用了 `auto-import` 插件, 不需要注册组件, 只需要引入组件即可

## props
 - name string ('profile')
 - color string (#333)
 - size string | number (20 | '20px')

## 组件使用
```bash
- @/assets/icons

- icon1.svg # icon-icon1
- icon2.svg # icon-icon2
- dir/icon1.svg # icon-dir-icon1
- dir/dir2/icon1.svg # icon-dir-dir2-icon1

```

```javascript
// 不需要填写注册组件, 因为使用了 `auto-import` 插件
import SeSvgIcon from '@/components/svg-icon/index.vue'

<template>
  <se-svg-icon name="icon1"></se-svg-icon>
  <se-svg-icon name="icon2"></se-svg-icon>
  <se-svg-icon name="dir-icon1"></se-svg-icon>
  <se-svg-icon name="dir-dir2-icon1"></se-svg-icon>
</template>

```

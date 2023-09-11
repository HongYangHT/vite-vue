# SeCopyText - Copy 复制组件

## props
 - text 复制的文案, 如未传, 将取innerText
 - hoverShowCopyIcon 是否hover 显示复制icon

## 组件使用

```javascript
import SeCopyText from '@/components/copy-text/index.vue'

<template>
  <se-copy-text><span>复制内容</span></se-copy-text>
  <se-copy-text text="text 复制"><span>复制内容</span></se-copy-text>
</template>
```

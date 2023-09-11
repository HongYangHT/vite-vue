<script setup lang="ts">
import { isString } from 'lodash-es'

interface SvgIconProps {
  name: string
  color?: string
  size?: string | number
}

defineOptions({
  name: 'SeSvgIcon'
})

const props = withDefaults(defineProps<SvgIconProps>(), {})

const symbolId = computed(() => {
  return `#icon-${props.name}`
})

const styleInstance = computed(() => {
  return {
    fontSize: isString(props.size) ? props.size : `${props.size}px`
  }
})

const classPrefix = 'svg-icon'
</script>

<template>
  <svg :class="classPrefix" :style="styleInstance" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color ? color : 'currentColor'" />
  </svg>
</template>

<style lang="scss">
$prefix: 'svg-icon';
.#{$prefix} {
  display: inline-block;
  width: 1em;
  height: 1em;
  font-style: normal;
  vertical-align: middle;
  outline: none;
  stroke: currentcolor;
}
</style>

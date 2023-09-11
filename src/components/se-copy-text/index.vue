<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { CopyTwoTone } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { h } from 'vue'

defineOptions({
  name: 'SeCopy'
})

interface CopyTextProps {
  text?: string
  hoverShowCopyIcon?: boolean
}

const props = withDefaults(defineProps<CopyTextProps>(), {
  hoverShowCopyIcon: true
})

const el = ref()
const { copy } = useClipboard()

const { t } = useI18n()
const onCopy = () => {
  if (props.text) {
    copy(props.text)
    message.success(t('common.copySuccess'))
    return
  }

  if (el.value) {
    copy(el.value?.innerText)
    message.success(t('common.copySuccess'))
    return
  }

  return ''
}

const classPrefix = 'copy-text'
</script>

<template>
  <span ref="el" :class="classPrefix">
    <span :class="classPrefix + '__text'" class="truncate">
      <slot></slot>
    </span>
    <a-button
      type="link"
      :class="[
        classPrefix + '__icon',
        {
          [classPrefix + '__icon__hoverable']: hoverShowCopyIcon
        }
      ]"
      :icon="h(CopyTwoTone)"
      @click="onCopy"
    ></a-button>
  </span>
</template>

<style lang="scss">
$prefix: 'copy-text';
.#{$prefix} {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  &__text {
    flex: 1;
  }

  &__icon.ant-btn {
    width: auto;
    height: auto;
    padding: 0 4px;
    font-size: 1em;
    cursor: pointer;
    border: 0;
  }

  &__icon__hoverable {
    display: none;
    vertical-align: middle;
  }

  &:hover &__icon__hoverable {
    display: inline-block;
  }
}
</style>

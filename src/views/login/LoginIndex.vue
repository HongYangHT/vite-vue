<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import i18n, { setI18nLanguage } from '@/i18n'
import SeSvgIcon from '@/components/se-svg-icon/index.vue'
import SeCopyText from '@/components/se-copy-text/index.vue'

defineOptions({
  name: 'LoginIndex'
})
const prefix = 'login'

const { t } = useI18n()

const onSetLocal = (lang: string) => {
  setI18nLanguage(i18n, lang)
}
</script>

<template>
  <div :class="prefix" class="flex items-center container mx-auto px-4">
    <div :class="prefix + '__aside'" class="margin-top-20 btn-custom btn-size-large">
      <a-button type="primary" @click="onSetLocal('en-US')">登陆</a-button>
      <a-button type="primary">{{ t('common.more') }}</a-button>
      <a-date-picker />
      <se-svg-icon name="debugger" :size="30" />
      <se-copy-text><span>复制内容</span></se-copy-text>
    </div>
    <div :class="prefix + '__aside'">右边222</div>
  </div>
</template>

<style lang="scss" scoped>
@import url('@/scss/index.scss');
// 可单独使用scss 语法
$prefix: 'login';
.#{$prefix} {
  position: relative;

  &__aside {
    margin-top: 20px;
  }
}
// 可使用 tailwind 语法
.margin-top-20 {
  @apply mx-[20px];
}
</style>

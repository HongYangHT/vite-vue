<script setup lang="ts">
import SeSvgIcon from '@/components/se-svg-icon/index.vue'
import SeCopyText from '@/components/se-copy-text/index.vue'
import { useI18n } from 'vue-i18n'
import i18n, { setI18nLanguage } from '@/i18n'
import { localStore } from '@/common/utils/local-store'
import { LOCAL_LANGUAGE } from '@/common/constants'

defineOptions({
  name: 'DemoIndex'
})

const prefix = 'demo'

const { t } = useI18n()

const onSetLocal = () => {
  const INITIAL_LOCAL_LANGUAGE = import.meta.env.VITE_INITIAL_LOCAL_LANGUAGE
  const lang = localStore.get(LOCAL_LANGUAGE) || INITIAL_LOCAL_LANGUAGE
  setI18nLanguage(i18n, lang === 'zh-CN' ? 'en-US' : 'zh-CN')
}
</script>

<template>
  <div :class="prefix" class="flex items-center container mx-auto p-4">
    <a-space>
      <template #split>
        <a-divider type="vertical" />
      </template>
      <a-button type="primary" @click="onSetLocal">{{ t('common.changeLanguage') }}</a-button>
      <se-svg-icon name="debugger" :size="30" />
      <se-copy-text><span>复制内容</span></se-copy-text>
    </a-space>
  </div>
</template>

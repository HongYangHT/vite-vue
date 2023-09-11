<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useEventBus } from './hooks/use-bus'
import { SET_LANGUAGE_TYPE } from './common/event-types'
import { localStore } from './common/utils/local-store'
import { LOCAL_LANGUAGE } from './common/constants'
import UpdateDialog from '@/views/update-pwa/index.vue'

const { eventBus } = useEventBus()
const prevLanguage = localStore.get(LOCAL_LANGUAGE)
const locale = ref<string>(prevLanguage === 'zh-CN' ? zhCN.locale : enUS.locale)

defineOptions({
  name: 'App'
})

onMounted(() => {
  eventBus.on(SET_LANGUAGE_TYPE, lang => {
    if (lang === 'zh-CN') {
      locale.value = zhCN.locale
    } else {
      locale.value = enUS.locale
    }
  })
})
</script>

<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <router-view v-slot="{ Component, route }">
      <transition
        :name="route?.meta?.transition?.name ? route?.meta?.transition?.name : 'fade-transform'"
        :enter-active-class="
          route?.meta?.transition?.enterTransition ? route?.meta?.transition?.enterTransition : ''
        "
        :leave-active-class="
          route?.meta?.transition?.leaveTransition ? route?.meta?.transition?.leaveTransition : ''
        "
        mode="out-in"
        appear
      >
        <keep-alive :max="12">
          <component :is="Component" :key="route.fullPath"></component>
        </keep-alive>
      </transition>
    </router-view>
    <update-dialog></update-dialog>
  </a-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

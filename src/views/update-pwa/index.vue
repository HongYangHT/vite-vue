<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'UpDateDialog'
})

const intervalMS = 2 * 60 * 60 * 1000
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update()
      }, intervalMS)
  }
})

const close = () => {
  offlineReady.value = false
  needRefresh.value = false
}

const onConfirm = () => {
  updateServiceWorker()
}

const { t } = useI18n()
</script>
<template>
  <a-modal
    v-model:open="needRefresh"
    :title="t('common.newVersion')"
    :ok-text="t('common.reloadBtnText')"
    :cancel-text="t('common.closeBtnText')"
    :closable="false"
    @cancel="close"
    @ok="onConfirm"
  >
    <p>{{ t('common.newVersionContent') }}</p>
  </a-modal>
</template>

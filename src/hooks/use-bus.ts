import { EventBus } from '@/common/utils/bus'

export const useEventBus = () => {
  return {
    eventBus: EventBus.createSingle()
  }
}

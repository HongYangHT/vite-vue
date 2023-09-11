type EventHandle = (type: string | Record<string, unknown>) => void

type ObjectKey = symbol | string | number

export class EventBus {
  private readonly events: Map<ObjectKey, EventHandle[]>
  static single: EventBus

  constructor() {
    this.events = new Map()
  }

  // 单例模式
  static createSingle() {
    if (!EventBus.single) {
      EventBus.single = new EventBus()
    }
    return EventBus.single
  }

  // 注册事件
  on(eventName: ObjectKey, fn: EventHandle) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [fn])
    }
    const fns = this.events.get(eventName) ?? []

    fns?.push(fn)
    this.events.set(eventName, fns)
  }

  emit(eventName: ObjectKey, args: string | Record<string, unknown>) {
    if (this.events.has(eventName)) {
      const fns = this.events.get(eventName) ?? []
      fns.forEach(fn => {
        fn && fn(args)
      })
    }
  }

  off(eventName: ObjectKey) {
    if (!this.events.has(eventName)) return

    this.events.delete(eventName)
  }
}

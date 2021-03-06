// 维护一个全局的eventBus
type Listener = (params: any) => void;
interface Subscribes {
  [type: string]: Listener[];
}

export class EventBus {
  subscribes: Subscribes = {};

  addEventListener = (type: string, listener: (params: any) => void) => {
    if (this.subscribes[type] && this.subscribes[type].includes(listener)) {
      return;
    }
    this.subscribes[type] = [...(this.subscribes[type] || []), listener];
  };

  removeEventListener = (type: string, listener: (params: any) => void) => {
    this.subscribes[type] = this.subscribes[type].filter(
      (it) => it !== listener
    );
  };

  removeAll = (type?: string) => {
    if (type) {
      delete this.subscribes[type];
    } else {
      this.subscribes = {};
    }
  };

  dispatchEvent = (type: string, params: any) => {
    (this.subscribes[type] || []).forEach((listener) => listener(params));
  };
}

const getEventBus = (function () {
  const eventBuses: { [ns: string]: EventBus } = {};
  return function (ns: string) {
    eventBuses[ns] = eventBuses[ns] || new EventBus();
    return eventBuses[ns];
  };
})();

export function useEventBus(ns: string = "global") {
  const eventBus = getEventBus(ns);
  return {
    addEventListener: eventBus.addEventListener,
    removeEventListener: eventBus.removeEventListener,
    removeAll: eventBus.removeAll,
    dispatchEvent: eventBus.dispatchEvent,
  };
}

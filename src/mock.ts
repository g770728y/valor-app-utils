export function mockLocation(url: string) {
  // @ts-ignore
  (global as any).window = Object.create(window);
  Object.defineProperty(window, "location", {
    value: {
      href: url,
    },
  });
}

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

export function mockResizeObserver() {
  window.ResizeObserver = MockResizeObserver;
}

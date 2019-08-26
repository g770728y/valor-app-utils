// 等待, 直到 f() === true
export function waitUntil(f: () => boolean): Promise<any> {
  let timeHandler: any;
  return new Promise((resolve, reject) => {
    timeHandler = setInterval(() => {
      if (f()) {
        clearInterval(timeHandler);
        resolve();
      }
    }, 100);
  });
}

export function getImageDimension_slow(
  src: string
): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve({ w: img.width, h: img.height });
    };
  });
}

// 使用定时循环检测, 愉快速获取图片宽高 : https://www.jianshu.com/p/41ff1d103d3f

// 记录当前时间戳
// 创建对象
export function getImageDimension(
  src: string
): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    const i = setInterval(check, 40);

    function check() {
      if (img.width > 0 || img.height > 0) {
        clearInterval(i);
        resolve({ w: img.width, h: img.height });
      }
    }

    img.src = src;
  });
}

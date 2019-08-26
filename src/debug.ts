// promise...then(tap())...
// promise...then(tap('tap'))
export const tap = (title: string = 'tap') => {
  return <T>(x: T): T => {
    console.log(title + ':', x);
    return x;
  };
};

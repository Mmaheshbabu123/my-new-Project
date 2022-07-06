export default function  debounceFun (func,timeout=700) {
  let timer;
  console.log('jdjdjdj')
  return function (...args) {
    const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
  };
};


var filterTimeout;
export default function  debounceFun (func,timeout=1000) {
  if(filterTimeout) clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    func()
  }, timeout)

};


export const helpers = {
   toggleWarningClass
  ,
}


function toggleWarningClass(inputRef, refkey, add = 1) {
  add ? inputRef.current[refkey].classList.add("v-warning")
      : inputRef.current[refkey].classList.remove("v-warning")
  return 1;
}

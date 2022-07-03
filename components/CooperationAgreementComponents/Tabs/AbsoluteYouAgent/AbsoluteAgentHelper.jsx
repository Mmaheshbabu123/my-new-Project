export const helpers = {
  returnNotAddedPcOptions
}

function returnNotAddedPcOptions(pcArray, stateObj) {
  if(!stateObj) return pcArray;
  let selectedIds = Object.values(stateObj['selectedPc']);
  return pcArray.filter(val => !selectedIds.includes(val.value))
}

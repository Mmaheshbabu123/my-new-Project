export const helpers = {
  getDifference,
}

function getDifference(array1, array2, key1, key2, alreayLinkedPcIds = [],type = 1) {
  let dataArray = array1.filter(object1 => {
    return !array2.some(object2 => {
      return object1[key1] === object2[key2];
    });
  });
  if(type === 2)
    return dataArray;
  return dataArray.filter(val => alreayLinkedPcIds.includes(val.value));
}

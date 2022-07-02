export const helpers = {
  getDifference,
}

function getDifference(array1, array2, key1, key2) {
  return array1.filter(object1 => {
    return !array2.some(object2 => {
      return object1[key1] === object2[key2];
    });
  });
}

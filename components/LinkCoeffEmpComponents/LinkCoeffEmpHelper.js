export const helpers = {
    toggleWarningClass
  , checkCoefficientsFilledOrNot
  , scrollContent
  , takeSelectedIds
}

function toggleWarningClass(inputRef, refkey, add = 1) {
  add ? inputRef.current[refkey].classList.add("v-warning")
      : inputRef.current[refkey].classList.remove("v-warning")
  return 1;
}


let lowKey = 1;
let defaultKey = 2;
let highKey = 3;

function checkCoefficientsFilledOrNot(coeffData, empData, filledObj) {
  let status = true;
  if(checkLength(filledObj, empData)) {
    status = false;
  } else {
    status = checkEachCoefficient(coeffData, empData, filledObj);
  }
  return status;
}

function checkEachCoefficient(coeffData, empData, filledObj) {
  let status = true;
  empData.forEach((emp) => {
    if(!status) return;
    let key = emp.id;
    if(checkLength(filledObj[key], coeffData)) {
      status = false;
    } else {
      status = checkEachCoefficientValue(filledObj[key])
    }
  });
  return status;
}

function checkEachCoefficientValue(filledCoeffObj) {
  let status = true;
  Object.values(filledCoeffObj).forEach((item) => {
    if(item[defaultKey] === undefined || item[defaultKey] === '') {
      if(item[lowKey] === '' || item[highKey] === '' || item[lowKey] === undefined || item[highKey] === undefined) {
        status = false;
      }
    }
  });
  return status;
}


function checkLength(obj, data) {
  return Object.keys(obj).length !== data.length;
}


function scrollContent(forward = 1) {
  let divElement = document.getElementById('linkempCoeffDivId');
  forward ? divElement.scrollLeft += 100 : divElement.scrollLeft -= 100;
  let setObj = {};
  let scrollLeftMax = divElement.scrollWidth - divElement.clientWidth;
  let scrollLeft = divElement.scrollLeft;
  setObj['tableWidth'] = '97%';
  if(scrollLeft >= scrollLeftMax) {
    setObj['scrollRight'] = false;
    setObj['scrollLeft'] = true;
  }
  if(scrollLeft === 0) {
    setObj['scrollRight'] = true;
    setObj['scrollLeft'] = false;
  }
  if(scrollLeft > 0 && scrollLeft < scrollLeftMax) {
    setObj['scrollRight'] = true;
    setObj['scrollLeft'] = true
  }
  if(setObj['scrollLeft'] === false && setObj['scrollRight'] === false)
      setObj['tableWidth'] = '100%';
  if(setObj['scrollLeft'] === true && setObj['scrollRight'] === false)
      setObj['tableWidth'] = '97%';
  if(setObj['scrollLeft'] === true && setObj['scrollRight'] === true)
      setObj['tableWidth'] = '95%';
  return setObj;
}


function takeSelectedIds(alreadyLinked, stateObj) {
  if(!stateObj) return alreadyLinked;
  return [...alreadyLinked, ...Object.values(stateObj['selectedPc'])]
}

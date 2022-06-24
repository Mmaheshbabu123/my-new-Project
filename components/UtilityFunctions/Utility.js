export const UTILITYFN = {
    setCurrentPageData,
    resetUserSessionDataforMoveOut,
    setCurrentPageInSession,
    checkPageCompleted,
    getPageTickStatus,
    getVisitedPageStatus
};
async function setCurrentPageData(props, page){
    await props.setPageDirection(page);
  }

function resetUserSessionDataforMoveOut(){
    const states = ['contractOwnerState', 'contractDateState', 'contractMeterState', 'contractConfirmationState'];
    if (typeof window !== 'undefined') {
        // do your stuff with sessionStorage
        states.map((state, key) => {
            sessionStorage.setItem(state, '');
        })
    }
}

function setCurrentPageInSession(page){
    sessionStorage.setItem('moveOutCurrentPage', page)
}

function checkPageCompleted(stateObject){
    return (stateObject &&  Object.keys(stateObject).length === 0 && Object.getPrototypeOf(stateObject) === Object.prototype)
}

function getPageTickStatus(props){
    let pageStatus =  ( 
        (props.pageNumber === 1 && props.pageOne.validationStatus) ||
        (props.pageNumber === 2 && props.pageTwo.validationStatus) ||
        (props.pageNumber === 3 && props.pageThree.validationStatus) ||
        (props.pageNumber === 4 && props.pageFour.validationStatus) ||
        (props.pageNumber === 5 && props.pageFour.validationStatus)
    ) ? true : false;
    return pageStatus;
}

function getVisitedPageStatus(props){
    switch(props.pageNumber){
      case 1: 
        return props.pageOne.visited;
      case 2:
        return props.pageTwo.visited;
      case 3:
        return props.pageThree.visited;
      case 4:
        return props.pageFour.visited;
      case 5:
        return props.pageFive.visited;
    }
  }
import { UPDATE_STATE } from './Actions';

const LinkCoeffEmpReducer = (state, action) => {
  switch(action.type) { //In future we might more cases so we are using switch NOSONAR
    case UPDATE_STATE:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export default LinkCoeffEmpReducer;

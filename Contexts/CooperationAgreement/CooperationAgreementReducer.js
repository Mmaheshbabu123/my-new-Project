import { UPDATE_STATE } from './Actions';

const CooperationAgreementReducer = (state, action) => {
  console.log(state, action.payload);
  console.log('updated =>', { ...state, ...action.payload });
  switch(action.type) { //In future we might more cases so we are using switch NOSONAR
    case UPDATE_STATE:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export default CooperationAgreementReducer;

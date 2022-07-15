import React, { useReducer } from 'react';
import CooperationAgreementContext from './CooperationAgreementContext';
import CooperationAgreementReducer from './CooperationAgreementReducer';
import { UPDATE_STATE } from './Actions';

const takeElementStatus = (type = 1) => type === 1 ?
    {
      tab_1: [],
      tab_2: [],
      tab_3: [],
      tab_4: [],
      tab_5: [],
      tab_6: []
    }
  : {
      worksServantsData:0,
      cooperationCoeffData:0,
      cooperationSalaryDetails: 0,
      cooperationSalaryLinked: 0,
      cooperationBenefits: 0
  };

const CooperationAgreementStates = (props) => {
  const initialState = {
      tab_1 : { worksServantsData: {1: [], 2: []}, cooperationCoeffData: {} }
    , tab_2 : {'22':1,'23':1,'24':1,validations:{'17':{'type':1,validate:false,'text':'Only numbers will accept' },'19':{'type':2,validate:false},'14':{'type':3,validate:false,'text':'Only numbers will accept'},'18':{'type':1,validate:false,'text':'Only numbers will accept'}}}
    , tab_3 : {1:{'25':1,'30':1,'31':2,'32':2,'38':2,'39':2,validations:{'34':{'type':1,validate:false},'35':{'type':2,validate:false}}},2:{'25':1,'30':1,'31':2,'32':2,'38':2,'39':2,validations:{'34':{'type':1,validate:false},'35':{'type':2,validate:false}}},loaded:true,selected_person_id:1}
    , tab_4 : {'43':1,'44':2,'48':1,'49':1,validations:{'40':{'type':2,validate:false},'41':{'type':2,validate:false},'42':{'type':2,validate:false},'45':{'type':2,validate:false},'46':{'type':2,validate:false},'47':{'type':2,validate:false}}}
    , tab_5 : {
      cooperationSalaryDetails: [],
      cooperationSalaryLinked: {},
      cooperationBenefits: {},
    }
    , tab_6:  {'56':1,'57':2,'58':1,'61':2,'60':'Correction on one document','62':2,'63':2,'64':2,'65':2,'72':'21%','73':2,'74':1,'76':2,'77':2,'78':2,'79':2,
       validations:{'54':{'type':1,validate:false},'55':{'type':2,validate:false} ,'52':{'type':3,validate:false},}
     }
    , selectedTabId: 1
    , loadedTabs: []
    , renderTabComponents: false
    , alreadyLinked: []
    , salaryBenefitPcArray: []
    , salaryDataPerPc: {}
    , filledTabs: [1]
    , root_parent_id: 0
    , tab_2_action : 1
    , tab_4_action : 1
    , tab_6_action : 1
    , element_status: takeElementStatus()
    , dependecyDataStatus: takeElementStatus(2)
  };
  const [state, dispatch] = useReducer(CooperationAgreementReducer, initialState);
  const updateStateChanges = (obj) => {
    dispatch({ type: UPDATE_STATE, payload: obj })
  }

  return (
    <CooperationAgreementContext.Provider value={{
      state,
      updateStateChanges,
    }}> {props.children}
    </CooperationAgreementContext.Provider>
  )
}

export default CooperationAgreementStates;

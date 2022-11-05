import React, { useReducer } from 'react';
import CooperationAgreementContext from './CooperationAgreementContext';
import CooperationAgreementReducer from './CooperationAgreementReducer';
import { UPDATE_STATE } from './Actions';
import { requiredFields } from '@/components/CooperationAgreementComponents/RequiredFields';
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
  const requiredElements  = structuredClone(requiredFields);
  const initialState = {
      tab_1 : { worksServantsData: {1: [], 2: []}, cooperationCoeffData: {}, validations:{} }
      //'17':{'type':1,validate:false,'text':'Only numbers will accept' },
    , tab_2 : {'22':1,'10':'1','24':1,required:requiredElements['tab_2'],validations:{'19':{'type':2,validate:false},'14':{'type':3,validate:false,'text':'Only numbers will accept'},'18':{'type':1,validate:false,'text':'Only numbers will accept'},'20':{'type':4,validate:false,'text':'Only numbers will accept'},'8':{'type':5,validate:false,'text':'Only numbers will accept'}}}
    , tab_3 : {
     alredyLinkedPersons:[],
      contactSelectedDetails:[],
      contactPersonsDetails:{},
    }
    , tab_4 : {'43':1,'48':1,'49':1,'44':2,required:requiredElements['tab_4'],validations:{'40':{'type':2,validate:false},'41':{'type':2,validate:false},'42':{'type':2,validate:false},'45':{'type':2,validate:false},'46':{'type':2,validate:false},'47':{'type':2,validate:false}}}
    , tab_5 : {
      cooperationSalaryDetails: [],
      cooperationSalaryLinked: {},
      cooperationBenefits: {},
    }
    , tab_6:  {'56':1,'57':2,'58':1,'61':2,'60':'Correction on one document','62':2,'63':2,'64':2,'65':2,'72':'21%','73':2,'74':1,'76':2,'77':2,'78':2,'79':2,required:requiredElements['tab_6'],
       validations:{'55':{'type':2,validate:false} ,'52':{'type':3,validate:false},'72':{'type':6,validate:false},}
     }
    , selectedTabId: 1
    , loadedTabs: []
    , renderTabComponents: false
    , alreadyLinked: []
    , alredyLinkedPersons:[]
    , salaryBenefitPcArray: []
    , salaryDataPerPc: {}
    , filledTabs: [1]
    , root_parent_id: 0
    , salesAgentRefId: 0
    , bbright_id: 0
    , tab_2_action : 1
    , tab_4_action : 1
    , tab_6_action : 1
    , element_status: takeElementStatus()
    , dependecyDataStatus: takeElementStatus(2)
    , defaultOptions : {}
    , renderedOptions:0
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

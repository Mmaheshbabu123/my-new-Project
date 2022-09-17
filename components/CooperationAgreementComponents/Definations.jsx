//------- CONSTANTS ----------------------//
export const ABSOLUTEYOU_AGENT_TAB   = 1;
export const COMPANY_INFORMATION_TAB = 2;
export const CONTACT_PERSONS_TAB     = 3;
export const ONLINE_DETAILS_TAB      = 4;
export const SALARY_BENEFITS_TAB     = 5;
export const INVOIING_TAB            = 6;


export const COOPERATION_TABS_JSON = [
  {id: ABSOLUTEYOU_AGENT_TAB, name: 'AbsoluteYou agent', status: 1 },
  {id: COMPANY_INFORMATION_TAB, name: 'Company information', status: 1 },
  {id: CONTACT_PERSONS_TAB, name: 'Contact persons', status: 1 },
  {id: ONLINE_DETAILS_TAB, name: 'Online details', status: 1 },
  {id: SALARY_BENEFITS_TAB, name: 'Salary benefits', status: 1 },
  {id: INVOIING_TAB, name: 'Invoicing', status: 1 }
];


export const consultantArray = [
  {value: 1, label: 'Consultant-1'},
  {value: 2, label: 'Consultant-2'},
  {value: 3, label: 'Consultant-3'},
];
export const consultantNumArray = {
  1: [{value: 1, label: '9638527410'}],
  2: [{value: 2, label: '9517534563'}],
  3: [{value: 3, label: '7412589632'}],
};

export const codeArray = [
  {value: 1, label: 'Code 1'},
  {value: 2, label: 'Code 2'},
  {value: 3, label: 'Code 3'},
  {value: 4, label: 'Code 4'}
];
//-------

export const soortOptions = [
  {value: 0, label: 'Select'},
  {value: 1, label: 'Hours'},
  {value: 2, label: 'Day'},
  {value: 3, label: 'Week'},
];

export const whoWillSignOptions = [
  {
    id: 1, label: 'Employer'
  },{
    id: 2, label: 'Co-employer'
  },{
    id: 3, label: 'Location manager'
  }
];

export const languageOptions = [
  {
    id: 'nl', label: 'Dutch'
  },{
    id: 'fr', label: 'French'
  }
];
//-----


export const premiesAutoArray = [   // --------- COOPERATION AGREEMENT 5TH TAB CONSTANTS----------//
  {
    type: 1,
     name: 'Premies en vergoeding (Benefits)',
     rows: [{key: 'code', label: 'Code'}, {key: 'bedrag', label: 'Bedrag'}, {key: 'percentage', label: 'Percentage'}]},
  {
    type: 2,
    name: 'Automatisch looncodes (automatic salarycodes)',
    rows: [{key: 'code', label: 'Code'}, {key: 'soort_automatisering', label:'Soort automatisering'}]}
];

import React, { useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import SalaryDetails from './SalaryDetails'
import MultiSelectField from '@/atoms/MultiSelectField';
import styles from '../SalaryBenefits.module.css';
import { confirmAlert } from 'react-confirm-alert';
import { helpers } from '../SalaryBenefitHelper';
import Translation from '@/Translation';
const TAB_ID = 5;
const stateKey = 'tab_5';
const SalaryDetailsPerPC = (props) => {
  const { t } = props;
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  var { tab_5: {  cooperationSalaryDetails }, salaryBenefitPcArray, dependecyDataStatus, salaryDataPerPc, filledTabs, selectedTabId } = state;

  const onSelect = (e) => {
    let salaryDetailsObj = [...cooperationSalaryDetails];
    let tab_5 = {...state[stateKey]};
    let newObj = {
      pc_id: e.value,
      pc_name: e.label,
      tab_id: TAB_ID,
    }
    salaryDetailsObj.push(newObj);
    tab_5['cooperationSalaryDetails'] = salaryDetailsObj;
    tab_5['cooperationSalaryLinked'][newObj.pc_id] = insertDataObjects(newObj.pc_id);
    tab_5['cooperationBenefits'][newObj.pc_id] = insertDataObjects(newObj.pc_id, 2);
    dependecyDataStatus['cooperationSalaryDetails'] = true;
    updateStateChanges({tab_5, dependecyDataStatus})
  }
  const onDelete = (pcId, index) => {
    confirmAlert({
      message: 'Do you want to delete paritair comité?',
      buttons: [
        { label: 'No' },
        { label: 'Yes', onClick: () => deleteAndUpdateState(pcId, index) }
      ]
    });

  }

  const deleteAndUpdateState = (pcId, index) => {
    let salaryDetailsObj = [...cooperationSalaryDetails];
    let tab_5 = {...state[stateKey]};
    delete tab_5['cooperationSalaryLinked'][pcId];
    delete tab_5['cooperationBenefits'][pcId];
    salaryDetailsObj.splice(index, 1);
    tab_5['cooperationSalaryDetails'] = salaryDetailsObj;
    dependecyDataStatus['cooperationSalaryDetails'] = true;
    updateStateChanges({tab_5, dependecyDataStatus});
  }

  const insertDataObjects = (pcId, objKey = 1) => {
    let arrayOfObjects = objKey === 1 ? salaryDataPerPc[pcId] || [] : [1, 2];
    let dataObject = {};
    arrayOfObjects.map(obj => {
      if(objKey === 1)
        dataObject[obj.salary_id] = { checked: obj.mandotory || 0, value: obj.salary_value, granted: obj.granted }
      else
        dataObject[obj] = { checked: 1, code: '', bedrag: '', percentage: '', soort_automatisering: ''}
    return 1;
    })
    return dataObject;
  }

  return (
    <div className='salary_benefits_co_operation_agreement'>
      <div className='row'>
        <div className='col-md-12'>
        <div className={`${styles['salary-benefits-tab-parent']}`} disabled={!filledTabs.includes(selectedTabId)}>
      <div>
        {cooperationSalaryDetails.length > 0 ? <SalaryDetails onDelete={onDelete}/> : null}
      </div>
      <div className='row' >
        <div className='col-md-11 m-auto px-2 salary_benefits_paritair_committe'>
        <MultiSelectField
            options={helpers.getDifference(salaryBenefitPcArray, cooperationSalaryDetails, 'value', 'pc_id', state.alreadyLinked)}
            handleChange={onSelect}
            isMulti={false}
            standards={[]}
            key = {123}
            className={`${styles['salary-benefits-multiselect']}`}
            classNamePrefix={`${styles['salary-benefits-multiselect']}`}
            placeholder={t('Select paritair comite')}
        />
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo( Translation(SalaryDetailsPerPC,['Select paritair comite']));

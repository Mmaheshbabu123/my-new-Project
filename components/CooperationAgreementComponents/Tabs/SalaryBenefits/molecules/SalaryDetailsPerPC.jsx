import React, { useContext } from 'react';
import CooperationAgreementContext from '@/Contexts/CooperationAgreement/CooperationAgreementContext';
import SalaryDetails from './SalaryDetails'
import MultiSelectField from '@/atoms/MultiSelectField';
import styles from '../SalaryBenefits.module.css';
import { helpers } from '../SalaryBenefitHelper';

const TAB_ID = 5;
const stateKey = 'tab_5';
const SalaryDetailsPerPC = () => {
  const { state, updateStateChanges } = useContext(CooperationAgreementContext);
  var { tab_5: {  cooperationSalaryDetails }, salaryBenefitPcArray } = state;

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
    tab_5['cooperationSalaryLinked'][newObj.pc_id] = {};
    tab_5['cooperationBenefits'][newObj.pc_id] = {};
    updateStateChanges({tab_5})
  }

  return (
    <div className={`${styles['salary-benefits-tab-parent']}`}>
      <div>
        {cooperationSalaryDetails.length > 0 ? <SalaryDetails /> : null}
      </div>
      <div >
        <MultiSelectField
            options={helpers.getDifference(salaryBenefitPcArray, cooperationSalaryDetails, 'value', 'pc_id')}
            handleChange={onSelect}
            isMulti={false}
            standards={[]}
            className={`${styles['salary-benefits-multiselect']}`}
            classNamePrefix={`${styles['salary-benefits-multiselect']}`}
            placeholder={'Select paritair comite'}
        />
      </div>
    </div>
  );
}

export default React.memo(SalaryDetailsPerPC);

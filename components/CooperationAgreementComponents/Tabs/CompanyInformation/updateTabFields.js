export default function updateTabFields(tab_4,tab_2,tab_6,element_status) {
  console.log(element_status)
  let defaultKeys = ['40','41','42','45','46','47'];
  defaultKeys.forEach((item)=>{
    tab_4[item] = tab_2['19'] ;
    element_status['tab_4'].push(item);
  })
  tab_6['59']  = tab_2['19'] ;
  tab_6['55']  = tab_2['19'] ;
  element_status['tab_6'].push('59');
  element_status['tab_6'].push('55');
}

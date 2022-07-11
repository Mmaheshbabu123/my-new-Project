import React,{useContext} from 'react';
import ContactPersonTabs from '../molecules/ContactPersonTabs';
const ContactPersons = (props) => {
  return (
    <div className = ''>
     <ContactPersonTabs />
    </div>
  )
}
export default React.memo(ContactPersons);

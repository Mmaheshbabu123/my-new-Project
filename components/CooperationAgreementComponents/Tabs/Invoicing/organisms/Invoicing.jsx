import React,{useContext} from 'react';
import InvoiceDetails from '../molecules/InvoiceDetails';

const Invoicing = (props) => {
  return (
    <div className =''>
     <InvoiceDetails />
    </div>
  )
}

export default React.memo(Invoicing);

import React, { useEffect } from 'react';
import Router from 'next/router';
import { Uniquekey } from '../Services/GenetateUniqueKey';



const AddPc = () => {
    const unique_key = Uniquekey.generate_unique_key();
    const { pathname } = Router;
    // const history = useHistory();
    // const { pathname } = Router;
    // if (pathname == '/add-pc') {
    //     Router.push('/manage-pc');
    // }
	useEffect(() => {
	//	const { pathname } = Router;
		if (pathname == '/add-pc') {
			Router.push('/addpc/'+unique_key);
		}
	},[]);
       return(
	<div></div>
       );
};

export default AddPc;

import React, {useEffect, useState} from "react";
import { APICALL } from "../../Services/ApiServices";
import Select from 'react-select'


const AddEmployee = () => {
    //var companyid
    const[Data,setData] = useState();

    useEffect(() => {
                APICALL.service("http://absoluteyou.com/getemployeebycompany?_format=json", 'GET').then((result) => 
                {
                 setData(result);
				})
				.catch((error) => {
					console.error(error);
				});
                },[]);
    console.log(Data);
    return (
        <div className="container">
           <h1>Select Employee</h1>
           
        </div>
    );
};

export default AddEmployee;
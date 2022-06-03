import React, { useState,useContext } from 'react';
import ValidationService from '../../Services/ValidationService';
import { addPc } from '../../Services/ApiEndPoints';
import { APICALL } from '../../Services/ApiServices';
// import { AppContext } from "./context";
import {PcContext} from '../../Contexts/PcContext'
// import { useEffect } from "react";
// import {useNavigate} from 'react-router-dom';

// /**
//  *
//  * @param {*} props
//  * @returns the added category data to the common.js component.
//  */
function AddPc(props) {
  const {test, setTest} = useContext(PcContext);
	//   var url = process.env.REACT_APP_BACKEND_URL;
	//   const navigate = useNavigate();

	//   // const myContext = useContext(AppContext);

	//   const [cat, setcat] = useState(false);
	const [ number, setnmber ] = useState('');
	const [ name, setname ] = useState('');

	const [ field, setfield ] = useState();
	const [ field1, setfield1 ] = useState();
	const [ data, setdata ] = useState();
	//   const [duperror,setduperror]=useState('');
	// const dt=[];

	//     // const myContext = useContext(AppContext);
	//     var data1=[];

	//     /**
	//  * it will post the committee data to the backend by using api's
	//  * @param {*} e
	//  */

	let postdata= async (e)=>{
    APICALL.service(addPc, 'POST', data)
					.then((result) => {
            console.log(result)
            if(result.status === 200){
                  var pid=result.pcid;
                  // navigate("/pc/"+pid);
                }else if(result.status==205){
                      setfield1('Paritair comite number already exists.');
                }else{
                  console.log(result);
                  }
					})
					.catch((error) => {
						console.error(error);
					});
        }

	let submit = async (event) => {
		event.preventDefault();

		var emptyValue = await ValidationService.emptyValidationMethod(name);
		var emptyValue1 = await ValidationService.emptyValidationMethod(number);
		var validName = await ValidationService.nameValidationMethod(name);
		var validSalary = await ValidationService.pcnumberValidationMethod(number);

		if (emptyValue != '0') {
			setfield(emptyValue);
		} else {
			await setfield(validName);
		}

		if (emptyValue1 != '0') {
			setfield1(emptyValue1);
		} else {
			await setfield1(validSalary);
		}

		if (validSalary == true && validName == true) {
			postdata();
		}
	};

	return (
		<div className="container">
          {/* <PcContext.Consumer> */}
            {/* {test =>( */}
			<form onSubmit={(e) => submit(e)}>
				<div className="row pt-5">
					<div className="col-md-6">
						<div className="form-group mt-3 mb-4">
							<label className="">Paritair comite number---{test}</label>
							<input
								type="text"
								value={number}
								className=" form-control mt-2"
								onChange={(e) => {
									setnmber(e.target.value);
								}}
							/>
							<p className="error mt-2">{field1}</p>
						</div>
						<div className="form-group mt-3 mb-4">
							<label>Paritair comite name</label>
							<input
								type="text"
								value={name}
								className="form-control mt-2"
								onChange={(e) => {
									setname(e.target.value);
								}}
							/>
							<p className="error mt-2">{field}</p>
						</div>
						<div>
							<button
								className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
								onClick={() => {
									setTest("qwerty")
									// setdata({ pc_number: number, pc_name: name });
								}}
							>
								Save
							</button>
						</div>
					</div>
					<div className="col-md-6" />
				</div>
			</form>
      	{/* ) */}
              {/* } */}
      {/* </PcContext.Consumer> */}
		</div>
  )

}

export default AddPc;

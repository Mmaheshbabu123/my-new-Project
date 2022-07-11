import React, { useEffect, useState } from 'react';
import { APICALL } from '../../Services/ApiServices';
import Select from 'react-select';
import { addplanningemployee } from '../../Services/ApiEndPoints';
import ValidationService from '../../Services/ValidationService';
import { useRouter } from 'next/router';
import { da, id } from 'date-fns/locale';
// import { FormControl } from 'react-bootstrap';
// import { FormLabel } from 'react-bootstrap';
// import { Printer } from 'react-bootstrap-icons';

const AddFunction = () => {
	const router = useRouter();
	const [ischecked,setChecked]=useState(true);
	const [ Data, setData ] = useState([]);
	const [ emptypes, setEmptypes ] = useState([]);
	const [ functions, setFunctions ] = useState([]);
	const [ salaries, setSalaries ] = useState();
	//functionid,salary
	const [functionid,setFunctionId]=useState();
	//employee id,employee type id
	const [emptypetoid,setEmptypeTOid]=useState();
	const [ selectedOption, setSelectedOption ] = useState([]);

	useEffect(
		() => {
			var p_unique_key = router.query.p_unique_key;
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/get-planningemployee/' + p_unique_key, 'GET')
				.then((result) => {
					var data = result.data;
					setData(data);
				})
				.catch((error) => {
					console.error(error);
				});
			APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getallEmployeesTypes/' + p_unique_key, 'GET')
				.then((res) => {
					console.log(res);
					setEmptypes(res);
				})
				.catch((error) => {
					console.error(error);
				});
			APICALL.service(
				process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/getfunctionsbypcnumbers/' + p_unique_key,
				'GET'
			)
				.then(async (respons) => {
					setFunctions(respons);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[ router.query ]
	);

	const submit = (e) => {
		e.preventDefault();
	            //functionid, salary,employeetypeid,employeeid
		var data=[...functionid,...emptypetoid];
		APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + 'api/storeFunctionEmptypeSalary/'+ p_unique_key, 'POST',data)
				.then((res) => {
					console.log(res);
					setEmptypes(res);
				})
				.catch((error) => {
					console.error(error);
				});
		//router.push('/planning/timings/' + router.query.p_unique_key);
	};

	// const EmpSalary=(id,key)=>{
	// 	if(id.value!=''&&key!=''){
	// 		setEmptypeTOid([id.value,key]);
	// 	}
	// }

	function addsalary(id,salary,level) {
		if(level==1){
			setFunctionId([id,salary]);
		}else{
			setEmptypeTOid([id.value,salary]);
		}
		setSalaries(salary);
	}
    
	function checkbox(){
		setChecked(!ischecked);
	}

	const backToDashboard = () => {
		var p_unique_key = router.query.p_unique_key;
		router.push('/planning/employees/' + p_unique_key);
	};

	
	var func=<div className="row ms-5">
	<ul>
		{functions != null ? (
			functions.map((key, value) => (
				<div key={key['id']} className="row ms-5">
					<div className="col-md-6">
						<div
							className="mt-2 mb-2 bg-light h-75 p-3"
							onChange={()=>addsalary(key['id'],key['salary'],1)}
						>
							<input
								type="radio"
								value={key['id']}
								name="functions"
								className="p-3 "
							/>{' '}
							{key['name']}
						</div>
					</div>
				</div>
			))
		) : (
			''
		)}
	</ul>
</div>;
var total='',individual='';
if(ischecked){
  total=func;
}else{individual=func;}
	const saveSalary = async () => {};
	return (
		<div className="container" style={{ marginTop: '5%', marginBottom: '2%' }}>
			<form onSubmit={(e) => submit(e)}>
				<div className="row">
					<div className="row">
						<p className="h1">Add function</p>
					</div>
					<div className="form-check">
						<input  type="checkbox" checked={ischecked}  onChange={()=>checkbox()}/>
						<label className="form-check-label p-1 " htmlFor="flexCheckChecked">
							Same functions for all employees
						</label>
					</div>
				</div>
				<div className="row ">
					<ol type="1">
						{Data.map((key, value) => (
							<div>
							<div key={key} className="row bg-light mb-2 p-3">
								<div className="col-md-3 p-1">
									{value + 1}. {key[1]}
								</div>
								<div className="col-md-4 bg-light">
									{/* {console.log(emptypes)} */}
									{(emptypes!=null)?
									<Select
										options={emptypes}
										name="functionss"
										onChange={setSelectedOption} 
										onInputChange={()=>addsalary(selectedOption,key[4],2)}
										></Select>:''}
								{/* {selectedOption == ''?<span>this field is required</span>:''} */}
								</div>
								<div className="col-md-2 bg-light mb-2">
									<span className="p-1">{salaries != undefined ? '€' + salaries : ''}</span>
								</div>
								<div className="col-md-2">
									<input
										type="textfield"
										name="salary"
										className="form-control"
										onChange={{ saveSalary }}
									/>
								</div>
							</div>
							{individual}
							</div>
						))}
					</ol>

				</div>
				{total}
				<div className="row">
					<div className="text-start col-md-6">
						<button
							type="button"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => backToDashboard()}
						>
							Back
						</button>
					</div>
					<div className="text-end col-md-6">
						<button
							type="sumit"
							className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"
							onClick={() => submit}
						>
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddFunction;

// import React, { useState }  from "react";
// import axios from "axios";
// import ValidationService from "../ValidationService";
// // import { AppContext } from "./context";
// import { useContext } from "react";
// import { useEffect } from "react";
// import {useNavigate} from 'react-router-dom';


// /**
//  * 
//  * @param {*} props 
//  * @returns the added category data to the common.js component.
//  */
// function AddPc(props){

//   var url = process.env.REACT_APP_BACKEND_URL;
//   const navigate = useNavigate();



//   // const myContext = useContext(AppContext);

//   const [cat, setcat] = useState(false);
//   const [number, setnmber] = useState("");
//   const [name, setname] = useState("");

//   const [field,setfield]=useState();
//   const [field1,setfield1]=useState();
//   const [data,setdata]=useState();
//   const [duperror,setduperror]=useState('');
// const dt=[];


//     // const myContext = useContext(AppContext);
//     var data1=[];


//     /**
//  * it will post the committee data to the backend by using api's
//  * @param {*} e 
//  */

// let postdata= async (e)=>{
//   var url = process.env.APP_BACKEND_URL;
// //   const res= await axios.post(url+'api/addpc',data);
// //   if(res.data.status === 200){
// //     var pid=res.data.pcid;
// //     navigate("/pc/"+pid);
// //   }else if(res.data.status==205){
// //         await setfield1('Paritair comite number already exists');
// //   }else{
// //     console.log(res.data); 
// //     }
// }
   

//     let submit= async(event) => {
  
//       event.preventDefault(); 
        
//       var emptyValue  = await ValidationService.emptyValidationMethod(name);
//       var emptyValue1 = await ValidationService.emptyValidationMethod(number);
//       var validName   = await ValidationService.nameValidationMethod(name);
//       var validSalary = await ValidationService.pcnumberValidationMethod(number);
    
//         if (emptyValue != "0") {
//           setfield(emptyValue);
//         }
//         else {
//           await setfield(validName);
//         }
    
       
//        if (emptyValue1 != "0") {
//         setfield1(emptyValue1);
//       }
//       else {
//         await setfield1(validSalary);
//       }
    
//       if(validSalary==true&&validName==true){
//         postdata();
//         }
//       }

    




//   return(
//     <div className="container">
//   <form onSubmit={(e)=>submit(e)}>
//     <div className="row pt-5">
//       <div className="col-md-9"></div>
//       <div className="col-md-3">
//         <h4>Add Paritair comite</h4>
//             <div className="form-group mt-3 mb-4">
//             <label  className="">Paritair comite number</label>
//             <input type="text" value={number} className=" form-control mt-2" onChange={(e) => {setnmber(e.target.value);}}  />
//             <p style={{color:'red'}}>{field1}</p>
//         </div>
//     <div className="form-group mt-3 mb-4">
//     <label>Paritair comite name</label> 
//       <input type="text" value={name}  className="form-control" onChange={(e) => {setname(e.target.value);}}/>
//       <p style={{color:'red'}}>{field}</p>
//       </div>
//       <div>
//         <button className="btn btn-secondary btn-lg btn-block float-sm-right mt-5 md-5 add-proj-btn"onClick={()=>{ setdata({'pc_number':number,'pc_name':name});}}>Save</button>
//       </div>
//     </div>
//     </div>
//   </form>
//   </div>
//   );
//   }

//   export default AddPc;
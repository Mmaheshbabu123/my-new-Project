import React, { useState } from "react";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { APICALL } from '../../Services/ApiServices';
import ValidationService from "@/Services/ValidationService";
import DatePicker from 'react-multi-date-picker';
import { useRouter } from 'next/router';
import { da } from "date-fns/locale";

function StopPlanning(props) {
    /**
     * 
     * @param {*} event 
     * Submit function
     */   
    const router = useRouter();
    
    const [date_err,setDate_err]=useState('');
    const [time_err,setTime_err]=useState('');

    var today=new Date();
    let tday=today.getDay();
    let tmonth=today.getMonth()+1;
    let tyear=today.getFullYear();

    //mindate planning start day.
    var currentdate = new Date(props.Data[4]);
    const [time,setTime]=useState('');
    let dat = currentdate.getDate().toString();
    (dat.length==1)?dat='0'+dat:'';
	let month = currentdate.getMonth() + 1;
    month=month.toString();
    (month.length==1)?month='0'+month:'';
	let year = currentdate.getFullYear();

    //maxdate next day from planning day.
    var nextday=currentdate.setDate(currentdate.getDate() + 1);
    var nextday=new Date(nextday);
    let ndat = nextday.getDate().toString();
    (ndat.length==1)?ndat='0'+ndat:'';
	let nmonth = nextday.getMonth() + 1;
    nmonth=nmonth.toString();
    (nmonth.length==1)?nmonth='0'+nmonth:'';
	let nyear = nextday.getFullYear();

    const [date,setDaTe]=useState('');


    
    const valiDate=()=>{
        let time_error=ValidationService.emptyValidationMethod(time);
        let date_error=ValidationService.emptyValidationMethod(date);
        if(time_error==''&&date_error==''){
            if(date==year+'-'+month+'-'+dat){
                var plannnedtime=new Date(props.Data[4]);
                var selectedtime=new Date(date+' '+time);
                if(plannnedtime.getTime()<selectedtime.getTime()){
                    setTime_err('');
                    setDate_err('');
                    return true;
                }else{
                setTime_err('End time should be grater than start time.');
                }
                return false;
            }
            return true;
        }else{
            setTime_err(time_error);
            setDate_err(date_error);
        }
        return false;
    }

    const saveData=(e)=>{
        e.preventDefault();
        let datetime=date+' '+time;
        if(valiDate()){
            
            APICALL.service(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/stop-planning-by-employer/'+props.Data[3]+'?wid='+props.Data[2]+'&datetime='+datetime, 'POST')
            .then((result) => {
                    router.push('/pwa/employee-widget');
                    props.popupActionNo()
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    return (
        <div>
            <form onSubmit={saveData}>
                <div
                    className="modal"
                    id="myModal"
                    tabIndex="-1"
                    style={{ display: 'block', background: 'rgb(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered ">
                        <div className="modal-content">
                            <div className="modal-header col-md-11 m-auto px-0">
                                <div className="col-md-10">
                                    <p className="modal-title  font-weight-bold  bitter-italic-normal-medium-24 ps-3">
                                        Stop planning
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                onClick={() => props.popupActionNo()}
                                />
                            </div>
                            <div className="modal-body ">
                                <div className="col-md-11 m-auto add_project">
                                    <div className="row">
                                        <div className="px-1">
                                            <div className="row m-0">
                                                <div className="col-md-6">
                                                    <label className="custom_astrick poppins-light-18px">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={props.Data[0]}
                                                        disabled={true}
                                                        className="form-control mt-2 mb-2 rounded-0 shadow-none"
                                                    />

                                                </div>
                                                <div className="col-md-6 actual-stop-date">
                                                    <label className="custom_astrick poppins-light-18px">
                                                        Actual stop date
                                                    </label>
                                                    <DatePicker
                                                    size="lg"
                                                    minDate={year+'-'+month+'-'+dat}
                                                    maxDate={nyear+'-'+nmonth+'-'+ndat}
                                                    format="DD-MM-YYYY"
                                                    name={'stop date'}
                                                    onChange={(e)=>setDaTe(e.format('YYYY-MM-DD'))}
                                                    />
                                                    {<p style={{color:'red'}}>{date_err}</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                            <div className="row  m-0">
                                                <div className="col-md-6">
                                                    <label className="custom_astrick poppins-light-18px">
                                                        Planned stop time
                                                    </label>
                                                    <input
                                                        type="text"
                                                        disabled={true}
                                                        value={ValidationService.timeFOrmating(props.Data[1])}
                                                        className="form-control mt-2 mb-2 rounded-0 shadow-none"
                                                    />

                                                </div>
                                                <div className="col-md-6 actual-stop-time">
                                                    <label className="custom_astrick poppins-light-18px ">
                                                        Actual stop time
                                                    </label>
                                                    {console.log(time)}
                                                    <DatePicker
                                                        disableDayPicker
                                                        name="time" 
                                                        format="HH:mm"
                                                        // value={time}
                                                        onChange={(e)=>setTime(e.format('HH:mm:00'))}
                                                        plugins={[
                                                            <TimePicker key={time}  hideSeconds/>
                                                          ]} 
                                                    />
                                                    {<p style={{color:'red'}}>{time_err}</p>}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer border-0 col-md-12 m-auto add_project">
                                            <button
                                                type="submit"
                                                className="btn poppins-medium-18px-next-button float-right px-3 rounded-0 shadow-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );

}
export default StopPlanning;

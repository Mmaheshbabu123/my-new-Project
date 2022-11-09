import { useRouter } from 'next/router';
import {useContext} from 'react';
import Image from "next/image";
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import React from 'react';

const Qrcode = (props) => {

const { contextState = {} } = useContext(UserAuthContext);
    const { key, t } = props;
    const router = useRouter();

    const redirectTab=()=>{
        router.push('/time-registration')
    }
    var res=<h1>...Loading..........</h1>;

    // (contextState.role='employee')?
     res=<div className='row'>                    
      
            <div className='col-md-12 text-center d-flex align-items-center justify-content-center pt-3 qr-code-time-registration'>
                        <Image src="/images/qrcodecommon.svg"  className="dasboard_image"
                        
                        width={500}
                        height={500}
                        ></Image>
                    </div>
                
                   <div className='row'>
                     <div className='col-md-12'>
                     <button
								type="button"
								className="mt-4 bg-white border-0 poppins-regular-18px shadow-none px-0 text-decoration-underline mb-0"
								onClick={redirectTab}
							>
                                BACK
							</button>
                     </div>
                   </div>
    </div>
    // res=<div>

    // </div>;

return res;
}

export default Qrcode;

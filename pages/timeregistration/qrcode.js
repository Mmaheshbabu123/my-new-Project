import { useRouter } from 'next/router';
import Image from "next/image";

const Qrcode = (props) => {
    const { key, t } = props;
    const router = useRouter();

    const redirectTab=()=>{
        router.push('/time-registration')
    }

    return (
      <div className='row'>                    
      
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

    );
}

export default Qrcode;

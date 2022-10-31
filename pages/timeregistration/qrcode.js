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
      
            <div style={{marginTop:'10%',marginLeft:'23%'}} >
                        <Image src="/images/qrcodecommon.svg"  className="dasboard_image "
                        
                        width={500}
                        height={500}
                        ></Image>
                    </div>
                
                    <button style={{  marginLeft:'-484px'}}
								type="button"
								className="mt-4 bg-white border-0 poppins-regular-18px shadow-none px-0 text-decoration-underline"
								onClick={redirectTab}
							>
                                BACK
							</button>
    </div>

    );
}

export default Qrcode;

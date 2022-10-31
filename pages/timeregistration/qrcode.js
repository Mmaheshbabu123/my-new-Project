import { useRouter } from 'next/router';
import Image from "next/image";

const Qrcode = () => {
    const router = useRouter();
    return (
      <div className='row' style={{minHeight:'82vh'}}>                    
      
            <div className='col-md-12 text-center d-flex align-items-center justify-content-center'>
                        <Image src="/images/qrcodecommon.svg"  className="dasboard_image"
                        
                        width={500}
                        height={500}
                        ></Image>
                    </div>
                    </div>

    );
}

export default Qrcode;

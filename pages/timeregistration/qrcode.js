import { useRouter } from 'next/router';
import Image from "next/image";

const Qrcode = () => {
    const router = useRouter();
    return (
      <div className='row'>                    
      
            <div style={{marginTop:'10%',marginLeft:'23%'}} >
                        <Image src="/images/qrcodecommon.svg"  className="dasboard_image "
                        
                        width={500}
                        height={500}
                        ></Image>
                    </div>
                    </div>

    );
}

export default Qrcode;

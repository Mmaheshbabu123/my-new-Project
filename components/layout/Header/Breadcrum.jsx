
import Image from "next/image";

function Breadcrum(props) {

    const contrast = () => {
        
        if ( document.querySelector("html").classList.contains('insights-gray-scale-container')) {
            document.querySelector("html").classList.remove("insights-gray-scale-container")
        }
        else {
            document.querySelector("html").classList.add("insights-gray-scale-container");
        }
    }
    const largeFont = () => {
        
        if ( document.querySelector("html").classList.contains('largefont')) {
            document.querySelector("html").classList.remove("largefont")
        }
        else {
            document.querySelector("html").classList.add("largefont");
        }
    }
    return (
        <>
            <div className="row m-0 mt-3 px-5 py-2 custom_subnav mb-3">
                <div className="group-18327 col-8 p-0">
                    {props.breadcrum}
                    {/* <h1 className="my-overview-h1 tahoma-regular-normal-azure-28px-2">{props.breadcrum}</h1> */}
                </div>
                <div  className='col-4 justify-content-end d-flex p-0'>
                <ul className="d-flex align-items-center">
                    {/* <li >
                    <a rel="nofollow"
                    className="rsbtn_play"
                    accessKey="L"
                    title="Escucha esta p&aacute;gina utilizando ReadSpeaker webReader"
                    href={`//app-na.readspeaker.com/cgi-bin/rsent?customerid=5655&amp;lang=nl&amp;readid=main-content-privateBCI&amp;url=http://localhost:3000/myoverview`}
                    >
                    <span className="rsbtn_left rsimg rspart">
                        <span className="rsbtn_text">
                        <span>Escuchar</span>
                        </span>
                    </span>
                    <span className="rsbtn_right rsimg rsplay rspart"></span>
                    </a>
                    </li> */}
                <li className="nav-item px-3">
                <div className="group-contrast">
                    <Image 
                        className="contrast-img"
                        alt="Contrast icon" 
                        src="/img/contrast.svg"
                        width={30}
                        height={30}
                        onClick={contrast} 
                    />
                    <a 
                        href="#" 
                        className="faq tahoma-regular-normal-gravel-24px"
                        onClick={contrast}
                    >
                        Contrast
                    </a>
                </div>
                </li>
                <li className="nav-item px-3">
                <div className="group-font">
                    <Image 
                        className="font-img" 
                        alt="Font increase icon" 
                        src="/img/font.svg"
                        width={30}
                        height={30}
                        onClick={largeFont}
                    />
                    <a 
                        href="#" 
                        className="faq tahoma-regular-normal-gravel-24px"
                        onClick={largeFont}
                    >
                        Groter
                    </a>
                </div>
                </li>
                <li className="nav-item pl-3 pr-0">
                <div className="group-voice">
                    <Image 
                        className="voice-img" 
                        alt="Voice icon" 
                        src="/img/voice.svg"
                        width={30}
                        height={30} 
                    />
                    <a 
                        href="#"
                        className="faq tahoma-regular-normal-gravel-24px"
                    >
                        Lees voor
                    </a>
                </div>
                </li>
                </ul>
                </div>
            </div>
        </>
    );
};
export default Breadcrum;
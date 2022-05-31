import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const myoverviewClass = 'my-overview-header tahoma-regular-normal-gravel-28px';
  const waterconsumptionClass = 'my-consumption-header tahoma-regular-normal-gravel-28px';
  const mydetailsClass = 'my-details-header tahoma-regular-normal-gravel-28px';
  const mybillingClass = 'my-billing-header tahoma-regular-normal-gravel-28px';
  return (
    <>
      {/* <nav className="overlap-group5" > */}
      <nav role="navigation" aria-labelledby="primary-navigation"  className="flex items-center flex-wrap bg-blue-400 nav_sec_main px-5 py-2 m-0 d-flex" >
        <h2 id="primary-navigation" className="visually-hidden">Primary navigation</h2> 
       <div style={{paddingLeft: "15px"}} className='col-1 p-0'>
       <Link href='/myoverview'>
          <a href="#" title="Logo">
            <img 
              src='/img/dwg-logo.svg'
              alt="DeWatergroep"
              title="Logo"
              width="89px"
              height="84px"
             
            />
          </a>
        </Link>
        </div>
        <div className="col-7">
          <div className="flex-row-header  navbar-collapse">
            <ul className="d-flex">
              <li className="nav-item mx-2">
                <Link href='/myoverview'>
                  <a  href="/myoverview " className={router.pathname == "/myoverview" ? `active-menu   ${myoverviewClass }` : `${myoverviewClass}` } ><span className='text-uppercase'>Mijn overzicht</span></a>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link href='#'>
                  <a href="#" className={router.pathname == "/mydetails" ? `active-menu   ${mydetailsClass}` : `${mydetailsClass}`}><span className="text-uppercase">Mijn gegevens</span></a>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link href='#'>
                  <a href="#" className={router.pathname == "/mybilling" ? `active-menu   ${mybillingClass}` : `${mybillingClass}`}> <span className="text-uppercase">Mijn facturen</span></a>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link href='/myconsumptionsection/myconsumptionchartreport'>
                  <a href="#" className={router.pathname == "/myconsumptionsection/myconsumptionchartreport" ? `active-menu   ${waterconsumptionClass}` : `${waterconsumptionClass}`}><span className="text-uppercase">Mijn waterverbruik</span></a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div style={{paddingRight: "30px"}} className='p-0 col-4 d-flex justify-content-end'>
          <ul className="d-flex align-items-center">
            <li style={{minWidth: "90px"}} className="nav-item px-3">
              <div className="d-flex">
                <div className="language tahoma-regular-normal-azure-28px">NL</div>
                  <div className="left-direction-row-svgrepo-com">
                    <div className="">
                      <img alt="Arrow for language" className="path-54538 pt-3" src="/img/path-54538-12@1x.png" />
                    </div>
                  </div>
              </div>
            </li>
            <li className="nav-item px-3">
              <div className="group-notification">
                <img alt="Notification icon" className="notification-img" src="/img/notification@1l.svg" />
                <a href="#" className="faq tahoma-regular-normal-gravel-24px">Notificaties</a>
              </div>
            </li>
            <li className="nav-item pl-3 pr-0">
              <div className="group-account">
                <img alt="My Account link" className="account-img" src="/img/account.svg" />
                <a href="#" className="faq tahoma-regular-normal-gravel-24px">Mijn account</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
  
export default Header;
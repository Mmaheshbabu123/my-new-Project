import '../styles/main.css';
import '../styles/Announcement.css';
// contract owner css imports
import "../components/terminateContract/ContractOwner/contract-owner.css";
import "../components/terminateContract/ContractOwner/DetailsMore/DetailsMore.css";
import "../components/terminateContract/ContractOwner/Group18241/Group18241.css";
import  "../components/terminateContract/ContractOwner/Group18328/Group18328.css";
import "../components/terminateContract/ContractOwner/Group18356/Group18356.css";
import "../components/terminateContract/ContractOwner/Group18357/Group18357.css";
import "../components/terminateContract/ContractOwner/Group18358/Group18358.css";
import "../components/terminateContract/ContractOwner/Group18359/Group18359.css";
import "../components/terminateContract/ContractOwner/Group18360/Group18360.css";
import "../components/terminateContract/ContractOwner/Group18361/Group18361.css";
import "../components/terminateContract/ContractOwner/Group18363/Group18363.css";
import "../components/terminateContract/ContractOwner/Group18483/Group18483.css";
import "../components/terminateContract/ContractOwner/Group1823622/Group1823622.css";
import "../components/terminateContract/ContractOwner/Group1823722/Group1823722.css";
import "../components/terminateContract/ContractOwner/Meter/Meter.css";
import "../components/terminateContract/ContractDates/Group18236/Group18236.css";

//contract dates page css import
import "../components/terminateContract/ContractDates/contract-dates.css";
import "../components/terminateContract/ContractDates/Group18237/Group18237.css";
import "../components/terminateContract/ContractDates/Group18381/Group18381.css";
import "../components/terminateContract/ContractDates/Group1835622/Group1835622.css";
import "../components/terminateContract/ContractDates/Group1835822/Group1835822.css";
import "../components/terminateContract/ContractDates/Group1835922/Group1835922.css";
import "../components/terminateContract/ContractDates/Group1836022/Group1836022.css";
import "../components/terminateContract/ContractDates/Group1836122/Group1836122.css";

//contract meter css import
import "../components/terminateContract/ContractMeter/contract-meter.css";
import "../components/terminateContract/ContractMeter/Group18428/Group18428.css";
import "../components/terminateContract/ContractMeter/Group18389/Group18389.css";
import "../components/terminateContract/ContractMeter/Group18076/Group18076.css";
import "../components/terminateContract/ContractMeter/Group18166/Group18166.css";
import "../components/terminateContract/ContractMeter/Group18156/Group18156.css";
import "../components/terminateContract/ContractMeter/Group18162/Group18162.css";

//contract overview css import
import "../components/terminateContract/ContractOverview/contract-overview.css";

import "../components/terminateContract/ContractConfirmation/contract-confirmation.css";
import "../components/layout/Alertpopup/Alertpopup.css";
import "../components/layout/Alertpopup/Group18393/Group18393.css"

import {UTILITYFN} from '../components/UtilityFunctions/Utility';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/layout.css";

import "../components/layout/Dashboard/Mycontract.css";
import "../components/layout/Dashboard/Component51/Component51.css";
import "../components/layout/Dashboard/Component61/Component61.css";
import "../components/layout/Dashboard/Component71/Component71.css";
import "../components/layout/Dashboard/Component101/Component101.css";
import "../components/layout/Dashboard/Component141/Component141.css";
import "../components/layout/Dashboard/Component151/Component151.css";
import "../components/layout/Dashboard/Component812/Component812.css";
import "../components/layout/Dashboard/Group18522/Group18522.css";
import "../components/layout/Dashboard/Group184212/Group184212.css";

function MyApp({ Component, pageProps }) {
  if(Component.toString().indexOf('TerminateContract') < 0 ){
    UTILITYFN.resetUserSessionDataforMoveOut();
  }
  return <Component {...pageProps} />
}

export default MyApp

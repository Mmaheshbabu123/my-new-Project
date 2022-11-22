import React, { Suspense,useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Encdage from '@/components/EncodageValidation/encodage';
import Validatedencodage from '@/components/EncodageValidation/validatedencodage';

const Encodage = () => {
  const [active,setActive]=useState(false);
  return (
    <div>
    <nav>
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
      <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>setActive(false)}>Unvalidated</button>
      <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={()=>setActive(true)}>Validated</button>
    </div>
  </nav>
  <div className="tab-content" id="nav-tabContent">
    <div className="tab-pane fade show active" id="nav-home" active="true" role="tabpanel" aria-labelledby="nav-home-tab">
      <Encdage/>
    </div>
    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
    <Validatedencodage/>
    </div>
  </div>
  </div>
  );
}

export default Encodage;

import Link from 'next/link';
import React, { useState } from "react";
import Image from 'next/image';

function QuickActions(props) {
   
    const [showMe, setShowMe] = useState(false);
    const toggle = () => {
        setShowMe(!showMe);
    }
    return (
        <>
            <div className="flex-row-action col-12 mt-5">
                <span className="my-quick-actions tahoma-bold-gravel-30px">Mijn snelle acties</span>
                <a href="#" alt="Edit actions">
                    <Image className="edit-actions ml-3 mb-1" src="/img/edit-action.svg" alt="Edit actions" />
                </a>
            </div>
            <div className="card-deck mt-2 flex" id="card-deck">
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/mycontract">
                        <a href="#" title="Mijn contracten">
                            <Image className="card-img-top" src="/img/file-contract.svg" alt="Mijn contracten details" />
                            <div className="card-body">
                                <h2 className="card-title tahoma-regular-normal-gravel-28px">Mijn contracten</h2>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a href="#" title="Mijn gegevens">
                            <Image className="card-img-top" src="/img/mydetails.svg" alt="Mijn gegevens details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Mijn gegevens</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a className="col" href="#" title="Mijn watermeter">
                            <Image className="card-img-top" src="/img/meter.svg" alt="Mijn watermeter details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Mijn watermeter</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a className="col" href="#" title="Lek melden">
                            <Image className="card-img-top" src="/img/leak.svg" alt="Lek melden details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Lek melden</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/mycontract">
                        <a className="col" href="/mycontract" title="Verhuizen">
                            <Image className="card-img-top" src="/img/move-away.svg" alt="Verhuizen details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Verhuizen</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="card-deck deck-1 mt-5 flex" style={{ display: showMe?"flex":"none" }}>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a href="#" title="Nieuw contract">
                            <Image className="card-img-top" src="/img/new-contract.svg" alt="Nieuw contract details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Nieuw contract</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a href="#" title="Doccle">
                            <Image className="card-img-top" src="/img/doccle.svg" alt="Doccle details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Doccle</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a href="#" title="Rapporteer probleem">
                            <Image className="card-img-top" src="/img/report-problem.svg" alt="Rapporteer probleem details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Rapporteer probleem</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a href="#" title="Mijn gelinkte accounts">
                            <Image className="card-img-top" src="/img/settings.svg" alt="Mijn gelinkte accounts details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Mijn gelinkte accounts</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a href="#" title="Domiciliëring aanvragen">
                            <Image className="card-img-top" src="/img/direct-debit.svg" alt="Domiciliëring aanvragen details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Domiciliëring aanvragen</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="card-deck deck-1 mt-5 flex" style={{ display: showMe?"flex":"none" }}>
                <div className="card px-2 py-4 border-2px-silver">
                    <Link href="/myoverview">
                        <a href="#" title="Inspectie aanvragen">
                            <Image className="card-img-top" src="/img/inspection.svg" alt="Inspectie aanvragen details" />
                            <div className="card-body">
                                <h3 className="card-title tahoma-regular-normal-gravel-28px">Inspectie aanvragen</h3>
                                <p className="card-text  tahoma-regular-normal-gravel-24px">Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="card px-2 py-4 invisible">
                </div>
                <div className="card px-2 py-4 invisible">
                </div>
                <div className="card px-2 py-4 invisible">
                </div>
                <div className="card px-2 py-4 invisible">
                </div>
            </div>
            <div className="flex justify-content-center mt-5 mb-5">
              <a className="tahoma-regular-normal-azure-28px flex gap" href="#card-deck" onClick={toggle}>
                  <span style={{ display: !showMe ? "flex" : "none" }}>Bekijk meer</span>
                  <span style={{ display: showMe? "flex" : "none" }}>Bekijk minder</span>
                <div className="flex mt-1">
                    <Image className="arrow-ios-downward-fill deck-hide" style={{ display: !showMe ? "flex" : "none" }} src="/img/arrow-ios-downward-fill-3@1x.png" alt="Bekijk meer down"/>
                    <Image className="arrow-ios-upward-fill deck-1" style={{ display: showMe? "flex" : "none" }} src="/img/arrow-ios-downward-fill-6@1x.png" alt="Bekijk meer up"/>
                </div>
              </a>
            </div>
        <div className='custom-minus-margin'>
            <div className='col-12 top-wave'></div>
            <div className="overlap-group-container  col-12 footer-background-sec px-5">
                <div className="overlap-group44 border-2px-silver col-8">
                    <Image alt="consumption-image" className="" src="/img/consumption_blue.svg" />
                    <div className="flex-col-1 col-8">
                        <div className="text-bel tahoma-bold-gravel-26px d-flex align-items-center">Mijn verbruik</div>
                            <div className="overlap-group11 col-12 d-flex">
                                <div className="col-11 p-3 lh-base">
                                    <span className="tahoma-regular-normal-gravel-24px d-flex">Driesplein 6 </span>
                                    <span className="tahoma-regular-normal-gravel-24px d-flex mb-2">1930 Zaventem, België</span>
                                    <span className="tahoma-regular-normal-gravel-24px d-flex">Meter number 180483036</span>
                                </div>
                                <div className="col-1 d-flex align-items-center justify-content-center ">
                                    <Image alt="downarrow-image" className="down-arrow-img" src="/img/down-arrow.png" />
                                </div>
                            </div>  
                            <div className='col-12 d-flex'>
                                <div className='col-12'>
                                    <div className='col-12 mt-3 mb-3'><p className='tahoma-regular-normal-gravel-24px'>Verbruik vorige maand: 230.00m3</p></div>
                                      <div className='col-12 mt-2 mb-2'>
                                        <p className='tahoma-regular-normal-gravel-24px my-1 mb-2'>Verbruik huidige maand: 220.00m3</p>
                                        <p className='tahoma-regular-normal-gravel-24px my-1'>Huidige maand: 25/11/2021, 12:30</p>
                                      </div>  
                                 </div>
                                <div className='col-4 flex justify-content-end'>
                                    <Image alt="drupi-image" className="drupi_img" src="/img/drupi.svg" />
                                </div>
                            </div> 
                        </div>
                    </div>
                <div className="card overlap-group2-dashboard1 border-2px-silver col-4">
                    <div className='d-flex align-items-center mb-2'>
                         <Image alt="Mijn notificaties" className="icon-material-message2 mr-5" src="/img/notification@1l.svg" />
                         <span className='text-bel tahoma-bold-gravel-26px '>Mijn notificaties</span>
                    </div>
                    <div className='col-12 d-flex mt-4'>
                       <span><Image alt="notification-image" className="dark_notifi_img mr-5 ml-2" src="/img/notification-black.svg" /></span> 
                        <div>
                            <p className='tahoma-regular-normal-gravel-24px mb-2'>Er is een nieuw contract geactiveerd </p>
                            <p className='tahoma-regular-normal-gravel-24px mb-3'>met contract nummer: 8316.</p>
                            <p className='tahoma-regular-normal-gravel-22px'>20 mei 2021</p>
                        </div>
                     </div>
                     <div className='col-12 d-flex mt-4'>
                        <span><Image alt="notification-image" className="dark_notifi_img mr-5 ml-2" src="/img/notification-black.svg" /></span>
                        <div>
                            <p className='tahoma-regular-normal-gravel-24px mb-2'>We hebben de betaling van </p>
                            <p className='tahoma-regular-normal-gravel-24px mb-3'>factuur met factuurnummer: 1021</p>
                            <p className='tahoma-regular-normal-gravel-22px'>18 mei 2021</p>
                        </div>
                     </div>
                     <div className="group-bekij">
                         <div className="bekijk-meer tahoma-regular-normal-azure-24px mr-2">Bekijk meer</div>
                          <Image alt="Bekijk meer" className="arrow-ios-downward-fill-1" src="/img/arrow-ios-downward-fill-1@1x.png"/>
                     </div>
                </div>
            </div>
            <div className='col-12 bottom-wave'></div>
            </div>
            <div className="mt-5 mb-5 text-center tahoma-bold-gravel-30px">Heb je een vraag? Typ ze in de zoekbalk en we zoeken het voor je uit!</div>
            <div className="search-wrapper border-2px-silver flex pl-4 pr-2 py-3 align-items-center mt-3 container">
                <a href="#"><Image alt="Search" className="search-img" src="/img/search.svg" /></a>
                <div className="form-outline tahoma-regular-normal-gravel-28px col-11 px-4">
                    <input type="search" id="form1" placeholder="Zoekopdracht" className="boxshadow-none border-0 form-control" />
                    <label className="form-label d-none" htmlFor="form1">zoekopdracht</label>
                </div>
                {/* <div className="tahoma-regular-normal-gravel-28px col-11 px-4"></div> */}
                <a href="#"><Image alt="Next" className="icon-ionic-ios-arrow-up" src="/img/icon-ionic-ios-arrow-up-1@1x.png" /></a>
            </div>
        </>
    );
};
export default QuickActions

import Image from "next/image";
import Translation from "@/Translation";
function QuickAccess(props) {
    const {  t } =  props;
    return (
        <>
            <div className="my-quick-access-18507 col-12">
                <h1 className="my-quick-access tahoma-bold-gravel-30px flex">
                    {t('Mijn snelle toegang')}
                </h1>
            </div>
            <div className="overlap-group-container mt-2 col-12">
                <div className="overlap-group4 border-2px-silver col-4">
                    <Image alt="openstaand image" className="subtraction-3" src="/img/subtraction-3.svg" />
                    <div className="flex-col-1">
                        <div className="text-bel tahoma-bold-gravel-26px d-flex align-items-center">{t('Mijn openstaand saldo')}</div>
                        <div className="overlap-group1">
                            <div className="euro-wrapper">
                                <Image alt="Euro" className="euro" src="/img/path-54565-1@1x.png"></Image>
                                <span className="euro-span tahoma-regular-normal-scarpa-flow-32px">100,36</span>
                            </div>
                            </div>
                            <div className="text-balance tahoma-regular-normal-gravel-24px">
                            {t('Het openstaande saldo is een optelsom van onbetaalde facturen en/of tegoeden. Wilt u een overzicht? Klik op')}
                            </div>
                            <div className="group-container-1-dashboard">
                                <div className="btn-custom border-1px-atlantis mr-2">
                                    <button className="pay tahoma-regular-normal-baby-powder-24px px-2">{t('Facturen betalen')}</button>
                                </div>
                                <div className="btn-custom">
                                    <button className="view tahoma-regular-normal-baby-powder-24px px-2">{t('Facturen bekijken')}</button>
                                </div>
                            </div>
                    </div>
                </div>
                
                <div className="card overlap-group2-dashboard border-2px-silver col-8">
                    <Image alt="Belangrijke mededelingen icon" className="icon-material-message" src="/img/icon-material-message.svg" />
                    <div className="flex-col-2-dashboard col-11">
                        <div className="text-bel tahoma-bold-gravel-26px">
                           {t(' Belangrijke mededelingen')}
                        </div>
                        <div className="overlap-melding">
                            <Image alt="Warning" className="warn" src="/img/warn.svg" />
                            <div className="warn-wrapper">
                            <div className="text-opgelet tahoma-regular-normal-gravel-28px">{t('Opgelet: valse e-mails van De Watergroep in omloop')}</div>
                            <div className="text-melding tahoma-regular-normal-gravel-24px">
                            {t('Er circuleren frauduleuze e-mails uit naam van De Watergroep met als afzender')}
                            {t('Je kan deze e-mail herkennen aan de hand van een foutief afzender e-mailadres, een onderwerp met vraag tot betaling en foutieve info in de mail.')}
                            </div>
                            </div>
                        </div>
                        <div className="group-bekij">
                            <div className="bekijk-meer tahoma-regular-normal-azure-24px mr-2">{t('Bekijk meer')}</div>
                            <Image alt="Bekijk meer" className="arrow-ios-downward-fill-1" src="/img/arrow-ios-downward-fill-1@1x.png" />
                        </div>
                    </div>
                </div>
                </div>
        </>
    );
};
export default React(Translation(QuickAccess,['Mijn snelle toegang','Mijn openstaand saldo',
'Het openstaande saldo is een optelsom van onbetaalde facturen en/of tegoeden. Wilt u een overzicht? Klik op','Facturen betalen','Facturen bekijken',' Belangrijke mededelingen'
,'Opgelet: valse e-mails van De Watergroep in omloop','Er circuleren frauduleuze e-mails uit naam van De Watergroep met als afzender',
'Je kan deze e-mail herkennen aan de hand van een foutief afzender e-mailadres, een onderwerp met vraag tot betaling en foutieve info in de mail.','Bekijk meer']));
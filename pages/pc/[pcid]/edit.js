import { useRouter } from "next/router";
import PcOverview from "../../components/PcComponent/PcOverview";

export default () => {
    const router = useRouter()

    return(
<>
<PcOverview pcid={router.query.pcid}/>
</>
    )    
}
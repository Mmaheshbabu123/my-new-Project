import AddTiming from "../../../components/PlanningComponent/AddTiming";
import { useRouter } from 'next/router';



const Addtiming = () => {
    const router = useRouter();
return(<div><AddTiming p_unique_key={router.query.p_unique_key} /></div>);
}
export default Addtiming;
import EditProject from '@/components/PlanningComponent/EditProject';
import { useRouter } from 'next/router';


const Editproject = () => {
    const router = useRouter();
    return (
        <div>
            <EditProject id={router.query.pid} />
        </div>
    );
};
export default Editproject;

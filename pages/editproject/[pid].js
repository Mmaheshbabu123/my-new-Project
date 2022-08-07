import EditProject from '@/components/PlanningComponent/EditProject';
import { useRouter } from 'next/router';


const editproject = () => {
    const router = useRouter();
    return (
        <div>
            <EditProject id={router.query.pid} />
        </div>
    );
};
export default editproject;

import EditProject from '@/components/PlanningComponent/EditProject';
import { useRouter } from 'next/router';


const editproject = () => {
    const router = useRouter();
    return (
        <div>
            <EditProject pid={router.query.pid} type="editproject" />
        </div>
    );
};
export default editproject;

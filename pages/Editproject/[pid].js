import EdtiProject from '@/components/PlanningComponent/EditProject';
import { useRouter } from 'next/router';


const Editproject = () => {
    const router = useRouter();
    return (
        <div>
            <EdtiProject />
        </div>
    );
};
export default Editproject;

import Indexationofsal from '@/components/Indexation/Indexationofsalary';
import { useRouter } from 'next/router';


const Indexationofsalary = () => {
    const router = useRouter();

    return (
        <div>
            <Indexationofsal  id={router.query.ios_id}/>
        </div>
    );
};
export default Indexationofsalary;

import { useRouter } from 'next/router';
import AddPlanning from '../../../components/PlanningComponent/AddPlanning';
// import { useRouter } from 'next/router';

const Planning = () => {
    const router = useRouter();
    return (
        <div><AddPlanning /></div>
    );
}

export default Planning;
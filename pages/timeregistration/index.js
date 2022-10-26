import { useRouter } from 'next/router';
import Device from '@/components/TimeRegistration/CheckDevice';

const Check = () => {
    const router = useRouter();
    return (
        <div><Device /></div>
    );
}

export default Check;
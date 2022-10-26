import { useRouter } from 'next/router';
import Device from '@/components/TimeRegistration/CheckDevice';

const check = () => {
    const router = useRouter();
    return (
        <div><Device /></div>
    );
}

export default check;
import { useRouter } from 'next/router';
import Image from "next/image";
import {useContext} from 'react';
import Qremr from "@/components/TimeRegistration/QrCode";
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';

const QrCodeEmployer = (props) => {

const { contextState = {} } = useContext(UserAuthContext);
    const { key, t } = props;
    const router = useRouter();

return <>
  <Qremr />
</>;
}

export default QrCodeEmployer;

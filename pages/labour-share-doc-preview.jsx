import React, { useContext } from 'react';
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import LabourShareDocPreview from '@/components/LabourShareDoc/LabourShareDocPreview';
import AccessDenied from '@/atoms/AccessDenied';
import { useRouter } from 'next/router';

const LabourShareDocIndex = () => {
  const router = useRouter();
  const { entityid, preview = 0, approved = 0 } = router.query;
  const { contextState: { uid = 0 } } = useContext(UserAuthContext);

  if(uid === entityid) {
    return <LabourShareDocPreview userId = {uid} preview = {preview} approved = {approved}/>
  } else {
    return  entityid && <AccessDenied />
  }
}

export default React.memo(LabourShareDocIndex);

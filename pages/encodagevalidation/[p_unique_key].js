import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Encdage from '@/components/EncodageValidation/encodage';

const Encodage = () => {
  return (
  <Encdage/>
  );
}

export default Encodage;

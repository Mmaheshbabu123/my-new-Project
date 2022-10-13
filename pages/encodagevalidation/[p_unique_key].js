import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Encodage from '@/components/EncodageValidation/encodage';

const encodage = () => {
  return (
  <Encodage/>
  );
}

export default encodage;

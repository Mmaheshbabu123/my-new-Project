import React from 'react';
import Translation from '@/Translation';
const AccessDenied = () => {
  return (
    <div className='my-4'>
      <h1 className = 'access-denied-title'> {t('Access denied')} </h1>
      <div className="text-center fs-5">  {t('You are not authorized to access this page.')}  </div>
    </div>
  );
}
export default React.memo(Translation(AccessDenied,['Access denied','You are not authorized to access this page.']));

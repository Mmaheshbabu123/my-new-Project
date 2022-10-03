import React from 'react';
const AccessDenied = () => {
  return (
    <div className='my-4'>
      <h1 className = 'access-denied-title'> Access denied </h1>
      <div className="text-center fs-5">  You are not authorized to access this page.  </div>
    </div>
  );
}
export default React.memo(AccessDenied);

import React, { useState, useEffect } from 'react';
import CheckBoxField from '@/atoms/CheckBoxField';
import { v1DocumentPreview, saveV1Document, getEmployerIdByCompanyId } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import styles from './V1Document.module.css';
import customAlert from '@/atoms/customAlert';

const V1DocumentsOverview = ({ employeeId, companyId, preview = 0 }) => {
  return(
    <div>
        V1DocumentsOverview
    </div>
  );
}

export default React.memo(V1DocumentsOverview)

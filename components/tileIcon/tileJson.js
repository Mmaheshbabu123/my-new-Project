import employeetype from '@/components/images/e1.svg';
import coefficient from '@/components/images/e2.svg';
import linkcofficientemp from '@/components/images/e3.svg';
import salary from '@/components/images/e4.svg';
import coefficientperPC from '@/components/images/e5.svg';


export const tileJson = [
  {
    id: 1,
    name: 'Manage employee types',
    url: '/manage/employee-types',
    iconPath: employeetype,
  },
  {
    id: 2,
    name: 'Manage coefficients',
    url: '/manage/coefficient-types',
    iconPath: coefficient,
  },
  {
    id: 3,
    name: 'Link coefficients to employee types',
    url: '/link-coefficient-employeetype?pcid=0',
    iconPath: linkcofficientemp,
  },
  {
    id: 4,
    name: 'Manage coefficients per PC',
    url: '/linkcofficientpc/manage',
    iconPath: coefficientperPC,
  },
  {
    id: 5,
    name: 'Salary benefits',
    url: '/manage-salary-benefits?action=view',
    iconPath: salary,
  },
  {
    id: 6,
    name: 'QR code scanner',
    url: '/qr-code-scanner',
    iconPath: salary,
  }
];

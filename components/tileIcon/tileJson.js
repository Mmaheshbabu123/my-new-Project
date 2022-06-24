import employeetype from '@/components/images/manage-employee-type@2x.png';
import coefficient from '@/components/images/manage-co-efficients@2x.png';
import linkcofficientemp from '@/components/images/link-coefficients_to_employee-types@2x.png';
import salary from '@/components/images/salary-benefits@2x.png';

export const tileJson = [
  {
    name: 'Manage employee types',
    url: '/manage/employee-types',
    iconPath: employeetype,
  },
  {
    name: 'Manage coefficients',
    url: '/manage/coefficient-types',
    iconPath: coefficient,
  },
  {
    name: 'Link coefficients to employee types',
    url: '/link-coefficient-employeetype?pcid=0',
    iconPath: linkcofficientemp,
  },
  {
    name: 'Manage coefficient per PC',
    url: '/linkcofficientpc/manage',
    iconPath: coefficient,
  },
  {
    name: 'Manage salary benefits',
    url: '/manage-salary-benefits?action=view',
    iconPath: salary,
  }
];

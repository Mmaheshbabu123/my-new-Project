import Link from 'next/link';

function ManageEmployeeAndCoefficientTypes() {
  return (
    <>
    <div className='container row'>
    <h4>Configuration and settings</h4>
      <Link href="/manage/employee-types">
        <a className='show-box-link'>
          <div title="Manage employee types">
          Manage employee types
          </div>
        </a>
      </Link>
      <Link href="/manage/coefficient-types">
        <a className='show-box-link'>
          <div title="Manage coefficient types">
          Manage coefficient
          </div>
        </a>
      </Link>
      <Link href="/link-coefficient-employeetype?pcid=0">
        <a className='show-box-link'>
          <div title="Link coefficients to employee types">
          Link coefficients to employee types
          </div>
        </a>
      </Link>
      <Link href="/linkcofficientpc/manage">
        <a className='show-box-link'>
          <div title="Manage coefficient per PC">
            Manage coefficient per PC
          </div>
        </a>
      </Link>
      <Link href="/manage-salary-benefits?action=view">
        <a className='show-box-link'>
          <div title="Manage coefficient per PC">
            Manage salary benefits
          </div>
        </a>
      </Link>
    </div>
    </>
  );
}

export default ManageEmployeeAndCoefficientTypes;

import Link from 'next/link';

function ManageEmployeeAndCoefficientTypes() {
  return (
    <div className='container row'>
      <Link href="/manage/employee-types">
        <a className='show-box-link'>
          <div title="Employee types">
            Employee types
          </div>
        </a>
      </Link>
      <Link href="/manage/coefficient-types">
        <a className='show-box-link'>
          <div title="Coefficient types">
            Coefficient types
          </div>
        </a>
      </Link>
      <Link href="/link-coefficient-employeetype?pcid=0">
        <a className='show-box-link'>
          <div title="Link coefficients to pc">
            Link coefficients to pc
          </div>
        </a>
      </Link>
    </div>
  );
}

export default ManageEmployeeAndCoefficientTypes;

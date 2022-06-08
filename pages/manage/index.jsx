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
    </div>
  );
}

export default ManageEmployeeAndCoefficientTypes;

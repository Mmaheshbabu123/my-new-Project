import TileIcon from '@/components/tileIcon/tileIcon';
import { tileJson } from '@/components/tileIcon/tileJson';
import { useRouter } from 'next/router';
function ManageEmployeeAndCoefficientTypes() {
  const router = useRouter();
  return (
    <>
    <div className='container-fluid row p-0 m-0 position-relative'>
      <div className='col-md-12 px-0 position-sticky-pc'>
      <h4 className='py-4 font-weight-bold  bitter-italic-normal-medium-24 px-0'>Configurations and settings</h4>
      </div>
      {tileJson.map(tile => <TileIcon key={tile.id} props = {tile} /> )}
    </div>
    <div className="row my-2">
     <div className="text-start col-md-6">
        <button
          type="button"
          className="bg-white border-0 poppins-regular-18px  float-sm-right mt-3 md-5 px-0 text-decoration-underline text-uppercase"
          onClick={() => router.push('/')}
        >
          {('BACK')}
        </button>
      </div>
      </div>
    </>
  );
}

export default ManageEmployeeAndCoefficientTypes;

import TileIcon from '@/components/tileIcon/tileIcon';
import { tileJson } from '@/components/tileIcon/tileJson';
import Link from 'next/link';
function ManageEmployeeAndCoefficientTypes() {
  return (
    <>
    <div className='container-fluid row p-0 m-0' styles={{ position: 'relative'}}>
    <h4 className='mt-3 font-weight-bold  bitter-italic-normal-medium-24 px-0'>Configurations and settings</h4>

      {tileJson.map(tile => <TileIcon key={tile.id} props = {tile} /> )}

    </div>
    </>
  );
}

export default ManageEmployeeAndCoefficientTypes;

import TileIcon from '@/components/tileIcon/tileIcon';
import { tileJson } from '@/components/tileIcon/tileJson';
import Link from 'next/link';
function ManageEmployeeAndCoefficientTypes() {
  return (
    <>
    <div className='container row' styles={{ position: 'relative'}}>
    <h4>Manage configurations and settings</h4>

      {tileJson.map(tile => <TileIcon key={tile.id} props = {tile} /> )}

    </div>
    </>
  );
}

export default ManageEmployeeAndCoefficientTypes;

import TileIcon from '@/components/tileIcon/tileIcon';
import { tileJson } from '@/components/tileIcon/tileJson';

function ManageEmployeeAndCoefficientTypes() {
  return (
    <>
    <div className='container row'>
    <h4>Manage configurations and settings</h4>
      {tileJson.map(tile => <TileIcon  props = {tile} /> )}
    </div>
    </>
  );
}

export default ManageEmployeeAndCoefficientTypes;

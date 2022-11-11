import React, { useState, useEffect } from 'react';
import { dashboardTileCount } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';

const countBadgeTiles = [`My todo's`, 'Cooperation agreement', 'Co-operation agreement'];

const TileCountComponent = ( {
	tile: { menu_title },
	role,
	roleType,
	uid,
 }) => {

   const [state, setState] = useState({ count: 0,  isLoading: true })

   useEffect(() => {
     const dataLoad = async () => {
         await APICALL.service(dashboardTileCount, 'POST', {
           role,
           roleType,
           uid,
           menu_title
         }).then(result => setState({ count: result.data, isLoading: false }))
     }
     if(countBadgeTiles.includes(menu_title))
         dataLoad();
   }, [])


	 if(countBadgeTiles.includes(menu_title)) {
		return <span className={`todo-count-badge todo-count-badge-${role}`}> { state.isLoading ? 0 : state.count || 0 } </span>
	 } else {
		 return <> </>
   }
}

export default React.memo(TileCountComponent);

import React from 'react'
import { useRouter } from 'next/router';

const ImagePreview = () => {
	const router = useRouter();
	let { url = '' } = router.query;
	url = url ? url.replaceAll('@', '/') : url;
        
	return (
		<div className="text-center mt-5">
 	            <img src={url} />
		</div>
	)
}

export default ImagePreview;

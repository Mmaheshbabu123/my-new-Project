import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';


const Qrscan = () => {

	const [result, setResult] = useState('No result 123');

	const handleError = (err) => {
		console.err(err)
	}

	const handleScan = (result) => {
		if(result){
			setResult(result)
		}
	}

	const previewStyle = {
		height: 240,
		width: 320,
	}

	return (
		<div className="container">
			<QrReader
			delay={500}
			style={previewStyle}
			onError={handleError}
			onScan={handleScan}
			/>
			<div className="">{result}</div>		
		</div>
	);
}

export default Qrscan;
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';


const Qrscan = () => {

	const [result, setResult] = useState('Please scan the qr code');
	const [decode,setDecode]  =useState();

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
            onResult={(result, error) => {
                if (!!result) {
                  setResult(result?.text);
				  var decodede=JSON.parse(result.text)
				  setDecode(decodede);
                }
      
                if (!!error) {
                  console.info(error);
                }
              }}
            constraints = {{
                facingMode: { exact: "environment" }
              }}
			/>
			<div className="">{result}</div>
			<div> {console.log(decode)}</div>		
		</div>
	);
}

export default Qrscan;
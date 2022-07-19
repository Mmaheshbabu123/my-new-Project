export default function isValidUrl (urlString) {
  	var a  = document.createElement('a');
   	a.href = urlString;
   	return (a.host && a.host != window.location.host);
  }

import RedirectPages from '../components/RedirectPages';
import router from 'next/router'
import { useRouter } from "next/router";
import { Uniquekey } from '../Services/GenetateUniqueKey';


const Redirectpage = () => {
    const { query } = useRouter();
	if(query.hasOwnProperty('uid')){
		localStorage.setItem("uid",query.uid);
	}
	return (
       
		<div>
			{query.hasOwnProperty('dest') && <RedirectPages dest={query.dest} src={query.src} type={query.hasOwnProperty('type')?query.type:''} />}
		</div>
	);
};

export default Redirectpage;

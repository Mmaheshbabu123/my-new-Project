import RedirectPages from '../components/RedirectPages';
import router from 'next/router'
import { useRouter } from "next/router";
import { Uniquekey } from '../Services/GenetateUniqueKey';


const Redirectpage = () => {
    const { query } = useRouter();
	return (
       
		<div>
			{console.log(query)}
			{query.hasOwnProperty('dest') && query.hasOwnProperty('src') && <RedirectPages dest={query.dest} src={query.src} type={query.hasOwnProperty('type')?query.type:''} />}
		</div>
	);
};

export default Redirectpage;

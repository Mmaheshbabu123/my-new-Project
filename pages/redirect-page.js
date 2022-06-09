import RedirectPages from '../components/RedirectPages';
import router from 'next/router'
import { useRouter } from "next/router";
import { Uniquekey } from '../Services/GenetateUniqueKey';

// console.log(router.query)

const Redirectpage = () => {
    const { query } = useRouter();
	return (
       
		<div>
			test {console.log(query)}
			{query.hasOwnProperty('dest') && query.hasOwnProperty('src') && <RedirectPages dest={query.dest} src={query.src} />}
		</div>
	);
};

export default Redirectpage;

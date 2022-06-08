import RedirectPages from '../components/RedirectPages';
import router from 'next/router'
import { useRouter } from "next/router";
import { Uniquekey } from '../Services/GenetateUniqueKey';

// console.log(router.query)

const Redirectpage = () => {
    const { query } = useRouter();
	return (
       
		<div>
			{query.hasOwnProperty('destination') && <RedirectPages dest={query.destination} />}
		</div>
	);
};

export default Redirectpage;

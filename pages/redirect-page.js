import RedirectPages from '../components/RedirectPages';
import { useRouter } from "next/router";

const Redirectpage = () => {
    const { query } = useRouter();

	if (query.hasOwnProperty('uid')) {
		localStorage.setItem('uid', JSON.stringify(query.uid));
	}
	return (
		<div>
			{console.log(query)}
			{query.hasOwnProperty('dest') && <RedirectPages dest={query.dest} src={query.src} type={query.hasOwnProperty('type')?query.type:''} />}
		</div>
	);
};

export default Redirectpage;

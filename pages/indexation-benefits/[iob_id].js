import IndexationBenifits from "../../components/Indexation/IndexationBenifits";
import { useRouter } from 'next/router';


const indexationbenifits = () => {
    const router = useRouter();

    return(
        <div>
        <IndexationBenifits id={router.query.iob_id} />
    </div>
    );
   
}
export default indexationbenifits;
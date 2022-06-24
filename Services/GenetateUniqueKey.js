import { v5 as uuidv5 } from 'uuid';


function generate_unique_key(){

    const MY_NAMESPACE = 'c171cc17-10ff-41ad-8da5-b84e1c0f9647';
    const name = 'Absoluteyou'+ new Date().toLocaleString();
    return uuidv5(name, MY_NAMESPACE);

}

export const Uniquekey = {
    generate_unique_key

};
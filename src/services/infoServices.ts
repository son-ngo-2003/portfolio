import { Info } from '@src/types/info';
import { getDocs } from "firebase/firestore"; 
import { dbCollection } from '@src/utils/db';

const getInfo =  async () : Promise<Info> => {
    const snapshots = await getDocs( dbCollection.info );
    return snapshots.docs[0].data();
}

export {
    getInfo,
}
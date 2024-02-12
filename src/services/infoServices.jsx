import { db } from '/src/config/firebase';
import { collection, getDocs } from "firebase/firestore"; 

const getInfo =  async () => {
    try {
        const col = collection(db, "info");
        const snapshots = await getDocs( col );
        let info;
        snapshots.forEach( (snap) => {
            info = snap.data();
            return;
        })
        return info;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export {
    getInfo,
}
import { db } from '/src/config/firebase';
import { collection, getDocs } from "firebase/firestore"; 

const getTest =  async () => {
    try {
        const col = collection(db, "test");
        const snapshot = await getDocs( col );
        snapshot.forEach(doc => {
            console.log(doc.id, doc.data());
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export {
    getTest
}
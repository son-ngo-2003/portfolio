import { db } from '/src/config/firebase';
import { collection, getDocs, getDoc, 
         addDoc, setDoc,
         query, where, doc, orderBy } from "firebase/firestore"; 

const getAllBlogs =  async () => {
    try {
        const blogs = [];
        const q = query(collection(db, "blogs"), 
                        where("deleted", "==", false), 
                        orderBy("priority"));
        const snapshots = await getDocs( q );
        snapshots.forEach( (snap) => {
            blogs.push({...snap.data(), id: snap.id});
        })
        return blogs;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}

const getBlogByName = async (name) => {
    try {
        const q = query(collection(db, "blogs"), 
                                    where("name", "==", name), 
                                    where("deleted", "==", false),
                                    orderBy("priority"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return {...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id};
        }
        console.log("No such blog!");
        return null;

    } catch (e) {
        console.error("Error getting document: ", e);
        return null;
    }
}

const getBlogById = async (id) => {
    try {
        const docRef = doc(db, "blogs", id);
        const q = query(docRef);
        const docSnap = await getDoc(q);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.deleted) {
                return {...data, id: id};
            }
        }
        console.log("No such document!");
        return null;

    } catch (e) {
        console.error("Error getting document: ", e);
        return null;
    }
}

const getBlogsByType = async (type) => {
    try {
        const projects = [];
        const col = collection(db, "blogs");
        const q = query(col, 
                        where("type", "==", type), 
                        where("deleted", "==", false),
                        orderBy("priority"));
        const snapshots = await getDocs(q);
        snapshots.forEach((snap) => {
            projects.push({...snap.data(), id: snap.id});
        });
        return projects;
    } catch (e) {
        console.error(`Error retrieving blogs de type ${type}: `, e);
        return null;
    }
}

const addBlog = async (blogData) => {
    try {
        const col = collection(db, "blogs");
        const docRef = await addDoc(col, {...blogData, deleted: false});
        alert(`Blog added with ID: ${docRef.id}` );
        return docRef.id;
    } catch (e) {
        console.error("Error adding blog: ", e);
        return null;
    }
}

const updateBlogById = async (id, updatedData) => {
    try {
        console.log(id, updatedData);
        const docRef = doc(db, "blogs", id);
        await setDoc(docRef, updatedData, { merge: true });
        alert(`Blog updated with ID: ${docRef.id}` );
        return true;
    } catch (e) {
        console.error("Error updating blog: ", e);
        return false;
    }
}

const deleteBlogById = async (id) => {
    try {
        const docRef = doc(db, "blogs", id);
        await setDoc(docRef, {deleted: true}, { merge: true });
        console.log("Blog deleted successfully!");
        return true;
    } catch (e) {
        console.error("Error deleting blog: ", e);
        return false;
    }
}



export {
    getAllBlogs,
    getBlogByName,
    getBlogById,
    getBlogsByType,
    addBlog,
    updateBlogById,
    deleteBlogById
}
import { db } from '/src/config/firebase';
import { collection, getDocs, getDoc, 
         addDoc,
         query, where, doc } from "firebase/firestore"; 

const getAllBlogs =  async () => {
    try {
        const blogs = [];
        const col = collection(db, "blogs");
        const snapshots = await getDocs( col );
        snapshots.forEach( (snap) => {
            blogs.push(snap.data());
        })
        return blogs;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}

const getBlogByName = async (name) => {
    try {
        const q = query(collection(db, "blogs"), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
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
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
            return docSnap.data();
        }
        console.log("No such document!");
        return null;

    } catch (e) {
        console.error("Error getting document: ", e);
        return null;
    }
}

const getAllProjects = async () => {
    try {
        const projects = [];
        const col = collection(db, "blogs");
        const q = query(col, where("type", "==", "project"));
        const snapshots = await getDocs(q);
        snapshots.forEach((snap) => {
            projects.push({...snap.data(), id: snap.id});
        });
        return projects;
    } catch (e) {
        console.error("Error retrieving projects: ", e);
        return null;
    }
}

const addBlog = async (blogData) => {
    try {
        const col = collection(db, "blogs");
        const docRef = await addDoc(col, blogData);
        alert("Blog added with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding blog: ", e);
        return null;
    }
}


export {
    getAllBlogs,
    getBlogByName,
    getBlogById,
    getAllProjects,
    addBlog
}
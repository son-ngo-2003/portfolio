import { 
    getDocs, getDoc, 
    addDoc, setDoc,
    query, where, doc, orderBy, 
} from "firebase/firestore";

import { getRandomInt, getRandomString, getRandomText } from '@src/utils/randomUtils';
import { dbCollection } from '@src/utils/db';
import { Blog, BlogType } from "@src/types/blog";
import { Language } from "@src/types/languages";

/**
 * Get all blogs from the database
 * @returns Promise with array of blogs
 */
const getAllBlogs = async (): Promise<Blog[]> => {
    const blogs: Blog[] = [];
    const q = query(
        dbCollection.blog,
        where("deleted", "==", false), 
        orderBy("priority")
    );
    const snapshots = await getDocs(q);
    snapshots.forEach((snap) => {
        blogs.push({...snap.data() as Blog});
    });

    return blogs;
}

/**
 * Get a blog by its name
 * @param name - The name of the blog to retrieve
 * @returns Promise with the blog data or null if not found
 */
const getBlogByName = async (name: string): Promise<Blog | null> => {
    const q = query(
        dbCollection.blog,
        where("name", "==", name), 
        where("deleted", "==", false),
        orderBy("priority")
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return {...querySnapshot.docs[0].data() as Blog};
    }
    console.log("No such blog!");
    return null;
}

/**
 * Get a blog by its ID
 * @param id - The ID of the blog to retrieve
 * @returns Promise with the blog data or null if not found
 */
const getBlogById = async (id: string): Promise<Blog | null> => {
    const docRef = doc(dbCollection.blog, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const data = docSnap.data();
        if (!data.deleted) {
            return {...data as Blog, id: id};
        }
    }

    return null;
}

/**
 * Get all blogs of a specific type
 * @param type - The type of blogs to retrieve
 * @returns Promise with array of blogs or null if error
 */
const getBlogsByType = async (type: BlogType): Promise<Blog[]> => {
    const blogs: Blog[] = [];
    const q = query(
        dbCollection.blog, 
        where("type", "==", type), 
        where("deleted", "==", false),
        orderBy("priority")
    );
    
    const snapshots = await getDocs(q);
    snapshots.forEach((snap) => {
        blogs.push({...snap.data()});
    });
    
    return blogs;
}

/**
 * Add a new blog to the database
 * @param user - The user adding the blog
 * @param blogData - The blog data to add
 * @returns Promise with the new blog ID or null if error
 */
const addBlog = async (user: any, blogData: Partial<Blog>): Promise<Blog | null> => {
    if (!user) {
        throw new Error("Error adding blog: user is not logged in");
    }
    
    delete blogData.id;
    const docRef = await addDoc(dbCollection.blog, blogData);
    return await getBlogById(docRef.id);
}

/**
 * Update a blog by its ID
 * @param user - The user updating the blog
 * @param id - The ID of the blog to update
 * @param updatedData - The data to update
 * @returns Promise with success boolean
 */
const updateBlogById = async (
    user: any, 
    id: string, 
    updatedData: Partial<Blog>
): Promise<Blog | null> => {
    if (!user) {
        throw new Error("Error updating blog: user is not logged in");
    }

    // Check if the blog exists
    const blog = await getBlogById(id);
    if (!blog) {
        throw new Error(`Error updating blog: blog with ID ${id} does not exist`);
    }

    const docRef = doc(dbCollection.blog, id);
    await setDoc(docRef, {...blog, ...updatedData}, { merge: true });
    return await getBlogById(id);

}

/**
 * Delete a blog by its ID (soft delete)
 * @param user - The user deleting the blog
 * @param id - The ID of the blog to delete
 * @returns Promise with success boolean
 */
const deleteBlogById = async (user: any, id: string): Promise<void> => {
    if (!user) {
        throw new Error("Error deleting blog: user is not logged in");
    }

    // Check if the blog exists
    const blog = await getBlogById(id);
    if (!blog) {
        throw new Error(`Error deleting blog: blog with ID ${id} does not exist`);
    }

    // Soft delete the blog
    const docRef = doc(dbCollection.blog, id);
    await setDoc(docRef, {...blog, deleted: true}, { merge: true });
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
import { fs } from '@src/config/firebase';
import { Blog, isInstanceofBlog } from '@src/types/blog';
import { Info, isInstanceofInfo } from '@src/types/info';
import { DocumentData, FirestoreDataConverter, type QueryDocumentSnapshot, collection, serverTimestamp } from "firebase/firestore"

type EntityType = Blog | Info;

const converter = <T extends EntityType>(): FirestoreDataConverter<T> => ({
    toFirestore: (data: T) => convert2Entity(data),
    fromFirestore: (snap: QueryDocumentSnapshot) => convert2Object(snap) as T
})

const dataPoint = <T extends EntityType>(collectionPath: string) =>
    collection(fs, collectionPath).withConverter(converter<T>())

export const dbCollection = {
    blog: dataPoint<Blog>('blogs'),
    info: dataPoint<Info>('info'),
}

function convert2Entity(data: EntityType) : DocumentData {
    if (isInstanceofBlog(data)) {
        const _data = data as Blog;
        return {
            ..._data,
            deleted: _data.deleted || false,
            createdAt: _data.createdAt || new Date(),
            updatedAt: _data.updatedAt,
        } as DocumentData;
    }

    if (isInstanceofInfo(data)) {
        const _data = data as Info;
        return {
            ..._data,
        } as DocumentData;
    }

    throw new Error('Invalid data type');
}

function convert2Object(snap: QueryDocumentSnapshot): EntityType {
    const data = snap.data();

    if (isInstanceofBlog(data)) {
        return {
            ...data,
            deleted: data.deleted || false,
            createdAt: data.createdAt.toDate() || new Date(),
            updatedAt: data.updatedAt,
        } as Blog;
    }

    if (isInstanceofInfo(data)) {
        return {
            ...data,
        } as Info;
    }

    const jsonString = JSON.stringify(data);
    const file = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = `${data.id}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();

    console.log("Error: Invalid data type", data);

    // throw new Error('Invalid data type');
}
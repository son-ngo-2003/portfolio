import { fs } from '@src/config/firebase';
import { AssociationBlog, Blog, BlogType, isInstanceofBlog, ProjectBlog } from '@src/types/blog';
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
            createdAt: _data.createdAt || serverTimestamp(),
            updatedAt: _data.createdAt ? serverTimestamp() : null,
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
        const id = snap.id;
        const blog = {
            ...data,
            id,
            deleted: data.deleted || false,
            createdAt: firebaseTimestampToDate(data.createdAt),
            updatedAt: firebaseTimestampToDate(data.updatedAt),
        } as Blog;

        if ( [BlogType.Project, BlogType.Association].includes(blog.type) ) {
            const _blog = blog as (ProjectBlog | AssociationBlog);
            _blog.startDate = firebaseTimestampToDate(_blog.startDate)!;
            _blog.endDate = firebaseTimestampToDate(_blog.endDate);
            return _blog;
        }

        return blog;
    }

    if (isInstanceofInfo(data)) {
        return {
            ...data,
        } as Info;
    }

    throw new Error('Invalid data type');
}

function firebaseTimestampToDate( ts: any ) {
    if (!ts) return null;
    return new Date(ts.seconds * 1000 + ts.nanoseconds / 1000000);
}
import React from 'react';
import { Blog, BlogType } from '@src/types/blog';
import { Language } from '@src/types/languages';
import { Table, Button } from '@src/components';
import styles from './blogTable.module.scss';
import { ButtonColor } from '@src/components/ui/button/button';
import { FaImage } from "react-icons/fa";

interface BlogTableProps {
    blogs: Blog[];
    onUpdateBlog: (blog: Blog) => void;
    onDeleteBlog: (id: string) => void;
}

const BlogTable: React.FC<BlogTableProps> = ({ 
    blogs, 
    onUpdateBlog, 
    onDeleteBlog 
}) => {
    const contentShowInTable: string[] = ['#', 'Type', 'Name', 'Created', 'Actions'];

    // Get blog type badge color
    const getBlogTypeColor = (type: BlogType): string => {
        switch (type) {
            case BlogType.Project:
                return styles.projectBadge;
            case BlogType.Association:
                return styles.associationBadge;
            case BlogType.Art:
                return styles.artBadge;
            case BlogType.Sport:
                return styles.sportBadge;
            default:
                return '';
        }
    };

    // Format date for display
    const formatDate = (date: Date | undefined): string => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTableCell = (header: string, blog: Blog, index: number): JSX.Element => {
        switch (header) {
            case '#':
                return <span className='text'>{blog.priority}</span>;
                
            case 'Type':
                return (
                    <div className={styles.typeBadge}>
                        <span className={`${styles.badge} ${getBlogTypeColor(blog.type)}`}>
                            {blog.type.charAt(0).toUpperCase() + blog.type.slice(1)}
                        </span>
                    </div>
                );
                
            case 'Name':
                // Get title in any available language
                const title = blog.title[Language.EN] || Object.values(blog.title)[0] || 'Untitled';
                console.log('Image:', blog.image);
                return (
                    <div className={styles.blogInfo}>
                        <p className={`text ${styles.blogTitle}`}>{title}</p>
                        {blog.image && (
                            <a className={styles.hasImage} title="Has image" href={blog.image} target="_blank" rel="noopener noreferrer">
                                <FaImage />
                            </a>
                        )}
                    </div>
                );
                
            case 'Created':
                return <span className='text'>{formatDate(blog.createdAt)}</span>;
                
            case 'Actions':
                return (
                    <div className={styles.actions}>
                        <Button 
                            size="small" 
                            text="View" 
                            className={styles.viewButton}
                            onClick={() => window.open(`/blog?id=${blog.id}`, '_blank')} 
                        />
                        <Button 
                            size="small" 
                            text="Edit" 
                            className={styles.editButton}
                            onClick={() => onUpdateBlog(blog)} 
                            color = { ButtonColor.YELLOW }
                        />
                        <Button 
                            size="small" 
                            text="Delete" 
                            className={styles.deleteButton}
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this blog?')) {
                                    onDeleteBlog(blog.id);
                                }
                            }} 
                            color = { ButtonColor.RED }
                        />
                    </div>
                );
                
            default:
                return <span className='text'>{(blog as any)[header] || 'N/A'}</span>;
        }
    };

    const getListData = (blogs: Blog[]): JSX.Element[][] => {
        return blogs?.map((blog, index) =>
            contentShowInTable.map((header) => getTableCell(header, blog, index))
        ) || [];
    };

    return (
        <div className={styles.tableBlogs}>
            <div className={styles.tableHeader}>
                <h2 className={`${styles.title} sub-title`}>Current Blogs</h2>
                <span className={`text ${styles.blogCount}`}>
                    {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}
                </span>
            </div>
            
            {blogs.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className="text">No blogs found. Create your first blog below.</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <Table
                        listData={getListData(blogs)}
                        tableHeaders={contentShowInTable}
                        divClassName={styles.table}
                    />
                </div>
            )}
        </div>
    );
};

export default BlogTable;
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '@src/config/firebase';
import { User } from 'firebase/auth';

// types
import { Blog, BlogType, ProjectBlog, AssociationBlog, ArtBlog, SportBlog } from '@src/types/blog';
import { Language } from '@src/types/languages';

// services
import {
    getAllBlogs,
    addBlog, updateBlogById, deleteBlogById
} from '@src/services/blogServices';

// components
import { Button, Dropdown } from "@src/components";
import { InfoLoginBar, ContentEditor, BlogTable } from "./components";

// styles
import styles from "./blogAdmin.module.scss";
import { ButtonColor } from '@src/components/ui/button/button';
import { getRandomBlogs } from '@src/utils/blogUtils';

interface FormDataType {
    id: string;
    type: BlogType;
    image: string;
    priority: number;
    role: string;
    startDate: string;
    endDate: string;
    title: Record<Language, string>;
    content: Record<Language, string>;
    // Thêm các trường mới nếu cần cho Art và Sport
}

const BlogAdmin: React.FC = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [currentAction, setCurrentAction] = useState<'Add' | 'Update'>('Add');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<FormDataType>({
        id: '',
        type: BlogType.Project,
        image: '',
        priority: 0,
        role: '',
        startDate: '',
        endDate: '',
        title: {} as Record<Language, string>,
        content: {} as Record<Language, string>,
    });

    const handleUpdateButton = (blog: Blog): void => {
        setCurrentAction("Update");
        
        // Convert dates to string format for form inputs
        const isProjectOrAssoc = 
            blog.type === BlogType.Project || 
            blog.type === BlogType.Association;

        const startDate = isProjectOrAssoc && (blog as ProjectBlog | AssociationBlog).startDate 
            ? new Date((blog as ProjectBlog | AssociationBlog).startDate).toISOString().split('T')[0] 
            : '';
            
        const endDate = isProjectOrAssoc && (blog as ProjectBlog | AssociationBlog).endDate 
            ? new Date((blog as ProjectBlog | AssociationBlog).endDate!).toISOString().split('T')[0] 
            : '';
        
        setFormData({
            id: blog.id,
            type: blog.type,
            image: blog.image || '',
            priority: blog.priority,
            role: isProjectOrAssoc ? (blog as ProjectBlog | AssociationBlog).role || '' : '',
            startDate,
            endDate,
            title: blog.title || {},
            content: blog.content || {},
        });

        // Scroll to form
        formRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'priority' ? Number(value) : value
        }));
    };

    const handleContentChange = (content: Record<Language, string>): void => {
        setFormData(prev => ({...prev, content }));
    };

    const handleTitleChange = (title: Record<Language, string>): void => {
        setFormData(prev => ({...prev, title }));
    };

    const handleTypeChange = (type: BlogType): void => {
        setFormData(prev => ({
            ...prev,
            type
        }));
    };

    const resetForm = (): void => {
        setFormData({
            id: '',
            type: BlogType.Project,
            image: '',
            priority: 0,
            role: '',
            startDate: '',
            endDate: '',
            title: {} as Record<Language, string>,
            content: {} as Record<Language, string>,
        });
        setCurrentAction('Add');
    };

    const validateForm = (): boolean => {
        // Check if at least one language has content and title
        const hasContent = Object.values(formData.content).some(content => content.trim() !== '');
        const hasTitle = Object.values(formData.title).some(title => title.trim() !== '');
        
        if (!hasContent || !hasTitle) {
            alert('Please add at least one title and content in any language');
            return false;
        }
        
        // Validate role and dates for Project and Association types
        if (formData.type === BlogType.Project || formData.type === BlogType.Association) {
            if (!formData.role.trim()) {
                alert('Role is required for Project and Association blog types');
                return false;
            }
            
            if (!formData.startDate) {
                alert('Start date is required for Project and Association blog types');
                return false;
            }
        }
        
        return true;
    };

    const prepareBlogData = (): Blog => {
        // Create base blog object with common fields for all blog types
        const baseBlog: Partial<Blog> = {
            id: formData.id,
            type: formData.type,
            image: formData.image || null,
            priority: formData.priority,
            title: formData.title,
            content: formData.content,
        };

        // Add type-specific fields based on blog type
        switch (formData.type) {
            case BlogType.Project:
                return {
                    ...baseBlog,
                    type: BlogType.Project,
                    role: formData.role,
                    startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
                    endDate: formData.endDate ? new Date(formData.endDate) : null,
                } as ProjectBlog;
                
            case BlogType.Association:
                return {
                    ...baseBlog,
                    type: BlogType.Association,
                    role: formData.role,
                    startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
                    endDate: formData.endDate ? new Date(formData.endDate) : null,
                } as AssociationBlog;
                
            case BlogType.Art:
                return {
                    ...baseBlog,
                    type: BlogType.Art,
                } as ArtBlog;
                
            case BlogType.Sport:
                return {
                    ...baseBlog,
                    type: BlogType.Sport,
                } as SportBlog;
                
            default:
                return baseBlog as Blog;
        }
    };

    const addNewBlog = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const newBlog = prepareBlogData();
        
        if (user) {
            try {
                const _newBlog = await addBlog(user, newBlog);
                if (!_newBlog) {
                    alert('Failed to add blog. Please try again.');
                    return;
                }

                setBlogs(prev => [...prev, _newBlog]);
                resetForm();
                alert('Blog added successfully!');
            } catch (error) {
                alert('Failed to add blog. Error adding blog: ' + error);
            }

        } else {
            newBlog.id = '-1';
            setBlogs(prev => [...prev, newBlog]);
            resetForm();
            alert('Simulation: Blog added successfully!');
        }
    };

    const updateBlog = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const updatedBlog = prepareBlogData();
        
        if (user) {
            try {
                const _updatedBlog = await updateBlogById(user, updatedBlog.id, updatedBlog);
                if (!_updatedBlog) {
                    alert('Failed to update blog. Please try again.');
                    return;
                }

                // Update the blog in the state
                setBlogs(prev => prev.map(blog => 
                    blog.id === updatedBlog.id ? _updatedBlog : blog
                ));

                resetForm();
                alert('Blog updated successfully!');

            } catch (error) {
                alert('Failed to update blog. Error updating blog: ' + error);
            }
            
        } else {
            const existingBlog = blogs.find(blog => blog.id === updatedBlog.id);
            if (existingBlog) {
                const updatedBlogs = blogs.map(blog => 
                    blog.id === updatedBlog.id ? { ...blog, ...updatedBlog } : blog
                );
                setBlogs(updatedBlogs);
            }
            resetForm();
            alert('Simulation: Blog updated successfully!');
        }
    };

    const deleteBlog = async (id: string): Promise<void> => {
        if (user) {
            await deleteBlogById(user, id);
            setBlogs(prev => prev.filter(blog => blog.id !== id));
        } else {
            // Simulate deletion in the UI
            setBlogs(prev => prev.filter(blog => blog.id !== id));
            alert('Simulation: Blog deleted successfully!');
        }
    };

    useEffect(() => {
        // Handle authentication
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            currentUser && getAllBlogs()
                .then((blogList) => {
                    setBlogs(blogList);
                });
            
            if (!currentUser) {
                alert('This is just a simulation. You can try functionalities like adding, updating, and deleting blogs without being logged in.');
                const randomBlogs = getRandomBlogs(6);
                setBlogs(randomBlogs);
            }
        });

        return () => unsubscribe();
    }, []);

    // Type dropdown items
    const typeDropdownItems = Object.values(BlogType).map(type => ({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        onClick: () => handleTypeChange(type)
    }));

    // Render specific form fields based on blog type
    const renderTypeSpecificFields = () => {
        switch (formData.type) {
            case BlogType.Project:
            case BlogType.Association:
                return (
                    <>
                        <div className={styles.formGroup}>
                            <label htmlFor="role" className={`text`}>Role</label>
                            <input 
                                type="text" 
                                name="role" 
                                id="role" className={`text`}
                                value={formData.role} 
                                onChange={handleInputChange}
                                placeholder="Developer, Designer, etc."
                                required
                            />
                        </div>
                        
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="startDate" className={`text`}>Start Date</label>
                                <input 
                                    type="date" 
                                    name="startDate" 
                                    id="startDate" className={`text`}
                                    value={formData.startDate} 
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="endDate" className={`text`}>End Date (empty for ongoing)</label>
                                <input 
                                    type="date" 
                                    name="endDate" 
                                    id="endDate" className={`text`}
                                    value={formData.endDate} 
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </>
                );
            case BlogType.Art:
                return (
                    <div className={styles.formGroup}>
                        <label htmlFor="image" className={`text`}>Blog Image URL</label>
                        <input 
                            type="url" 
                            name="image" 
                            id="image" className={`text`}
                            value={formData.image} 
                            onChange={handleInputChange}
                            placeholder="https://example.com/artwork.jpg"
                        />
                    </div>
                );
            case BlogType.Sport:
                return null; // No additional fields for Sport blogs at this time
            default:
                return null;
        }
    };

    return (
        <div className={`row section`}>
            <div className={`${styles.header} col l-12 m-12 c-12`}>
                <InfoLoginBar user={user} />
            </div>

            <div className={`${styles.container} col l-12 m-12 c-12`}>
                <BlogTable 
                    blogs={blogs}
                    onUpdateBlog={handleUpdateButton}
                    onDeleteBlog={deleteBlog}
                />

                <div className={`${styles.form}`} ref={formRef}>
                    <h1 className={`${styles.title} sub-title`}>
                        {currentAction === "Add" ? "Add a new blog" : "Update a blog"}
                    </h1>
                    
                    <form onSubmit={currentAction === "Add" ? addNewBlog : updateBlog} className={styles.blogForm}>
                        {/* Hidden ID field for updates */}
                        <input type="hidden" name="id" value={formData.id} />
                        
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="type" className={`text`}>Blog Type</label>
                                <Dropdown 
                                    label={formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
                                    items={typeDropdownItems}
                                    className={styles.typeDropdown}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="priority" className={`text`}>Priority</label>
                                <input 
                                    type="number" 
                                    name="priority" 
                                    id="priority" className={`text`}
                                    value={formData.priority} 
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Only show the common image field if NOT an Art blog (since Art blogs have a special image field) */}
                        {formData.type !== BlogType.Art && (
                            <div className={styles.formGroup}>
                                <label htmlFor="image" className={`text`}>Image URL</label>
                                <input 
                                    type="text" 
                                    name="image" 
                                    id="image"
                                    className={`text`}
                                    value={formData.image} 
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        )}
                        
                        {/* Render type-specific fields */}
                        {renderTypeSpecificFields()}
                        
                        <div className={styles.contentSection}>
                            <h3 className={`text`}>Content and Titles</h3>
                            <ContentEditor 
                                content={formData.content}
                                title={formData.title}
                                onChangeContent={handleContentChange}
                                onChangeTitle={handleTitleChange}
                            />
                        </div>
                        
                        <div className={styles.formActions}>
                            <Button
                                size="medium"
                                text={`${currentAction} Blog`}
                                isUsedSubmit={true}
                            />
                            
                            <Button
                                size="medium"
                                text={ currentAction === "Update" ? "Cancel" : "Reset" }
                                onClick={() => resetForm()}
                                color={ButtonColor.RED}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogAdmin;
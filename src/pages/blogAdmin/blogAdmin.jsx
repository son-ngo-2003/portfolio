import { useEffect, useRef, useState } from 'react';

// services
import { getAllBlogs , getBlogById, 
         addBlog, updateBlogById, deleteBlogById 
} from '/src/services/blogServices'

//utils
import { textToBlogModel, blogModelToText } from '../../utils/blogUtils';

//css
import styles from "./blogAdmin.module.scss"

//components
import { Form, Table, Button } from "/src/components"

const BlogAdmin = () => {
    const formRef = useRef(null);
    const [currentAction, setCurrentAction] = useState('Add')
    const [blogs, setBlogs] = useState([]);
    const contentShowInTable = ['#', 'Type', 'Name', 'Image', 'Blog', 'Update', 'Delete']; //3 lasts are "see blog", "update", "delete" buttons

    const listInput = {
        id:                 {type: 'text', placeholder: '', required: false, hide: true},
        type:               {type: 'text', placeholder: 'type (*)', required: true},
        name:               {type: 'text', placeholder: 'name (*)', required: true}, 
        priority:           {type: 'number', placeholder: 'priority (*)', required: true}, 
        writenDate:         {type: 'text', placeholder: 'writenDate (*)', required: true}, 
        role:               {type: 'text', placeholder: 'role (for project)', required: false}, //for project
        date:               {type: 'text', placeholder: 'date (for project)', required: false}, //for project
        image:              {type: 'text', placeholder: 'image (for project)', required: false}, //for project
        content_en:         {type: 'textarea', placeholder: 'content in english', required: false, size:"enor"},
        content_fr:         {type: 'textarea', placeholder: 'content in french', required: false, size:"enor"},
        content_vn:         {type: 'textarea', placeholder: 'content in vietnamese', required: false, size:"enor"},
    }

    const getTableCell = (header, value, index) => {
        switch (header) {
            case 'Image':
                return (
                    value.image 
                    ? <a className='text' href={value.image} target='_blank'>See image</a>
                    : <p className='text'>Not available</p>
                )
            case 'Blog':
                return <a className='text' href={`/blog?id=${value.id}`} target='_blank'>
                            <Button size="small" text={"See blog"} fill={true}/>
                        </a>
            case 'Update':
                return  <Button size="small" text={"Update"} fill={true}
                                onClick={() => handleUpdateButton(value)}/>
            case 'Delete':
                return <Button size="small" text={"Delete"} fill={true}
                                onClick={()=>{deleteBlog(value.id)}}/>
            case '#':
                return <p className='text'>{value.priority}</p>
            case 'Type':
                return <p className='text'>{value.type}</p>
            case 'Writen Date':
                return <p className='text'>{value.writenDate}</p>
            case 'Name':
                return <p className='text'>{value.name}</p>
            default:
                return <p className='text'>{value[header]}</p>
        }
    }

    const handleUpdateButton = (value) => {
        setCurrentAction("Update"); 
        setFormValue(value); 
        formRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
        });
    }

    const getListData = (blogs) => {
        const ld = blogs?.map( (blog, index) => 
            contentShowInTable.map( (header) => getTableCell(header, blog, index) )
        )
        return ld;
    }

    const setFormValue = (blog) => {
        const form = formRef.current;
        form.querySelector('#id').value = blog.id;
        form.querySelector('#name').value = blog.name;
        form.querySelector('#priority').value = blog.priority;
        form.querySelector('#role').value = blog.role;
        form.querySelector('#date').value = blog.date;
        form.querySelector('#type').value = blog.type;
        form.querySelector('#image').value = blog.image;
        form.querySelector('#writenDate').value = blog.writenDate;
        form.querySelector('#content_en').value = blogModelToText(blog.content_en);
        form.querySelector('#content_fr').value = blogModelToText(blog.content_fr);
        form.querySelector('#content_vn').value = blogModelToText(blog.content_vn);
    }

    const getBlogData = (e) => {
        const form = formRef.current;
        let c_en = form.querySelector('#content_en').value;
        let c_fr = form.querySelector('#content_fr').value;
        let c_vn = form.querySelector('#content_vn').value;
        if (!(c_en || c_fr || c_vn)) {
            alert('Please fill as least 1 content as posible')
            return;
        }
        if (!c_en) {c_en = "h:Content in english is not available"}
        if (!c_fr) {c_fr = "h:Contenu en francais n'est pas disponible"}
        if (!c_vn) {c_vn = "h:Nội dung trong tiếng Việt không tồn tại"}

        return {
            id: form.querySelector('#id').value,
            name: form.querySelector('#name').value,
            priority: +form.querySelector('#priority').value,
            role: form.querySelector('#role').value,
            date: form.querySelector('#date').value,
            type: form.querySelector('#type').value,
            image: form.querySelector('#image').value,
            writenDate: form.querySelector('#writenDate').value,
            content_en: textToBlogModel(c_en),
            content_fr: textToBlogModel(c_fr),
            content_vn: textToBlogModel(c_vn),
        }
    }

    const addNewBlog = async (e) => {
        e.preventDefault();
        const newBlog = getBlogData()
        const id = await addBlog(newBlog);
        let newBlogs = blogs;
        newBlogs.push({...newBlog, id: id});
        setBlogs(newBlogs);
        formRef.current.reset();
    }

    const updateBlog = async (e={}) => {
        e.preventDefault();
        const updatedBlog = getBlogData();
        await updateBlogById(updatedBlog.id, updatedBlog);
        const newBlogs = blogs.map((blog) => (
            blog.id === updatedBlog.id ? updatedBlog : blog
        ));
        setBlogs(newBlogs);
        formRef.current.reset();
        setCurrentAction('Add');
    }

    const deleteBlog = async (id) => {
        await deleteBlogById(id);
        const newBlogs = blogs.filter(b => b.id !== id);
        setBlogs(newBlogs);
    }

    useEffect(() => {
        (async () => {
            const blogList = await getAllBlogs();
            setBlogs(blogList);
        })();
    },[]);

    return (
        <div className = {`row section`}>
            <div className = {`${styles.container} col l-12 m-12 c-12`}>

                <div className={`${styles.tableBlogs}`}>
                    <h1 className={`${styles.title} sub-title`}>Current Blogs</h1>
                    <Table
                        listData={getListData(blogs)}
                        tableHeaders={contentShowInTable}
                        divClassName={styles.table}
                    ></Table>
                </div>

                <div className={`${styles.form}`}>
                    <h1 className={`${styles.title} sub-title`}>{`${currentAction == "Add" ? "Add a new blog" : "Update a blog"}`}</h1>
                    <Form
                        ref = {formRef}
                        onSubmit={currentAction === "Add" ? addNewBlog : updateBlog}
                        listInput = {listInput}
                        submitButton = { (<Button
                                            divClassName={styles.btnInside}
                                            size="medium"
                                            text={`${currentAction} blog`}
                                            isUsedSubmit={true}
                                        ></Button>)}
                    ></Form>
                </div>

            </div>
        </div>
    )
}

export default BlogAdmin

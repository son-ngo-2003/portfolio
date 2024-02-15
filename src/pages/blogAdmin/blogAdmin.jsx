import { useEffect, useRef } from 'react';

// services
import { getBlogByName, addBlog } from '/src/services/blogServices'

//utils
import { textToBlogModel } from '../../utils/blogUtils';

//css
import styles from "./blogAdmin.module.scss"

//components
import { Form, Button } from "/src/components"

const BlogPage = () => {
    const formRef = useRef(null);
    const listInput = {
        type:               {type: 'text', placeholder: 'type', required: true},
        role:               {type: 'text', placeholder: 'role', required: false}, //for project
        date:               {type: 'text', placeholder: 'date', required: false}, //for project
        name:               {type: 'text', placeholder: 'name', required: true}, 
        writenDate:         {type: 'text', placeholder: 'writenDate', required: true}, 
        content_en:         {type: 'textarea', placeholder: 'content in english', required: true, big:true},
    }

    const addNewBlog =  async (e) => {
        e.preventDefault();
        const blogData = {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            date: document.getElementById('date').value,
            type: document.getElementById('type').value,
            writenDate: document.getElementById('writenDate').value,
            content_en: textToBlogModel(document.getElementById('content_en').value),
        }
        await addBlog(blogData);
    }

    return (
        <div className = {`row section`}>
            <div className = {`${styles.container} col l-12 m-12 c-12`}>
                <h1 className={`${styles.title} sub-title`}>Add a new blog</h1>
                <Form
                    ref = {formRef}
                    callback={addNewBlog}
                    listInput = {listInput}
                    submitButton = { (<Button
                                        divClassName={styles.btnInside}
                                        size="medium"
                                        text={"Add new blog"}
                                        isUsedSubmit={true}
                                    ></Button>)}
                ></Form>
            </div>
        </div>
    )
}

export default BlogPage

import { Blog, BlogType, ProjectBlog } from "@src/types/blog";
import { getRandomText } from "./randomUtils";

const boldTextFormat = (text: string) => {
    const words = text.split('**');
    const formattedWords = words.map((word, index) => {
        if (index % 2 == 1) {
            return <b key={index}>{word}</b>;
        }
        return word;
    });
    return formattedWords;
}

const getRandomBlogs = (numBlogs: number): Blog[] => {
    const blogs: Blog[] = [];
    for (let i = 0; i < numBlogs; i++) {
        const blog: ProjectBlog = {
            id: `-` + i,
            image: null,
            priority: Math.floor(Math.random() * 100),
            type: BlogType.Project,
            role: 'Developer',
            startDate: new Date(),
            endDate: null,

            title: {
                en: `Random Blog - Title ${i}`,
                fr: `Random Blog - Titre ${i}`,
                vn: `Random blog - Tiêu đề ${i}`,
            },
            content: {
                en: getRandomText(3),
                fr: getRandomText(3),
                vn: getRandomText(3),
            },
            deleted: false,
            createdAt: new Date(),
            updatedAt: null,
        };

        blogs.push(blog);
    }
    return blogs;
}

    
export { boldTextFormat, getRandomBlogs };

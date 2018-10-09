import axios from "axios";

export default {
    getAllPosts: () => {
        return axios.get('/api/posts');
    },
    createPost: (storyData) => {
        console.log(storyData)
        return axios.post('/api/posts', {
            title: storyData.title,
            teaser: storyData.teaser,
            body: storyData.body,
            authorName: storyData.authorName,
            categoryName: storyData.categoryName,
            // comments: storyData.comments,
            // purchasers: storyData.purchasers,
            // voters: storyData.voters,
            // tags: storyData.tags,  
            author: storyData.author
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
        });
    },
    getPost: (id) => {
        console.log(id)
        return axios.get('/api/posts/' + id)
    },
    getPostings: (categoryName) => {
        console.log(categoryName)
        return axios.get(`/api/categories/${categoryName}/posts`);
    },
    getCategoryInfo: (categoryName) => {
        console.log("getting Category Info")
        return axios.get(`/api/categories/info/${categoryName}`, {
            displayName: categoryName.displayName,
            description: categoryName.description,
            tags: categoryName.tags
        });
    },
    createComment: (commentData) => {
        console.log(commentData)
        return axios.post('/api/comments', {
            author: commentData.author,
            body: commentData.body,
            // authorName: commentData.authorName,
            commentPath: commentData.commentPath
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
        });
    },
    getComments: () => {
        return axios.get('/api/comments');
    },
    getUserPosts: () => {
        return axios.get('/api/')
    }

};
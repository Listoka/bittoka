import axios from './authAxios';

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
    getPostWithComments: (id) => {
        console.log(id)
        return axios.get(`/api/posts/${id}/comments`)
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
        });
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
    createComment: (id, commentData) => {
        console.log(commentData.body)
        console.log(id)
        return axios.post(`/api/posts/${id}/comments`, {
            body: commentData.body,
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
    getUserPosts: (userID) => {
        return axios.get(`/api/users/${userID}/posts/`);
    },
    deletePost: (id) => {
        return axios.delete('/api/posts/' + id);
    },
    updatePost: (id, updatedData) => {
        return axios.put('/api/posts/' + id, updatedData)
        .catch(error => {
            console.log(error);
        });
    }
    
};
import axios from "axios";

export default {
    getAllPosts: () => {
        return axios.get('/api/posts');
    },
    createBitcoinStoryPost: (storyData) => {
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
        return axios.get(`/api/category/${categoryName}/posts`);
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
    }

};
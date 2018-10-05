import axios from "axios";

export default {
    getBitcoinStoryPosts: () => {
        return axios.get('/api/posts');
    },
    createBitcoinStoryPost: (storyData) => {
        console.log(storyData)
        return axios.post('/api/posts', {
            title: storyData.title,
            teaser: storyData.teaser,
            body: storyData.body,
            // authorName: storyData.authorName,
            // categoryName: storyData.categoryName,
            // comments: storyData.comments,
            // purchasers: storyData.purchasers,
            // voters: storyData.voters,
            // tags: storyData.tags,  
            author: storyData.author
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

};
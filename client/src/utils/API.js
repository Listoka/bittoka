import axios from './authAxios';

export default {
    getAllPosts: () => {
        return axios.get('/api/posts');
    },
    createPost: (data) => {
        console.log(data)
        return axios.post('/api/posts', {
            title: data.title,
            teaser: data.teaser,
            body: data.body,
            authorName: data.authorName,
            categoryName: data.categoryName,
            // comments: data.comments,
            // purchasers: data.purchasers,
            // voters: data.voters,
            // tags: data.tags,  
            author: data.author,
            isDraft: data.isDraft
        })
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },
    createInitialPost: (data) => {
        return axios.post(`/api/posts`, {
            title: data.title,
            // teaser: data.teaser,
            body: data.body,
            tags: data.tags,
            categoryName: data.categoryName,
            isDraft: data.isDraft,
            authorName: data.authorName,
            author: data.author
        }).then(response => {
            console.log(response)
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
        //console.log(categoryName)
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
    getCategoriesTags: (categoryName) => {
        //console.log("getting Category Info")
        return axios.get(`/api/categories`)
    },
    createComment: (id, commentData) => {
        console.log(commentData.body)
        console.log(id)
        return axios.post(`/api/posts/${id}/comments`, {
            body: commentData.body
        })
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },
    createLayeredComment: (id, commentData) => {
        console.log(commentData.body)
        console.log(id)
        return axios.post(`/api/comments/${id}/comments`, {
            body: commentData.body
        })
    },
    getLayeredComments: (commentID) => {
        return axios.get(`/api/comments/${commentID}/`)
    },
    getUserPosts: (userID) => {
        return axios.get(`/api/users/id/${userID}/posts/`);
    },
    deletePost: (id) => {
        console.log(id)
        return axios.delete('/api/posts/' + id);
    },
    updatePost: (id, updatedData) => {
        console.log(id)
        console.log(updatedData)
        return axios.put('/api/posts/' + id, updatedData)
        .then(response => {
            console.log(response);
            return response;
        })
            .catch(error => {
                console.log(error);
            });
    },
    getPostsAndBio: (id) => {
        // returns public profile object of the form
        // {
        //         user: {
        //             username: <name>,
        //             bio: <bio
        //         },
        //         posts: [],
        //         comments: []
        // }
        return axios.get(`/api/users/id/${id}/profile`)
    },
    updateProfile: (id, updatedData) => {
        console.log(updatedData)
        return axios.put(`/api/users/id/${id}`, updatedData)
    },
    submitDraft: (postID, data) => {
        console.log(data)
        console.log(postID)
        return axios.put('/api/posts/' + postID, {
            title: data.title,
            // teaser: data.teaser,
            body: data.body,
            // tags: data.tags,
            // categoryName: data.categoryName,
            // isDraft: data.isDraft
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
        });
    },
    getPostsAndDrafts: (id) => {
        return axios.get(`/api/users/id/${id}/posts`)
    },
    getMoneyButton: (id) => {
        return axios.get(`/api/users/id/${id}/profile`)//May need to change. Wherever we can publicly grab the MB id from
    }

};
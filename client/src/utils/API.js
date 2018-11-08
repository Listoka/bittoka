import axios from './authAxios';

export default {
  getAllPosts: () => {
    return axios.get('/api/posts');
  },

  createPost: (data) => {
    return axios.post('/api/posts', data)
      .catch(error => console.log('API.createPost Error:', error));
  },

  getPost: (id) => {
    return axios.get('/api/posts/' + id)
  },

  upvotePost: (id) => {
    return axios.get(`/api/posts/${id}/vote`)
  },

  purchasePost: (id) => {
    return axios.get(`/api/posts/${id}/purchase`)
  },

  getPostWithComments: (id) => {
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

  getCategoryAndPosts: (categoryName) => {
    return axios.get(`/api/categories/${categoryName}/posts`)
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
    return axios.put('/api/posts/' + id, updatedData)
      .then(response => {
        console.log('updatePost response', response);
        return response;
      })
      .catch(error => {
        console.log('updatePost error', error);
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
    data.isDraft = true
    return axios.put('/api/posts/' + postID, data)
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
  }, 

  createTransaction: (tx) => {
    console.log('createTransaction: tx: ' + JSON.stringify(tx))
    return axios.post('/api/transactions', tx)
  },

  getTotalPaidFromUser: (id) => {
      return axios.get(`/api/transactions/paid/userId/${id}`)
  },

  getTotalPaidToUser: (id) => {
      return axios.get(`/api/transactions/paid/paidUserId/${id}`)
  }
};
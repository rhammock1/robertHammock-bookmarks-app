const baseURL = 'https://thinkful-list-api.herokuapp.com/robert-hammock';

const listApiFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if(!res.ok) {
        error = {code: res.status};
        if(!res.headers.get('Content-Type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

const getBookmarks = function() {
  return listApiFetch(`${baseURL}/bookmarks`);
  
}

const createBookmark = function(params) {
  console.log('i did get here');
  return listApiFetch(`${baseURL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: params
  });
}

const updateBookmark = function(id, updateData) {

}

const deleteBookmark = function(id) {
  return listApiFetch(`${baseURL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
}
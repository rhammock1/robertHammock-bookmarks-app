const STORE = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
}


const findById = function(id) {
  return this.STORE.bookmarks.find(currentItem => currentItem.id === id);
};

const addBookmark = function(bookmark) {
  console.log(bookmark);
  this.STORE.bookmarks.unshift(bookmark);
  
};

const findAndUpdate = function(id, newData) {
  const currentItem = this.findById(id);
  // console.log('line21',currentItem);
  // console.log('line22',newData);
  Object.assign(currentItem, newData);
  console.log('line23', currentItem)
  
};

const findAndDelete = function(id) {
  this.STORE.bookmarks = this.STORE.bookmarks.filter(currentItem => currentItem.id !== id);
};

const toggleExpanded = function(id) {
  this.STORE.bookmarks.forEach(bookmark => {
    if(bookmark.id === id) {
      bookmark.expanded = !bookmark.expanded;
    };
  });
}

const toggleEdit = function(id) {
  this.STORE.bookmarks.forEach(bookmark => {
    if(bookmark.id === id) {
      bookmark.edit = !bookmark.edit;
    };
  });
};


const toggleFilter = function(value) {
  //im not really sure yet about this one
  this.STORE.filter = value;
};

const toggleAdding = function() {
  this.STORE.adding = !this.STORE.adding;
}

const setError = function(error) {
  this.STORE.error = error;
};

 export default {
   STORE,
   findById,
   addBookmark,
   findAndUpdate,
   findAndDelete,
   toggleAdding,
   toggleExpanded,
   toggleFilter,
   toggleEdit,
   setError
 }
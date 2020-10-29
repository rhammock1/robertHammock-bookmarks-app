const bookmarks = [];
let expanded = false;
let adding = false;
let error = null;
let filter = 0;

const findById = function(id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const addBookmark = function(bookmark) {
  this.bookmarks.push(bookmark);
  
};

const findAndUpdate = function(id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

// const toggleExpanded = function() {

// };


const toggleFilter = function() {
  //im not really sure yet about this one
};

const setError = function(error) {
  this.error = error;
};
 export default {
   bookmarks,
   expanded,
   adding,
   error,
   filter,
   findById,
   addBookmark,
   findAndUpdate,
   findAndDelete,
  //  toggleExpanded,
   toggleFilter,
   setError
 }
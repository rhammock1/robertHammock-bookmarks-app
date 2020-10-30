import $ from 'jquery';
import api from './api';
import store from './store';
import bookmarkList from './bookmark-list'
import './index.css';
//get basic functions working then split into modules





const startUp = function() {
//main api fetch then render
  api.getBookmarks()
  .then((bookmarks) => {
    // let expanded = false;
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  });

  bookmarkList.render();
  bookmarkList.bindEventListeners();
  
}

$(startUp);
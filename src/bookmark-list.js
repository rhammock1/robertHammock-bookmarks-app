import $ from 'jquery';
import api from './api';
import store from './store';

const generateBookmarkElement = function(bookmark, id) {
  //template if statement to togggle expanded
  let bookmarkTitle = `
  <ul class="js-bookmarks-list bookmarks-list">
      <li class="js-list-item list-item" data-item-id='${bookmark.id}'>${bookmark.title}<div class='js-rating '>
        <img class='rating-icon star1'src="https://img.icons8.com/metro/26/000000/star.png" alt="star-rating1">
        <img class='rating-icon star2'src="https://img.icons8.com/metro/26/000000/star.png" alt="star-rating2">
        <img class='rating-icon star3'src="https://img.icons8.com/metro/26/000000/star.png" alt="star-rating3">
        <img class='rating-icon star4'src="https://img.icons8.com/metro/26/000000/star.png" alt="star-rating4">
        <img class='rating-icon star5'src="https://img.icons8.com/metro/26/000000/star.png" alt="star-rating5">
      </div>
      <input type='image' src="https://img.icons8.com/fluent-systems-filled/24/000000/edit.png" class='edit-button js-edit-button'/>
      <input type='image' src="https://img.icons8.com/ios-glyphs/24/000000/delete.png" class='delete-button js-delete-button'/>`;
  if(store.expanded && id === store.bookmarks.id) {
    let expandedView = `
        <div class="js-expanded-item expanded">
          <button>Visit Site</button>
          <p>${bookmark.desc}</p>
        </div>
      </li></ul>`;
      return `${bookmarkTitle}${expandedView}`;
  };
  return `${bookmarkTitle}</li></ul>`;
};

const generateBookmarkString = function(bookmarksList) {
  const bookmarks = bookmarksList.map((bookmark) =>
    
    generateBookmarkElement(bookmark));
  
  return bookmarks.join('');
};

const generateError = function(message) {
  return `
    <section class='error-content'>
      <button id='cancel-error'>X</button>
        <p>${message}</p>
      </section>`;
};

const renderError = function() {
  if(store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
    $('.error-container').removeClass('hidden');
  } else {
    $('.error-container').empty();
    $('.error-container').addClass('hidden');
  }
};

const handleCloseError = function() {
  $('.error-container').on('click', '#cancel-error', function() {
    store.setError(null);
    renderError();
  });
};

const newBookmarkTemplate = function() {
  let newBookmarkPage = 
  `<form id='js-form' name='js-form'>
    <h2>Add new bookmark:</h2>
    <input type='text' name='url' class='js-new-link-entry' placeholder='url' required>
    <input type='text' name='title' class='js-new-entry-title' placeholder='New bookmark title' required>
    <div class='js-new-rating '>
      <input type='image' name='rating' class='rating-icon'src="https://img.icons8.com/metro/26/000000/star.png" alt="1" value='1'>
      <input type='image' name='rating' class='rating-icon'src="https://img.icons8.com/metro/26/000000/star.png" alt="2" value='2'>
      <input type='image' name='rating' class='rating-icon'src="https://img.icons8.com/metro/26/000000/star.png" alt="3" value='3'>
      <input type='image' name='rating' class='rating-icon'src="https://img.icons8.com/metro/26/000000/star.png" alt="4"  value='4'>
      <input type='image' name='rating' class='rating-icon'src="https://img.icons8.com/metro/26/000000/star.png" alt="5" value='5'>
    </div>
    <input type='text' name='desc' class='js-new-entry-description' placeholder='description'>
    <div class='button-holder'>
      <button class='cancel-form'>Cancel</button>
      <button class='submit-form'>Submit</button>
    </div>
    </form>`;
    return newBookmarkPage;
};
const changeBackgroundRating = function() {
  let bookmarksList = [...store.bookmarks];
  console.log(bookmarksList);
  for(let i =0;i<bookmarksList.length; i++) {
   let rating = bookmarksList[i].rating;
   console.log(rating);
   for(let j = 0;j<rating; j++) {
     $('.rating-icon').addClass('rating');
   }
  }
  //  let id = bookmarksList[i].id;
  //  if(rating > 0) {
  //    $('')

  //use a loop to go through each input within div
  //to equal result
  //trying to have the number of stars lit up based on the rating
   
  
}

const render = function() {
  renderError();
  let bookmarksList = [...store.bookmarks];
  changeBackgroundRating();

  
  if(store.adding) {
    $('main').html(newBookmarkTemplate());
  } else {
    const bookmarkString = generateBookmarkString(bookmarksList);
  
  $('main').html(bookmarkString);
  }
  
   
};

const handleNewBookmark = function() {
  $('.buttons').on('click', '#new', function(event) {
    event.preventDefault();
    store.adding = true;
    render();
  });
  
};

const handleFilterBy = function() {

};

const getIdFromElement = function(bookmark) {
  return $(bookmark).closest('.js-list-item').data('item-id');
};

const handleExpandedView = function() {
  $('main').on('click', '.js-list-item', function(event) {
    if(!store.expanded) {
      store.expanded = true;
    } else {
      store.expanded = false;
    };
    let id = getIdFromElement(event.currentTarget)
    console.log(id);
    console.log(event.currentTarget);
    $(event.currentTarget)

    render();
  });
};

const handleDeleteBookmark = function() {
  $('main').on('click', '.js-delete-button', event => {
    let id = getIdFromElement(event.currentTarget);
    api.deleteBookmark(id).then(() => {
      store.findAndDelete(id);
      render();
    }).catch((error) => {
      store.setError(error.message);
      renderError();
  });
  });
};

const handleEditBookmark = function() {
  $('main').on('click', '.js-edit-button', event => {
    console.log('edit button pressed');

  })
};

const handleStarRating = function() {
  $('main').on('click', ".rating-icon", event => {
      event.preventDefault();
      let rating = $(event.currentTarget).val();
      handleCreateBookmark(rating);
      if(!$(event.currentTarget).hasClass('rating')) {
        $(event.currentTarget).prevAll().addBack().addClass('rating');
      } else {
        $(event.currentTarget).nextAll().removeClass('rating');
      }
      

    });
};

$.fn.extend({
  serializeJson: function(rating) {
    let newBookmark = $('#js-form');
    console.log(newBookmark[0]);
    const formData = new FormData(newBookmark[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    o.rating = rating;
    console.log(o);
    return JSON.stringify(o);
  }
});

const handleCreateBookmark = function(rating) {
  $('main').on('click', '.submit-form', event => {
    event.preventDefault();
    
    console.log('Line 168:', rating);
    let params = $(event.target).serializeJson(rating);
    console.log(params);
    api.createBookmark(params).then((newBookmark) => {
      store.addBookmark(newBookmark);
      store.adding = false;
      store.expanded = false;
      render();
    })
    .catch((error) => {
      store.setError(error.message);
      renderError();
    });
  });
};

const handleCancelBookmark = function() {
  $('main').on('click', '.cancel-form', event => {
    event.preventDefault();
    if ($('input').hasClass('canceled')) {
        store.adding = false;
        render();
      };
      $('input').val('');
      $('input').removeClass('rating');
      $('input').addClass('canceled');
      
      
});
}



const bindEventListeners = function() {
  handleNewBookmark();
  handleCreateBookmark();
  handleCancelBookmark();
  handleCloseError();
  handleEditBookmark();
  // handleExpandedView();
  handleDeleteBookmark();
  handleStarRating();
};

export default {
  render,
  bindEventListeners
}

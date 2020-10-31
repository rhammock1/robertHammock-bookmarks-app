import $ from 'jquery';
import api from './api';
import store from './store';

const collapsedTemplate = function(bookmark) {
    
  let ratingStar = '<div class="rating rating-wrapper">';
  let bookmarkTitle = `
    <li class="js-list-item list-item" data-item-id='${bookmark.id}'><h2 id='title'>${bookmark.title}</h2>`;

  for(let i = 0; i< bookmark.rating; i++) {
    
    ratingStar += `<label for="star-${bookmark.id}${[i]}" collapsed>rating</label><input class='star collapsed' type="radio" id="star-${bookmark.id}${[i]}" name="rating" value=""/>`;
    
  }
     
  let buttons = `<div class='button-wrapper'><div class='edit-delete'><input type='image' id='edit' src="https://img.icons8.com/fluent-systems-filled/24/000000/edit.png" class='edit-button js-edit-button' alt='edit button'/>
      <input type='image' src="https://img.icons8.com/ios-glyphs/24/000000/delete.png" id='delete' class='delete-button js-delete-button' alt='delete button'/></div>`;

  bookmarkTitle += buttons;
  bookmarkTitle += `<fieldset><legend>Rating</legend>${ratingStar}</fieldset></div>`;

  let expandDown = `<input type='image' class='expandDown'src="https://img.icons8.com/metro/26/000000/expand-arrow.png" alt='dropdown icon'></div>`;

  bookmarkTitle += expandDown;
  return bookmarkTitle;
};

const expandedTemplate = function(bookmark) {
  let expandedView = `
        <div class="js-expanded-item expanded">
          <form action='${bookmark.url}' target='_blank'>
          <button>Visit Site</button>
          </form>
          <p>${bookmark.desc}</p>
        </div>
      </li>`;
        let ratingStar = '<div class="rating rating-wrapper">';
  let bookmarkTitle = `
    <li class="js-list-item list-item" data-item-id='${bookmark.id}'><h2 id='title'>${bookmark.title}</h2>`;

  for(let i = 0; i< bookmark.rating; i++) {
    
    ratingStar += `<label for='star-${bookmark.id}${[i]}'>rating</label><input class='star collapsed' type="radio" id="star-${bookmark.id}${[i]}" name="rating" value=""/>`;
    
  }
     
  let buttons = `<div class='button-wrapper'><div class='edit-delete'><input type='image' src="https://img.icons8.com/fluent-systems-filled/24/000000/edit.png" class='edit-button js-edit-button' alt='edit button'/>
      <input type='image' src="https://img.icons8.com/ios-glyphs/24/000000/delete.png" class='delete-button js-delete-button' alt='delete button'/></div>`;

  bookmarkTitle += buttons;
  bookmarkTitle += `<fieldset><legend>Rating</legend>${ratingStar}</fieldset></div>`;

  let expandDown = `<input type='image' class='expandDown'src="https://img.icons8.com/metro/26/000000/expand-arrow.png" alt='expand down icon'></div>`;

  bookmarkTitle += expandDown;
      return `${bookmarkTitle}${expandedView}`;
};

const editBookmarkTemplate = function(bookmark) {
  let buttons = `<input type='image' src="https://img.icons8.com/metro/26/000000/checkmark.png" class='edit-button js-check-button'alt='checkmark to submit edit'/>`;
    let bookmarkTitle = `
    <li class="js-list-item list-item" data-item-id='${bookmark.id}'><div class="js-expanded-item edit"><form class='js-form' required><label for='title'>Title:<input type='text' name='title' id='title' value='${bookmark.title}' required></label>`;
    let editView = 
    `
      <label for='url'>url:
      <input type='text' id='url' name='url' value='${bookmark.url}'class='js-edit-link-entry edit-link' required></label>
      <fieldset class='js-new-rating rating'>
      <legend>Rating:</legend>
        <input type="radio" id="star5" name="rating" value="5" required/><label for="star5" title="5 stars!">5 stars</label>
        <input type="radio" id="star4" name="rating" value="4" required/><label for="star4" title="4 stars!">4 stars</label>
        <input type="radio" id="star3" name="rating" value="3" required/><label for="star3" title="3 stars!">3 stars</label>
        <input type="radio" id="star2" name="rating" value="2" required/><label for="star2" title="2 stars!">2 stars</label>
        <input type="radio" id="star1" name="rating" value="1" required/><label for="star1" title="1 stars!">1 star</label>
      </fieldset>
          <label for='desc'>Description:
          <input type='text' value='${bookmark.desc}' name='desc' id='desc' class='js-new-entry-description' required></label>
        </form>
        </div>
      `;
      return `${bookmarkTitle}${editView}${buttons}</li>`;
};
const newBookmarkTemplate = function() {
  let newBookmarkPage = 
  `<div class='list-item newPage'>
  <form class='js-form' name='js-form'>
    <h2>Add new bookmark:</h2>
    
    <label for='title'>Title:
    <input type='text' id='title' name='title' class='js-new-entry-title' placeholder='New bookmark title' required></label>
    <label for='url'>url:
    <input type='text' id='url' name='url' class='js-new-link-entry' placeholder='https://' required pattern='https?://.+'></label>
    <fieldset class='js-new-rating rating'>
      <legend>Rating:</legend>
      <input type="radio" id="star5" name="rating" value="5" required/><label for="star5" title="5 stars!">5 stars</label>
      <input type="radio" id="star4" name="rating" value="4" required/><label for="star4" title="4 stars!">4 stars</label>
      <input type="radio" id="star3" name="rating" value="3" required/><label for="star3" title="3 stars!">3 stars</label>
      <input type="radio" id="star2" name="rating" value="2" required/><label for="star2" title="2 stars!">2 stars</label>
      <input type="radio" id="star1" name="rating" value="1" required/><label for="star1" title="1 stars!">1 star</label>
    </fieldset>
    <label for='desc'>Description:</label>
    <input type='text' id='desc' name='desc' class='js-new-entry-description' placeholder='description' required>
    <div class='button-holder'>
      <button class='cancel-form'>Cancel</button>
      <button class='submit-form'>Save</button>
    </div>
    </form></div>`;
    return newBookmarkPage;
};
const generateBookmarkElement = function(bookmark) {
  //template if statement to togggle expanded
  if(bookmark.rating >= store.STORE.filter && bookmark.expanded) {
    
    return expandedTemplate(bookmark);
  }

  if(bookmark.edit) {
      return editBookmarkTemplate(bookmark);
    }
  if(bookmark.rating >= store.STORE.filter && !bookmark.expanded) {
      return collapsedTemplate(bookmark);
    };

  
};

const generateError = function(message) {
  return `
    <section class='error-content'>
      <button id='cancel-error'>X</button>
        <p>${message}</p>
      </section>`;
};


const generateBookmarkString = function(bookmarksList) {
  const bookmarks = bookmarksList.map((bookmark) => 
    generateBookmarkElement(bookmark)
  ); 
  
  return `<ul class="js-bookmarks-list bookmarks-list">${bookmarks.join('')}</ul>`
};


const renderError = function() {
  if(store.STORE.error) {
    const el = generateError(store.STORE.error);
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

const render = function() {
  renderError();
  
  let bookmarksList = [...store.STORE.bookmarks];
  

  
  if(!store.STORE.adding) {
    const bookmarkString = generateBookmarkString(bookmarksList);
  
    $('main').html(bookmarkString);
    
  } else {
    $('main').html(newBookmarkTemplate());
  }
  
   
};

const handleNewBookmark = function() {
  $('.buttons').on('click', '#new', function(event) {
    event.preventDefault();
    store.toggleAdding();
    render();
  });
  
};

const handleFilterBy = function() {
  $('#filter').on('change', event => {
    event.preventDefault();
    let filter = $(event.currentTarget).val();
    store.toggleFilter(filter);
    render();
  });
};

const getIdFromElement = function(bookmark) {
  return $(bookmark).closest('.js-list-item').data('item-id');
};

const handleExpandedView = function() {
  $('main').on('click', '.expandDown', function(event) {
    
    let id = getIdFromElement(event.currentTarget)
    let bookmark = store.findById(id);
    store.toggleExpanded(id);

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
    event.preventDefault();
    let id = getIdFromElement(event.currentTarget)
    store.toggleEdit(id);
    render();
   });
};


const handleCheckEdit = function() {
  $('main').on('click', '.js-check-button', event => {
    let id = getIdFromElement(event.currentTarget)
  
    let params = $(event.currentTarget).serializeJson();
    
    api.updateBookmark(id, params).then(() => {
      params = JSON.parse(params);
      store.findAndUpdate(id, params);
      store.toggleEdit(id);
      render();
      
    })
    .catch((error) => {
      store.setError(error.message);
      renderError();
    });
    render();
  })

}

$.fn.extend({
  serializeJson: function() {
    let newBookmark = $('.js-form');
    const formData = new FormData(newBookmark[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});

const handleCreateBookmark = function() {
  
  $('main').on('click', '.submit-form', event => {
    event.preventDefault();

    let params = $(event.target).serializeJson();
    api.createBookmark(params).then((newBookmark) => {
      store.addBookmark(newBookmark);
      store.toggleAdding();
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
    
    if ($('form').hasClass('canceled')) {
        store.toggleAdding();
        console.log(store.STORE)
        render();
      } else {
          $('input').val('');
          $('form').addClass('canceled');
      }
     
});
};

const bindEventListeners = function() {
  handleNewBookmark();
  handleCreateBookmark();
  handleCancelBookmark();
  handleCloseError();
  handleEditBookmark();
  handleCheckEdit();
  handleExpandedView();
  handleDeleteBookmark();
  handleFilterBy();
  
};

export default {
  render,
  bindEventListeners
}

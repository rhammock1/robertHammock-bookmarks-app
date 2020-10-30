import $ from 'jquery';
import api from './api';
import store from './store';

const generateBookmarkElement = function(bookmark) {
  //template if statement to togggle expanded
  if(bookmark.rating >= store.STORE.filter) {
  let ratingStar = '<div class="rating rating-wrapper">';
  let bookmarkTitle = `
    <li class="js-list-item list-item" data-item-id='${bookmark.id}'><h2 id='title'>${bookmark.title}</h2>`

  for(let i = 0; i< bookmark.rating; i++) {
    
    ratingStar += `<input class='star collapsed' type="radio" id="star" name="rating" value=""/><label for="star" title="rating" collapsed>rating</label>`;
    
  }
     
  let buttons = `<div class='button-wrapper'><div class='edit-delete'><input type='image' src="https://img.icons8.com/fluent-systems-filled/24/000000/edit.png" class='edit-button js-edit-button' alt='edit button'/>
      <input type='image' src="https://img.icons8.com/ios-glyphs/24/000000/delete.png" class='delete-button js-delete-button' alt='delete button'/></div>`;

  bookmarkTitle += buttons;
  bookmarkTitle += ratingStar + '</div>';

  let expandDown = `<input type='image' class='expandDown'src="https://img.icons8.com/metro/26/000000/expand-arrow.png"></div>`;

  bookmarkTitle += expandDown;

  if(bookmark.edit) {
    buttons = `<input type='image' src="https://img.icons8.com/metro/26/000000/checkmark.png" class='edit-button js-check-button'alt='checkmark to submit edit'/>`;
    bookmarkTitle = `
    <li class="js-list-item list-item" data-item-id='${bookmark.id}'><input type='text' name='title' value='${bookmark.title}' required>`;
    let editView = 
    `<div class="js-expanded-item expanded edit">
    <form class='js-form' required>
      <input type='text' name='url' value='${bookmark.url}'class='js-edit-link-entry edit-link' required>
      <div class='js-new-rating rating'>
        <input type="radio" id="star5" name="rating" value="5" required/><label for="star5" title="5 stars!">5 stars</label>
        <input type="radio" id="star4" name="rating" value="4" required/><label for="star4" title="4 stars!">4 stars</label>
        <input type="radio" id="star3" name="rating" value="3" required/><label for="star3" title="3 stars!">3 stars</label>
        <input type="radio" id="star2" name="rating" value="2" required/><label for="star2" title="2 stars!">2 stars</label>
        <input type="radio" id="star1" name="rating" value="1" required/><label for="star1" title="1 stars!">1 star</label>
      </div>
          <input type='text' value='${bookmark.desc}' name='desc' class='js-new-entry-description' required>
        </div>
        </form>
      `;
      return `${bookmarkTitle}${editView}${buttons}</li>`;
  }
  if(bookmark.expanded) {
    let expandedView = `
        <div class="js-expanded-item expanded">
          <form action='${bookmark.url}' target='_blank'>
          <button>Visit Site</button>
          </form>
          <p>${bookmark.desc}</p>
        </div>
      </li>`;
      return `${bookmarkTitle}${expandedView}`;
  };

  return `${bookmarkTitle}</li>`;
  }
};



const generateBookmarkString = function(bookmarksList) {
  const bookmarks = bookmarksList.map((bookmark) => 
    generateBookmarkElement(bookmark)
  ); 
  
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

const newBookmarkTemplate = function() {
  let newBookmarkPage = 
  `<form class='js-form' name='js-form'>
    <h2>Add new bookmark:</h2>
    <input type='text' name='url' class='js-new-link-entry' placeholder='url' required>
    <input type='text' name='title' class='js-new-entry-title' placeholder='New bookmark title' required>
    <div class='js-new-rating rating'>
      <input type="radio" id="star5" name="rating" value="5" required/><label for="star5" title="5 stars!">5 stars</label>
      <input type="radio" id="star4" name="rating" value="4" required/><label for="star4" title="4 stars!">4 stars</label>
      <input type="radio" id="star3" name="rating" value="3" required/><label for="star3" title="3 stars!">3 stars</label>
      <input type="radio" id="star2" name="rating" value="2" required/><label for="star2" title="2 stars!">2 stars</label>
      <input type="radio" id="star1" name="rating" value="1" required/><label for="star1" title="1 stars!">1 star</label>
    </div>
    <input type='text' name='desc' class='js-new-entry-description' placeholder='description' required>
    <div class='button-holder'>
      <button class='cancel-form'>Cancel</button>
      <button class='submit-form'>Submit</button>
    </div>
    </form>`;
    return newBookmarkPage;
};

const render = function() {
  renderError();
  
  let bookmarksList = [...store.STORE.bookmarks];
  console.log('BookMark List',bookmarksList);

  
  if(store.STORE.adding) {
    $('ul').html(newBookmarkTemplate());
  } else {
    const bookmarkString = generateBookmarkString(bookmarksList);
  
  $('ul').html(bookmarkString);
  }
  
   
};

const handleNewBookmark = function() {
  $('.buttons').on('click', '#new', function(event) {
    event.preventDefault();
    store.STORE.adding = true;
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
    let bookmark = store.findById(id);
    let rating = bookmark.rating;
    // console.log(rating);
    let params = $(event.currentTarget).serializeJson();
    
    console.log('line206',params);
    
    api.updateBookmark(id, params).then(() => {
      console.log();
      
      store.findAndUpdate(id, params);
      store.toggleEdit(id);
      render();
    })
    .catch((error) => {
      store.setError(error.message);
      renderError();
    });
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
    let rating = $('input[name="rating"]').val()
    console.log(rating);
    let params = $(event.target).serializeJson();
    api.createBookmark(params).then((newBookmark) => {
      store.addBookmark(newBookmark);
      store.STORE.adding = false;
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
        store.STORE.adding = false;
        render();
      };
      $('input').val('');
      $('input').removeClass('rating');
      $('input').addClass('canceled');
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

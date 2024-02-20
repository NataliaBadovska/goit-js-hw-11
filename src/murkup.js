export { renderMarkup };

function renderMarkup(galleryCard) {
    const gallery = document.querySelector('.gallery');

    const murkup = galleryCard.hits.map((elem) =>
        `<div class="photo-card">
    <img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
      <b>Likes ${elem.likes}</b>
    </p>
   <p class="info-item">
     <b>Views ${elem.views}</b>
   </p>
    <p class="info-item">
    <b>Comments ${elem.comments}</b>
  </p>
   <p class="info-item">
     <b>Downloads ${elem.downloads}</b>
    </p>
   </div>
  </div>`).join();
    
    gallery.insertAdjacentHTML('beforeend', murkup );
}

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { NewApiService } from './api-service';
import { renderMarkup } from "./murkup"

const newApiService = new NewApiService();

const lightboxGallery = new SimpleLightbox('.gallery a');
const form = document.querySelector(".search-form");
const btnLoadMore = document.querySelector(".load-more")
const gallery = document.querySelector('.gallery');
btnLoadMore.style.visibility = 'hidden';

form.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick)

async function onSearch(evt) {
    evt.preventDefault();

    newApiService.resetPage();
    clearContainer();
    const form = evt.currentTarget;
    newApiService.searchQuery = form.elements.searchQuery.value;
    // newApiService.getCardsOnRequest().then(answerCheck).finally(form.reset());
    const response = await newApiService.getCardsOnRequest();
    const check = await answerCheck(response);
    return check;
}

function answerCheck(galleryCard) {
    let restOfCollection = galleryCard.totalHits - newApiService.per_page;
    restOfCollection -= newApiService.per_page;

    if (galleryCard.total === 0 || newApiService.searchQuery === '') {
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }else {
        updateMarkup(galleryCard);
        btnLoadMore.style.visibility = 'visible';
    }

    if (galleryCard.totalHits < newApiService.per_page) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");  
    }
}

async function onBtnLoadMoreClick() {
    // newApiService.getCardsOnRequest().then(endOfCollection);
    const card = await newApiService.getCardsOnRequest();
    return await endOfCollection(card);
}

function clearContainer() {
    gallery.innerHTML = '';
}

function endOfCollection(galleryCard) {

    let restOfCollection = galleryCard.totalHits - newApiService.per_page;
    restOfCollection -= newApiService.per_page;
    
    if (restOfCollection === 0 || restOfCollection < 0) {
         btnLoadMore.style.visibility = 'hidden';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");  
        
    } 
    updateMarkup(galleryCard);
}

function ofAllImages(galleryCard) {
    Notiflix.Notify.info(`Hooray! We found ${galleryCard.totalHits} images.`);
}


function scrolling() {
const { height: cardHeight } = document
  .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

function updateMarkup(galleryCard) {
    renderMarkup(galleryCard);
    ofAllImages(galleryCard);
    scrolling();
    lightboxGallery.refresh();
}

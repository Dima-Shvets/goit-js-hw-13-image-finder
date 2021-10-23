import './sass/main.scss';

import debounce from "lodash.debounce";
import * as basicLightbox from 'basiclightbox'

import galleryTpl from './templates/gallery-tpl.hbs';
import photoCardTpl from './templates/photo-card-tpl.hbs';
import searchFormTpl from './templates/search-form-tpl.hbs';
import PicturesApiService from './js/pictures-service';

const body = document.querySelector('body');

body.insertAdjacentHTML('afterbegin', galleryTpl());
body.insertAdjacentHTML('afterbegin', searchFormTpl());

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.js-load-more-btn')
}

const picturesApiService = new PicturesApiService;

refs.searchForm.addEventListener('input', debounce(onFormInputChange, 500));
refs.loadMoreBtn.addEventListener('click', onLoadBtnPress);
refs.gallery.addEventListener('click', onPicturesClick)


function onFormInputChange(e) {
    picturesApiService.query = e.target.value;

    if (picturesApiService.query === '') {
        clearGallery()
        return
    }

    picturesApiService.resetPage();
    clearGallery();
    fetchPicures();
}

function fetchPicures() {
    picturesApiService.fetchPictures().then(pictures => {
        appendCardsMarkup(pictures.hits);
    }
    );
}

function clearGallery() {
    refs.gallery.innerHTML = "";
}

function appendCardsMarkup(pictures) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(pictures));
    refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function onLoadBtnPress() {
    fetchPicures();
}

function onPicturesClick(e) {
    const url = e.target.dataset.large;
    basicLightbox.create(`
		<img width="1400" height="900" src=${url}>
	`).show()

}










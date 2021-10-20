import './sass/main.scss';

import debounce from "lodash.debounce";

import galleryTpl from './templates/gallery-tpl.hbs';
import photoCardTpl from './templates/photo-card-tpl.hbs';
import searchFormTpl from './templates/search-form-tpl.hbs';

const BASE_URL = 'https://pixabay.com/api';
let pageNumber = 1;
const currentQuery = '';

const body = document.querySelector('body');

body.insertAdjacentHTML('afterbegin', galleryTpl());
body.insertAdjacentHTML('afterbegin', searchFormTpl());

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more-btn"]')
}

refs.searchForm.query.addEventListener('input', debounce(onFormInputChange, 500));
refs.loadMoreBtn.addEventListener('click', onLoadBtnPress());


function fetchPictures(query, pageNmbr) {
    return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNmbr}&per_page=12&key=23893693-5116f7539f40f5f078cda9a9c`)
        .then(responce => responce.json()).then(pictures => {
            appendCardsMarkup(pictures.hits)
            incrementPage();
    });
}

function appendCardsMarkup(pictures) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(pictures))
}

function onFormInputChange(e) {

    const currentQuery = e.target.value;
    fetchPictures(currentQuery, pageNumber);
    refs.gallery.innerHTML = "";
    pageNumber = 1;
}

function onLoadBtnPress() {
    console.log('button')
     if (currentQuery.length === 0) {
        return
    };
    fetchPictures(currentQuery, pageNumber);
}

function incrementPage() {
    pageNumber += 1;
}







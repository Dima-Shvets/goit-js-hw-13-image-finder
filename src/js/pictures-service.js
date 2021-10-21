const BASE_URL = 'https://pixabay.com/api';
const ACCESS_KEY = '23893693-5116f7539f40f5f078cda9a9c'

export default class PicturesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1; 
    }

    fetchPictures() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${ACCESS_KEY}`;
        return fetch(url)
            .then(responce => responce.json())
            .then(pictures => {
                this.incrementPage();
                return pictures;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query () {
        return this.searchQuery;
    }

    set query (newQuery) {
        this.searchQuery = newQuery;
    }


}
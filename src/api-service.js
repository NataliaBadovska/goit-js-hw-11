import axios from 'axios';

export class NewApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }
    
     getCardsOnRequest() {
        return axios.get(`https://pixabay.com/api/?key=42241043-db77f91fab78549391ec20709&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`)
            .then(gallery => {
                this.incrementPage();
                return gallery.data
            });
    }
    //   async getCardsOnRequest() {
    //       const cardRequest = await axios.get(`https://pixabay.com/api/?key=42241043-db77f91fab78549391ec20709&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`);
    //       await this.incrementPage(cardRequest);       
    //       return (cardRequest );
    // }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

}
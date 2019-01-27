import axios from 'axios';
import config from '../config'

class Search {
    constructor(query){
        this.query = query;
    }
    
    async getRecipes(){
        try{
            const res = await axios.get('https://www.food2fork.com/api/search', {
                params: {
                    key: config.key,
                    q: this.query
                }
            });
            this.result = res.data.recipes;
        } catch(error) {
            console.log(error);
        }
    };
}

export default Search;
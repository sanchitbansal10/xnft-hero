import axios from 'axios';
const API_KEY= 'f05bab57ad53efd6bd8721343cf3e4ee';
const getOddsRoute = (sport) =>  `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=uk`
const getSportsRoute = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`

export const getOdds = (sport) => {
    return axios.get(getOddsRoute(sport), {
        params: {
            API_KEY
        }
    })
    .then(response => {
        console.log(response.data)
        return response.data
    })
    .catch(error => {
        console.log('Error status', error.response.status)
        console.log(error.response.data)
    })
}

export const getSports = () => {
    axios.get(getSportsRoute, {
        params: {
            API_KEY
        }
    })
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        console.log('Error status', error.response.status)
        console.log(error.response.data)
    })
}


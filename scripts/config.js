const authentication = {
    api_key: "9b3e2242-a7b9-42d8-a037-9ba745320380"
}
const { api_key: key } = authentication;

axios.defaults.baseURL = 'https://project-1-api.herokuapp.com'
// axios.defaults.headers.common['Authorization'] = key;
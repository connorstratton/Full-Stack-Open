import axios from 'axios'
const apiKey = import.meta.env.VITE_SOME_KEY;
console.log(import.meta.env.VITE_SOME_KEY);
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`

const getAll = (capital, tld) => {
    const code = tld[0].replace('.', '')
    console.log(code)
    console.log(`${baseUrl}${capital},${code}&APPID=${apiKey}`)
    const request = axios.get(`${baseUrl}${capital},${code}&APPID=${apiKey}`)
    return request.then(response => response.data).catch(error => {console.log("fail")})
}


export default { getAll }

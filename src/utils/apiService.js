/**
 * @class ApiService
 * @description Contains methods for making asynchronous Http requests
 * @exports ApiService
 */

 const BASE_URL = "https://rhmo-sample-api.herokuapp.com";

class ApiService {
  static ENDPOINTS = {
    providers: `${BASE_URL}/providers`,
    imageUpload: `${BASE_URL}/upload`

  }

  /**
   * @method get
   * @description makes a GET request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async get(url, data) {
    // const finalUrl = data ? url : `${url}?q=${data}`
    if (data) console.log(true)
    const response = await fetch(
      `${url}${data ? `?q=${data}` : ''}`
    );
    return response.json();
  }


  /**
   * @method post
   * @description makes a POST request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async post(url, data) {
    const response = await fetch(
      url, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          state: data.state,
          address: data.address,
          type: data.type,
          imageUrl: data.imageUrl,
          rating: data.rating
        })
      }
    );
    return response.json();
  }
}

export default ApiService;

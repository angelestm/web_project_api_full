export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  base(pathURL, config) {
    return fetch(pathURL, config)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(result => result)
        .catch((err) => {
          console.log(err);
        });
  }
  
  getURL(pathURL) {
    return this.base(`${this._baseUrl}${pathURL}`, {
      headers: this._headers
    });
  }
  
  updateURL(method, pathURL, data) {
    let body = null;
    if (data) {
      body = JSON.stringify(data);
    }
    
    const config = {
      method: method,
      headers: this._headers
    }
    
    if (body) {
      config["body"] = body;
    }
    
    return this.base(`${this._baseUrl}${pathURL}`, config);
  }
  
  deleteURL(pathURL) {
    return this.base(`${this._baseUrl}${pathURL}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_07",
  headers: {
    authorization: "ab189ab2-a9a1-466c-bc79-ca9e08e3ee05",
    "Content-Type": "application/json"
  }
});

export default api;
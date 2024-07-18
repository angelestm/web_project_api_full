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
      headers: this._getAuthHeaders()
    });
  }
  
  updateURL(method, pathURL, data) {
    let body = null;
    if (data) {
      body = JSON.stringify(data);
    }
    
    const config = {
      method: method,
      headers: this._getAuthHeaders()
    }
    
    if (body) {
      config["body"] = body;
    }
    
    return this.base(`${this._baseUrl}${pathURL}`, config);
  }
  
  deleteURL(pathURL) {
    return this.base(`${this._baseUrl}${pathURL}`, {
      method: "DELETE",
      headers: this._getAuthHeaders(),
    });
  }
  
  _getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      return this._headers;  // Return the headers without Authorization if no token is found
    }
    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`,
    };
  }
}

const baseUrl = "https://api.aroundweb.robonauts.net";

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
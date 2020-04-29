import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class BooklyApi {
  static async request(endpoint, params = {}, verb = "get") {
    // for now, hardcode a token for user "testuser"
    // let _token = localStorage.getItem("jobly-token");

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(`${BASE_URL}/${endpoint}`, { params });
    } else if (verb === "post") {
      q = axios.post(`${BASE_URL}/${endpoint}`, { ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getBooks(searchTerm, searchCategory, school) {
    console.log(searchTerm, searchCategory, "Zsda");
    let res;
    let parameters = {};
    parameters.school_handle = school;
    if (searchCategory === "Title") {
      parameters.title = searchTerm;
    } else if (searchCategory === "Subject") {
      parameters.subject = searchTerm;
    } else if (searchCategory === "Author") {
      parameters.author = searchTerm;
    }
    console.log(parameters);
    res = await this.request("books", parameters);

    return res.books;
  }

  static async getBook(isbn) {
    let res = await this.request(`books/${isbn}`);
    return res.book;
  }

  static async sendRequest(data) {
    let res = await this.request(`requests`, data, "post");
    return res.data;
  }
  static async getRequests() {
    let res = await this.request(`requests`);

    return res.requests;
  }
}

export default BooklyApi;

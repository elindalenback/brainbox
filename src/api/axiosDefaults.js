import axios from "axios";

axios.defaults.baseURL = "https://brain-box-c3ea3510445f.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
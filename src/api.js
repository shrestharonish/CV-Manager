import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.75:8000", // Replace with your base URL
});

export default {
  loginAPI(data) {
    return api.post("/api/admin/login", data);
  },
  fetchDataTable() {
    return api.get("/api/admin/dashboard");
  },
  addNewUser(data) {
    return api.post("/api/cvinsert", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  allUser() {
    return api.get("/api/admin/alluser");
  },
  delete(id) {
    return api.delete("/api/admin/cvdelete/" + id);
  },
  update(id, data) {
    return api.post(`/api/admin/cvupdate/${id}`, data);
  },
  selectStatus(insert) {
    return api.post("/api/admin/store", insert);
  },
  imageURL() {
    return "/images/cv/";
  },
};

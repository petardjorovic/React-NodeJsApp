import axios from "axios";

class UserService {
  static registerUser = (user) =>
    axios.post("/auth/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  static login = (user) =>
    axios.post("/auth/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
}

export default UserService;

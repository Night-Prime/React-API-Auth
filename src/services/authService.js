import axios from "axios";
import authHeader from "./authHeader";

const URL = "https://light-auto-care-server.herokuapp.com/";

async function request({
    method = "GET, POST, DELETE, PUT, PATCH",
    url,
    data = {},
    useBaseUrl = true,
    dispatch,
    response
}) {
    //get your token

    let baseUrl = {};

    if (useBaseUrl) {
        baseUrl = { baseURL: URL };
    }
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.payload?.token || "";
        console.log(token);
        const result = await axios.request({
            ...baseUrl,

            url,

            method,

            data,

            headers: {
                "authorization": token
            },
            response
        });

        return result.data;
    } catch (err) {
        const error = err?.response?.data || err.msg;

        if (typeof errror == "string") {
            //handle
            throw new Error(error);
        } else {
            const { status, ...rest } = error;
            throw new Error(error);
        }
    }
}
const signUp = async (name, email, password, role) => {
    const response = await axios
        .post(URL + "staffs/signup", {
            name,
            email,
            password,
            role,
        })
        .then((response) => {
            if (response) {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response));
                // localStorage.setItem('token', JSON.stringify(response.payload.token))
            }
        });
    return response;
};

const login = async (email, password) => {
    const response = await axios
        .post(URL + "staffs/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data) {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.getItem(
                    "user",
                    JSON.stringify(response.data.payload.token)
                );
            }
        });
    return response;
};

const logOut = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getAllClients = () => {
    return axios.get(URL + "clients", authHeader());
};

const authService = {
    signUp,
    login,
    logOut,
    getCurrentUser,
    getAllClients,
    request,
};

export default authService;

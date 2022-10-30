// this is acting as an interceptor

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.payload.token) {
        return {
            headers : {
                "authorization": user.payload.token
            }
        }
    } else {
        return {};
    }
}
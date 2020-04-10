export function authHeader() {
    const token = localStorage.getItem('token');
    return token
        ? { 'Authorization': 'Bearer ' + JSON.parse(token) }
        : {};
}
export const environment = {
    apiUrl: window.location.hostname === 'localhost'
        ? 'http://localhost:8080/seov'
        : 'http://192.168.3.11:8080/seov'
};
export const environment = {
    apiUrl: window.location.hostname === 'localhost'
        ? 'http://localhost:8081/seov'
        : 'http://172.17.47.31:8081/seov'
};
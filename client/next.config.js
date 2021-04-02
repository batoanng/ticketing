//fix issue sometimes next js cannot watch and reload changes
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    },
    publicRuntimeConfig: {
        REACT_APP_AUTH_SERVICE: process.env.REACT_APP_AUTH_SERVICE,
    }
};
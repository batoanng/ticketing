//fix issue sometimes next js cannot watch and reload changes
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    } 
};
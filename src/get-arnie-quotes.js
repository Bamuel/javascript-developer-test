const {httpGet} = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {

    // Create an array of promises for each URL
    const promises = urls.map(async (url) => {
        try {
            const response = await httpGet(url);

            if (response.status === 200) {
                const body = JSON.parse(response.body);
                return {'Arnie Quote': body.message};
            } else {
                const body = JSON.parse(response.body);
                return {'FAILURE': body.message};
            }
        } catch (error) {
            return {'FAILURE': error.message};
        }
    });

    // Wait for all promises to resolve and return the results
    return Promise.all(promises);
};

module.exports = {
    getArnieQuotes,
};

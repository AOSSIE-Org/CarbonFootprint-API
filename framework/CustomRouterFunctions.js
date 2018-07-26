// Get the logger
const Logger  = require('@framework/Logger');
/**
 * Creating our custom functions
 */
module.exports = function CustomRouterFunctions(req, res, next) {
    /**
     * Return a success response
     */
    res.sendStatusSuccess = function () {
        return res.status(200).json({ success: true });
    };
    /**
     * Return an error
     */
    res.sendJsonError = function (error, statusCode) {
        Logger.error(`Error: ${error}`);
        return res.status(statusCode).json({ error: error, success: false});
    };
    /**
     * Return a response indicating that the entity requested could not be found
     */
    res.returnNotFoundError = function (entity) {
        Logger.error(`Could not find ${entity}`);
        return res.status(404).json({ error: `Could not find ${entity}` });
    };

    next();
};

// Get the logger
// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');
/**
 * Creating our custom functions
 */
module.exports = function CustomRouterFunctions(req, res, next) {
  /**
   * Return a success response
   */
  res.sendStatusSuccess = () => res.status(200).json({ success: true });
  /**
   * Return an error
   */
  res.sendJsonError = (error, statusCode) => {
    Logger.error(`Error: ${error.message}`);
    if (error.stack) {
      console.log(error.stack);
    }
    return res.status(statusCode).json({ error: error.message, success: false });
  };
  /**
   * Return a response indicating that the entity requested could not be found
   */
  res.returnNotFoundError = entity => {
    Logger.error(`Could not find ${entity}`);
    return res.status(404).json({ error: `Could not find ${entity}` });
  };

  next();
};

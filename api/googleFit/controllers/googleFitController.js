// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');

const { getApiToken, getAccessToken, getFitData } = require('../services/googleFitServices');

exports.fitData = (req, res) => {
  const { userId } = req.body;
  getApiToken()
    .then(apiToken => {
      getAccessToken(userId, apiToken)
        .then(accessToken => {
          getFitData(accessToken)
            .then(data => {
              res.status(200).json({
                success: true,
                data,
              });
            }).catch(err => {
              Logger.error(err.response.data);
              return res.json({ success: false, message: err.response.data });
            });
        }).catch(err => {
          Logger.error(err);
        });
    })
    .catch(err => {
      Logger.error(err);
    });
};

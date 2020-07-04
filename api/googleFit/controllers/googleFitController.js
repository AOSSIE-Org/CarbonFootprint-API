// eslint-disable-next-line import/no-unresolved
const Logger = require('@framework/Logger');

const {
  getApiToken, getAccessToken, getFitData, fillDb,
} = require('../services/googleFitServices');

// to obtain fit data when user logins via google-auth0
exports.fitDataDirect = (req, res) => {
  const { userId } = req.body;
  getApiToken()
    .then(apiToken => {
      getAccessToken(userId, apiToken)
        .then(accessToken => {
          getFitData(accessToken)
            .then(data => {
              fillDb(userId, data)
                .then((result) => {
                  console.log(result);
                }).catch(err => {
                  console.log(err);
                });
              // res.status(200).json({
              //   success: true,
              //   data,
              // });
            }).catch(err => {
              Logger.error(err.response.data.error.message);
              // eslint-disable-next-line max-len
              return res.status(err.response.data.error.code).json({ success: false, message: err.response.data });
            });
        }).catch(err => {
          Logger.error(err);
        });
    })
    .catch(err => res.status(err.response.status).json({ success: false, message: 'Could not find apiToken' }));
};

// to obtain fit data if user does not login through google
exports.fitDataInDirect = (req, res) => {
  const { accessToken } = req.body;
  getFitData(accessToken)
    .then(data => {
      res.status(200).json({
        success: true,
        data,
      });
    }).catch(err => {
      Logger.error(err.response.data.error.message);
      // eslint-disable-next-line max-len
      return res.status(err.response.data.error.code).json({ success: false, message: err.response.data });
    });
};

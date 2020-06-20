// eslint-disable-next-line import/no-unresolved
const { reverseFind } = require('../services/reverseLookupServices');

exports.comparer = (req, res) => {
  const { emissions } = req.body;
  const { section } = req.body;
  const relativeLocation = req.body.relativeLocation || null;
  reverseFind(emissions, section, relativeLocation)
    .then(match => {
      res.status(200).json({
        success: true,
        matches: match,
      });
    })
    .catch(err => {
      res.sendJsonError(err, 404);
    });
};

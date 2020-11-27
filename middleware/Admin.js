let message = require('../lang/admin/en.json');
const BaseController = require('../controller/Admin/BaseController');
const { status, responseStatus } = require('../services/status');

module.exports.beforeLogin = (req, res, next) => {
  let lang = (!req.headers.lang || false || req.headers.lang === "") ? "en" : req.headers.lang;
  try {
    if (lang === "en" || lang === "ar") {
      let contype = req.headers['content-type'];
      if (!contype || contype.indexOf('application/json') === 0 ||
        contype.indexOf('multipart/form-data') === 0 ||
        contype.indexOf('application/x-www-form-urlencoded') === 0) {
        global.message = require('../lang/admin/' + lang + ".json");
        next();
      } else {
        BaseController.errorResponse("Request must be in json format or url-encoded.", res, status.BadRequest);
      }
    } else return BaseController.errorResponse("You selected invalid language.", res, status.BadRequest);
  } catch (error) {
    BaseController.errorResponse(error, res, status.BadRequest);
  }
};

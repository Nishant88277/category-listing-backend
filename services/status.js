const responseStatus = {
    OK: 200,
    Create: 201,
    Deleted: 204,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    Forbidden: 403,
    NotAcceptable: 406,
    ExpectationFailed: 417,
    Locked: 423,
    InternalServerError: 500
};

const status = {
    OK: 200,
    Fail: 0,
    Success: 1,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    Forbidden: 403,
};

module.exports = {
    responseStatus,
    status
};

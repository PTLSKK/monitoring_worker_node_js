const response = {
  build: (message, statusCode, statusType, object) => {
    return {
      statusCode: statusCode,
      message: message,
      statusType: statusType,
      data: object
    };
  },
  error: (message, statusCode, statusType, object) => {
    return {
      statusCode: statusCode,
      message: message,
      statusType: statusType,
      error: object
    };
  }
};

module.exports = response;

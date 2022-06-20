class ErrorHandler {
  constructor() {}

  static logError({ error, message, functionName, fileName, moduleName }) {
    console.error(
      `Error ${message} [${functionName} - ${fileName} - ${moduleName}] |`,
      error
    );
    return;
  }

  static graphQlError({
    error,
    message,
    functionName,
    fileName,
    moduleName,
    typeDataResponse,
  }) {
    console.error(
      `Error ${message} [${functionName} - ${fileName} - ${moduleName}] |`,
      error
    );

    return {
      code: 500,
      success: false,
      message: `Error ${message}`,
      data: typeDataResponse,
    };
  }

  static restError({
    error,
    message,
    functionName,
    fileName,
    moduleName,
    res,
  }) {
    console.error(
      `Error ${message} [${functionName} - ${fileName} - ${moduleName}] |`,
      error
    );

    if (res) {
      res.status(500).json(`Error ${message}`);
    }
  }
}
module.exports = ErrorHandler;

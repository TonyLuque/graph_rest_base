class ErrorHandler {
  constructor() {}

  static GraphQlError({
    error,
    message,
    functionName,
    fileName,
    moduleName,
    res,
  }) {
    console.error(
      `Error ${message} [${functionName} - ${fileName} - ${moduleName}] | ${error}`
    );

    if (res) {
      res.status(500).json(`Error ${message}`);
    }
  }
}

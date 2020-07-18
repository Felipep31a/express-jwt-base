class NotFoundException extends Error {
    statusCode: number = 404;
    constructor() {
      super();
    }
  }
  
  export default NotFoundException;
  
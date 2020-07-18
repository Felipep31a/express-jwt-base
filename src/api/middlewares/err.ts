import BadParamsException from "../exceptions/bad_params";
import ErrorHandler from "../exceptions/err";
import NotFoundException from "../exceptions/not_found";

export function erroHandlerMiddleware(error: any, res: any) {
  if (error instanceof NotFoundException) {
    return res
      .status(404)
      .json({ error: "Não encontrado" });
  }

  if (error instanceof BadParamsException) {
    return res
      .status(400)
      .json({ error: error.messages });
  }

  if (error instanceof ErrorHandler) {
    return res
      .status(error.statusCode)
      .json(error.message);
  }

  return res
    .status(500)
    .send();
}

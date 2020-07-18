import { getRepository } from "typeorm";
import { validate } from "class-validator";
import ErrorHandler from "../exceptions/err";

class BaseService<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  getAlls = async (limit = 15, offset = 0): Promise<Array<T>> => {
    const repository = getRepository(this.model);
    let array;
    try {
      array = await repository.find({ take: limit, skip: offset });
    } catch (error) {
      throw new ErrorHandler(401, "");
    }

    return array;
  };

  createEntity = async (data: T) => {
    let model: T = new this.model();
    model =  data ;

    const errors = await validate(model);
    if (errors.length > 0) {
      throw new ErrorHandler(400, JSON.stringify(errors));
    }

    const repository = getRepository(this.model);
    try {
      await repository.save(model);
    } catch (e) {
      throw new ErrorHandler(409);
    }

    return;
  };
}

export default BaseService;

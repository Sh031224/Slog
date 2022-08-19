import axios from "axios";
import BadRequestError from "../models/error/bad-request-error";
import UnauthorizedError from "../models/error/unauthorized-error";

type FacebookValidateResponse = {
  error?: any;
  id: string;
  name: string;
};

export default class FacebookLogin {
  getInfo = async (token: string) => {
    try {
      const { data } = await axios.get<FacebookValidateResponse>(
        `https://graph.facebook.com/v7.0/me?access_token=${token}&fields=id,name&format=json&method=get&transport=cors`
      );

      if (data.error) {
        throw new UnauthorizedError(data.error.toString());
      }

      return { id: data.id, name: data.name };
    } catch (err) {
      const errorMessage = err as any;

      throw new BadRequestError(errorMessage?.message);
    }
  };
}

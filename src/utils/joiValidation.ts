import Joi from "joi";
import { LoginInputType } from "./types";

interface JoiReturnType {
  status: boolean;
  message: string;
}

class JoiUtils {
  private loginSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
      .required()
      .label("Email"),
    password: Joi.string().alphanum().min(8).required().label("Password"),
    captcha: Joi.string().length(5).required().label("Captcha"),
  });

  public validateLoginData(loginData: LoginInputType): JoiReturnType {
    const { error, value } = this.loginSchema.validate(loginData);
    if (error) {
      return { status: false, message: error.details[0].message };
    }
    if (value) {
      return { status: true, message: value.message };
    }
    return { status: true, message: value.message };
  }
}

export const joiUtils = new JoiUtils();

import Joi from "joi";
import { LoginInputType, NewCompanyType } from "./types";

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

  private newCompanySchema = Joi.object({
    name: Joi.string().required().label("Company name"),
    location: Joi.string().required().label("Company location"),
    website: Joi.string().required().label("Company website"),
    deadline: Joi.string().required().label("Company deadline"),
    description: Joi.string().required().label("Company description"),
  });

  public validateNewCompanyData(newCompanyData: NewCompanyType): JoiReturnType {
    const { error, value } = this.newCompanySchema.validate(newCompanyData);
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

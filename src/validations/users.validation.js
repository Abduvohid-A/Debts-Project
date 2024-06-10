import Joi from "joi";


export const createAndUpdateUserValidation = async (body) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error, value } = await schema.validate(body);

    if (error) {
      return {
        ok: false,
        statuss: 400,
        messages: error.details[0].message,
        value: "",
      };
    }

    return {
      ok: true,
      statuss: 201,
      messages: "",
      value,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      statuss: 400,
      messages: error.message,
      value: "",
    };
  }
};

export const otpValidation = async (body) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().min(6).max(6).required(),
    });

    const { error, value } = await schema.validate(body);

    if (error) {
      return {
        ok: false,
        statuss: 400,
        messages: error.details[0].message,
        value: "",
      };
    }

    return {
      ok: true,
      statuss: 201,
      messages: "",
      value,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      statuss: 400,
      messages: error.message,
      value: "",
    };
  }
};

export const loginValidation = async (body) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error, value } = await schema.validate(body);

    if (error) {
      return {
        ok: false,
        statuss: 400,
        messages: error.details[0].message,
        value: "",
      };
    }

    return {
      ok: true,
      statuss: 201,
      messages: "",
      value,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      statuss: 400,
      messages: error.message,
      value: "",
    };
  }
};

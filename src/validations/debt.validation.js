import Joi from "joi";

export const createAndUpdateDebtValidation = (body) => {
  try {
    const schema = Joi.object({
      amount: Joi.number().required(),
      description: Joi.string().required(),
      debtor_email: Joi.string().email().required(),
      due_date: Joi.date().required(),
      status: Joi.string().valid("new", "paid", "cancelled").required(),
    });

    const { error, value } = schema.validate(body);

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

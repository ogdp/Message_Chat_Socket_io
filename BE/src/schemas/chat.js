import Joi from "joi";

const chatSchema = Joi.object({
  peopleID: Joi.any().required().messages({
    "string.empty": "{#name} không được bỏ trống",
  }),
  userID: Joi.any().required().messages({
    "string.empty": "{#name} không được bỏ trống",
  }),
  chatID: Joi.string().required().messages({
    "string.empty": "{#name} không được bỏ trống",
  }),
  nameUser: Joi.string().required().messages({
    "string.empty": "{#name} không được bỏ trống",
  }),
  message: Joi.string().min(1).required().messages({
    "string.empty": "Tin nhắn không được bỏ trống",
    "string.min": "Tin nhắn tối thiểu {#limit} ký tự",
    "any.required": "Tin nhắn là trường bắt buộc",
  }),
});
export default chatSchema;

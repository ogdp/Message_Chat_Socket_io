import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được bỏ trống",
    "any.required": "Tên là trường bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được bỏ trống",
    "string.email": "Email không hợp lệ",
    "any.required": "Email là trường bắt buộc",
  }),
  address: Joi.string().min(10).required().messages({
    "string.empty": "Địa chỉ không được bỏ trống",
    "string.min": "Địa chỉ tối thiểu {#limit} ký tự",
    "any.required": "Địa chỉ là trường bắt buộc",
  }),
  refreshToken: Joi.any(),
  gender: Joi.any(),
  tel: Joi.string().min(10).required().messages({
    "string.empty": "Số điện thoại không được bỏ trống",
    "string.min": "Số điện thoại tối thiểu {#limit} ký tự",
    "any.required": "Số điện thoại là trường bắt buộc",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được bỏ trống",
    "string.min": "Mật khẩu tối thiểu {#limit} ký tự",
    "any.required": "Mật khẩu là trường bắt buộc",
  }),
  confirmPassword: Joi.any(),
});
export default userSchema;

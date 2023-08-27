import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên sản phẩm không được bỏ trống",
    "any.required": "Tên sản phẩm là trường bắt buộc",
  }),
  price: Joi.number().required().messages({
    "number.empty": "Giá sản phẩm không được bỏ trống",
    "number.base": "Giá sản phẩm phải là số",
    "any.required": "Giá sản phẩm là trường bắt buộc",
  }),
  quantity: Joi.number().required().messages({
    "number.empty": "Số lượng sản phẩm không được bỏ trống",
    "number.base": "Số lượng sản phẩm phải là số",
    "any.required": "Số lượng sản phẩm là trường bắt buộc",
  }),
  description: Joi.any(),
  image: Joi.array().required().messages({
    "string.empty": "Hình ảnh không được bỏ trống",
    "any.required": "Hình ảnh là trường bắt buộc",
  }),
  note: Joi.any(),
  size: Joi.any(),
  status: Joi.any(),
  categoryId: Joi.string().required().messages({
    "string.empty": "Danh mục sản phẩm không được bỏ trống",
    "any.required": "Danh mục sản phẩm là trường bắt buộc",
  }),
});
export default productSchema;

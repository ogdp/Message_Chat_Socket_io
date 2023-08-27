import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Danh mục không được bỏ trống",
    "any.required": "Danh mục là trường bắt buộc",
  }),
  images: Joi.any(),
  productId: Joi.any(),
});
export default categorySchema;

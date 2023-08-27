import Category from "../models/category.js";
import categorySchema from "../schemas/category.js";
export const getAll = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(400).json({
        message: "Danh mục rỗng",
      });
    }
    return res.status(200).json({
      message: "Danh sách danh mục",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "Danh mục rỗng",
      });
    }
    return res.status(200).json({
      message: "Lấy danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = await categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const category = await Category.create(req.body);
    return res.status(200).json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = await categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "Xoá danh mục thất bại",
      });
    }
    return res.status(200).json({
      message: "Xoá danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

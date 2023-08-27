import Product from "../models/product.js";
import productSchema from "../schemas/product.js";

export const getAll = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _sort = "createdAt",
      _limit = 10,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
    };
    const product = await Product.paginate({}, options);
    const { totalDocs } = await product;
    if (!totalDocs || totalDocs === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
        product,
      });
    }
    return res.status(200).json({
      message: "Danh sách sản phẩm",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const getAllStatus = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _sort = "createdAt",
      _limit = 10,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
    };
    const product = await Product.paginate({ status: true }, options);
    const { totalDocs } = await product;
    if (!totalDocs || totalDocs === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
        product,
      });
    }
    return res.status(200).json({
      message: "Danh sách sản phẩm",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "Sản phẩm không tồn tại",
      });
    }
    return res.status(200).json({
      message: "Lấy sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = await productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const product = await Product.create(req.body);
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const updateFollowCategoryId = async (req, res) => {
  try {
    const find = {
      categoryId: req.body.categoryIdOld,
    };
    const update = {
      categoryId: req.body.categoryIdNew,
    };
    const product = await Product.updateMany(find, update, { new: true });
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = await productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "Xoá sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Xoá sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const search = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _sort = "createdAt",
      _limit = 10,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
    };
    const product = await Product.paginate(
      {
        $or: [
          {
            name: {
              $regex: req.params.key,
              $options: "i",
            },
            status: true,
          },
        ],
      },
      options
    );
    const { totalDocs } = await product;
    if (!totalDocs || totalDocs === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
        product,
      });
    }
    return res.status(200).json({
      message: "Danh sách sản phẩm",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

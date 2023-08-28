import Chat from "../models/chat.js";
import chatSchema from "../schemas/chat.js";

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
    const chat = await Chat.paginate({}, options);
    const { totalDocs } = await chat;
    if (!totalDocs || totalDocs === 0) {
      return res.status(404).json({
        message: "Không tìm thấy tin nhắn",
        chat,
      });
    }
    return res.status(200).json({
      message: "Danh sách tin nhắn",
      chat,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const {
      _page = 1,
      _order = "asc",
      _sort = "createdAt",
      _limit = 20,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? 1 : -1,
      },
    };
    const chat = await Chat.paginate(
      {
        chatID: req.params.id,
      },
      options
    );
    if (chat.totalDocs == 0) {
      return res.status(200).json({
        message: "Tin nhắn không tồn tại",
      });
    }
    return res.status(200).json({
      message: "Lấy tin nhắn thành công",
      chat,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = await chatSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const chat = await Chat.create(req.body);
    return res.status(200).json({
      message: "Thêm tin nhắn thành công",
      chat,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = await chatSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    const chat = await Chat.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      message: "Cập nhật tin nhắn thành công",
      chat,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(400).json({
        message: "Xoá tin nhắn thất bại",
      });
    }
    return res.status(200).json({
      message: "Xoá tin nhắn thành công",
      chat,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

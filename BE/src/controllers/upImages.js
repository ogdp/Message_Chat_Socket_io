import cloudinary from "../configs/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);
    return res.status(201).json({ urls: images });
  } catch (error) {
    return res.status(200).json({ message: "Error upload image" });
  }

  // VÍ DỤ Ở FRONTEND POST IMAGE
  // const formData = new FormData();
  //     for (const imgItem of values.images.fileList) {
  // imgItem có kiểu
  // ==
  // File
  // uid: "rc-upload-1689348781045-5"
  // lastModified:1689348793647
  // lastModifiedDate:Fri Jul 14 2023 22:33:13 GMT+0700 (Giờ Đông Dương) {}
  // name:"62c53d1b11f7c1a998e6.jpg"
  // size:474151
  // type:"image/jpeg"
  // webkitRelativePath:""
  // [[Prototype]]:File
  // ==
  //       formData.append("images", imgItem.originFileObj);
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:8080/api/images/upload",
  //       formData
  //     );
  //     console.log(data.urls);
  // ==========================================

  console.log(images);
  let i = 0;
  const uploadedImages = [];
  i++;
  console.log("Mấy lần", i);
  for (const image of images) {
    try {
      const result = await cloudinary.uploader.upload(image);
      // console.log(result);
      console.log("Thanh cong");
      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      //   console.log("That bai");
      console.log(error);
    }
  }
  return res.json({ urls: uploadedImages });
};

export const deleteImage = async (req, res) => {
  const publicId = req.params.publicId;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ message: "Xóa ảnh thành công", result });
  } catch (error) {
    res.status(500).json({ error: "Error deleting image" });
  }
};
export const updateImage = async (req) => {
  return res.json({ urls: "ok" });
  const publicId = req.params.publicId; // Lấy publicId của ảnh cần cập nhật
  const newImage = req.files[0].path; // Lấy đường dẫn của ảnh mới

  try {
    // Upload ảnh mới lên Cloudinary
    const result = await cloudinary.uploader.upload(newImage);

    // Xóa ảnh cũ với publicId tương ứng
    await cloudinary.uploader.destroy(publicId);

    // Trả về kết quả với url và publicId của ảnh mới
    return res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error updating image" });
  }
};

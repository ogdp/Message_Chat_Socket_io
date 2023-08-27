import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`
    ===========================
    MongoDB Connected !!!
    NAME_DB::: ${conn.connection.name}
    URL::: ${uri}
    ===========================
    `);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;

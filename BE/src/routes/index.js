import express from "express";
import routerUser from "./user.js";
import routerProduct from "./product.js";
import routerCategories from "./category.js";
import routerChat from "./chat.js";
import routerAuth from "./auth.js";
import routerToken from "./token.js";
import upImages from "./upImages.js";

const Router = express.Router();

Router.use("/users", routerUser);
Router.use("/products", routerProduct);
Router.use("/categories", routerCategories);
Router.use("/chat", routerChat);
Router.use("/", routerAuth);
Router.use("/", routerToken);
Router.use("/", upImages);
export default Router;

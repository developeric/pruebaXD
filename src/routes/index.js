import { Router } from "express";
import { userRouter } from "./user.route.js";
import { articleRoutes } from "./article.route.js";
import { routesTag } from "./tag.routes.js";
import { commentRoutes } from "./comment.routes.js";
import { authRoute } from "./auth.route.js";
import { article_tagRoute } from "./article_tag.route.js";

export const routes = Router();

routes.use(userRouter);
routes.use(articleRoutes);
routes.use(routesTag);
routes.use(commentRoutes);
routes.use(authRoute);
routes.use(article_tagRoute);

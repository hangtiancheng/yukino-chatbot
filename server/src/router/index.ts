import Router from "@koa/router";
import { aiRouter } from "./ai";
import { fileRouter } from "./file";
import { userRouter } from "./user";

export function initRouter(): Router {
	const router = new Router({ prefix: "/api/v1" });

	router.use("/user", userRouter().routes(), userRouter().allowedMethods());

	router.use("/ai", aiRouter().routes(), aiRouter().allowedMethods());

	router.use("/file", fileRouter().routes(), fileRouter().allowedMethods());

	return router;
}

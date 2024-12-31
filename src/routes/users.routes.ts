import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { asyncHandler } from "../middlewares/error.middleware";

const userRouter = Router();

userRouter.get("/", asyncHandler(userController.list.bind(userController)));
userRouter.post("/", asyncHandler(userController.create.bind(userController)));

export { userRouter };

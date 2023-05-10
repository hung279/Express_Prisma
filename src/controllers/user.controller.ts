import { Request, Response, NextFunction } from "express";
import { BaseController } from "./abstractions/base.controller";

export default class UserController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  getUsers = async (req: Request, res: Response) => {
    const users = await this.prisma.user.findMany();
    
    res.status(200).json({ data: users });
  }
  
  addUser = async (req: Request, res: Response) => {
    const data = req.body
    const newUser = await this.prisma.user.create({
      data
    });

    res.status(201).json({ data: newUser });
  }

  getUserById = async (req: Request, res: Response) => {
    const userId:string = req.params.id;
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    res.status(200).json({ data: user });
  }

  updateUserById = async (req: Request, res: Response) => {
    const userId:string = req.params.id;
    const user = await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: req.body,
    });

    res.status(200).json({ data: user });
  }

  deleteUserById = async (req: Request, res: Response) => {
    const userId:string = req.params.id;
    await this.prisma.user.delete({
      where: {
        id: userId,
      }
    });

    res.status(200).json();
  }

  public initializeRoutes() {
    this.router.get("/users", this.getUsers);
    this.router.post("/users", this.addUser);
    this.router.patch("/users/:id", this.updateUserById);
    this.router.delete("/users/:id", this.deleteUserById);
    this.router.get("/users/:id", this.getUserById);
  }
}
import cors from "cors";
import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

const app = express();
app.use(express.json());
app.use(cors<Request>());

const prisma = new PrismaClient();

const Errors = {
  UsernameAlreadyTaken: "UserNameAlreadyTaken",
  EmailAlreadyInUse: "EmailAlreadyInUse",
  ValidationError: "ValidationError",
  ServerError: "ServerError",
  ClientError: "ClientError",
  UserNotFound: "UserNotFound",
};

function generateRandomPassword(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const passwordArray = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    passwordArray.push(charset[randomIndex]);
  }

  return passwordArray.join("");
}

// We don't want to return the password within the request
function parseUserForResponse(user: User) {
  const returnData = JSON.parse(JSON.stringify(user));
  delete returnData.password;
  return returnData;
}

// Create a new user
app.post("/users/new", async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    //Request validations
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.firstName ||
      !req.body.lastName
    ) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // Check if the user exists or not
    const existingUserByEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (existingUserByEmail) {
      return res.status(409).json({
        error: Errors.EmailAlreadyInUse,
        data: undefined,
        success: false,
      });
    }

    // Check if the user exists or not
    const existingUserByUsername = await prisma.user.findFirst({
      where: { username: req.body.username },
    });

    if (existingUserByUsername) {
      return res.status(409).json({
        error: Errors.UsernameAlreadyTaken,
        data: undefined,
        success: false,
      });
    }

    const user = await prisma.user.create({
      data: { ...userData, password: generateRandomPassword(10) },
    });

    return res.status(201).json({
      error: undefined,
      data: parseUserForResponse(user),
      succes: true,
    });
  } catch (error) {
    console.log(error);
    // Return a failure error response
    return res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    });
  }
});
// Edit a user
app.post("/users/edit/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      });
    }

    // Check if the user exists or not
    const existingUserByEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (existingUserByEmail) {
      return res.status(409).json({
        error: Errors.EmailAlreadyInUse,
        data: undefined,
        success: false,
      });
    }

    // Check if the user exists or not
    const existingUserByUsername = await prisma.user.findFirst({
      where: { username: req.body.username },
    });

    if (existingUserByUsername) {
      return res.status(409).json({
        error: Errors.UsernameAlreadyTaken,
        data: undefined,
        success: false,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    return res.status(201).json({
      error: undefined,
      data: parseUserForResponse(updatedUser),
      succes: true,
    });
  } catch (error) {
    console.log(error);
    // Return a failure error response
    return res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    });
  }
});

// Get a user by email
app.get("/users", async (req: Request, res: Response) => {
  try {
    let userEmail = req.query.email;

    if (Array.isArray(userEmail) || typeof userEmail !== "string") {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }
    const user = await prisma.user.findFirst({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      });
    }

    return res.status(201).json({
      error: undefined,
      data: parseUserForResponse(user),
      succes: true,
    });
  } catch (error) {
    console.log(error);
    // Return a failure error response
    return res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

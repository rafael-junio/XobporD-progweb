import { Router } from "express";
import authMiddleware from "../middleware/auth";
import userController from "../controller/users";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/users", (req, res) => {
  const users = [];
  userController.list().then((user) => {
    user.forEach((u) => {
      const user = {
        email: u.email,
        id: u.id,
      };
      users.push(user);
    });
    res.render("users", { users });
  });
});

router.post("/login", authMiddleware.signIn, (req, res) => {
  res.redirect("/users/home");
});

router.get("/logout", authMiddleware.signOut, (req, res) => {
  res.redirect("/login");
});

router.post("/register", async (req, res) => {
  const errors = [];
  const formContent = { email: req.body.email };
  if (userController.isValidFormRegister(req.body)) {
    const userData = {};
    userData.email = req.body.email;
    userData.password = req.body.password;
    userController.register(userData);
    const successe = "Successful registration!";
    res.render("login", { successe });
  } else {
    errors.push({ msg: "Error registering" });
    res.render("register", { errors, formContent });
  }
});

router.post("/update", async (req, res) => {
  const errors = [];
  if (userController.isValidFormRegister(req.body)) {
    const userData = {};
    userData.email = req.body.email;
    userData.password = req.body.password;
    userController.update(userData);
    const successe = "Successful update!";
    res.render("login", { successe });
  } else {
    errors.push({ msg: "Error update" });
    res.render("update", { errors, formContent });
  }
});

export default router;

import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer.config";
import uploadController from "../controller/upload";
import userController from "../controller/users";

const router = Router();

router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadController.showAll().then((result) => res.render("home", { result }));
  }
);

router.get(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.render("upload", { result: undefined })
);

router.get(
  "/delete/:idUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userController.delete(req.params.idUser).then(() => {
      res.redirect("/users");
    });
  }
);

router.get(
  "/edit/:idUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userController.findUser(req.params.idUser).then((m) => {
      const formContent = { email: m.email };
      res.render("update", { formContent });
    });
  }
);

router.get(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.render("upload", { result: undefined });
  }
);

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  async (req, res) => {
    const payload = await jwt.verify(
      req.signedCookies.xobpord,
      process.env.JWT_SECRET,
      { ignoreExpiration: true }
    );
    uploadController.register(req, res, payload);
  }
);

export default router;

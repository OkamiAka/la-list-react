const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./middleware/auth");

const itemControllers = require("./controllers/itemControllers");

const userControllers = require("./controllers/userControllers");

const licenceControllers = require("./controllers/licenceControllers");

const marqueControllers = require("./controllers/marqueControllers");

const figurineControllers = require("./controllers/figurineControllers");

const popControllers = require("./controllers/popControllers");

const mugControllers = require("./controllers/mugControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.post(
  "/login",
  userControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword
);

router.get("/user", verifyToken, userControllers.user);
router.get("/users/liste", userControllers.allliste);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.get("/licences", licenceControllers.browse);
router.get("/licences/:id", licenceControllers.read);
router.put("/licences/:id", licenceControllers.edit);
router.post("/licences", licenceControllers.add);
router.delete("/licences/:id", licenceControllers.destroy);

router.get("/marques", marqueControllers.browse);
router.get("/marques/:id", marqueControllers.read);
router.put("/marques/:id", marqueControllers.edit);
router.post("/marques", marqueControllers.add);
router.delete("/marques/:id", marqueControllers.destroy);

router.use(verifyToken);

router.get("/figurines", figurineControllers.browse);
router.get("/figurines/:id", figurineControllers.findlist);
router.put("/figurines/:id", figurineControllers.edit);
router.put("/figurines/:id/view", figurineControllers.view);
router.post("/figurines", figurineControllers.add);
router.delete("/figurines/:id", figurineControllers.destroy);

router.get("/pops", popControllers.browse);
router.get("/pops/:id", popControllers.findlist);
router.put("/pops/:id", popControllers.edit);
router.put("/pops/:id/view", popControllers.view);
router.post("/pops", popControllers.add);
router.delete("/pops/:id", popControllers.destroy);

router.get("/mugs", mugControllers.browse);
router.get("/mugs/:id", mugControllers.findlist);
router.put("/mugs/:id", mugControllers.edit);
router.put("/mugs/:id/view", mugControllers.view);
router.post("/mugs", mugControllers.add);
router.delete("/mugs/:id", mugControllers.destroy);

module.exports = router;

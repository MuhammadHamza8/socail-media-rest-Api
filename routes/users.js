
const router = require("express").Router();

const userController = require("../controllers/userController");

//update user
router.put("/update/:id", userController.updateUser);
//delete user
router.delete("/delete/:id",userController.deleteUser);
//get a user
router.get("/getOne/:id", userController.getUser);
//follow a user
router.put("/:id/follow", userController.followUser);

//unfollow a user
router.put("/:id/unfollow",userController.unfollowUser );

module.exports = router;
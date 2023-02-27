const router = require("express").Router();
const postController = require("../controllers/postController");


//create a post
router.post("/insert", postController.create);
//update a post
router.put("/update/:id", postController.update);
//delete a post
router.delete("/:id", postController.delete);
//like / dislike a post
router.put("/:id/like", postController.likes_dislikes);
//get a post
router.get("/getOne/:id", postController.getPost)

//get timeline posts
router.get("/timeline/all", postController.getTimeline);

module.exports = router;
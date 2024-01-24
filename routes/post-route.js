const express = require("express")
const postController = require("../controllers/post-controller")

const router = express.Router();

router.get("/",postController.getAllpost)
router.get("/:postID",postController.getPostByID)
router.post("/",postController.createPost)
router.put("/:postID",postController.updatePost)
router.delete("/:postID",postController.deletePost)

module.exports = router;

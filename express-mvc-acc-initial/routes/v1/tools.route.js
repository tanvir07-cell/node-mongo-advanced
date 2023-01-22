const {
  getAllTools,
  postAllTools,
  getToolById,
  updateTool,
  deleteTool,
} = require("../../controllers/tools.controller");

const router = require("express").Router();

router.route("/").get(getAllTools).post(postAllTools);

router.route("/:id").get(getToolById).patch(updateTool).delete(deleteTool);

module.exports = router;

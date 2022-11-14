const { Router } = require("express");

const Space = require("../models").space;
const Story = require("../models").story;
const router = new Router();

router.get("/stories", async (req, res, next) => {
  try {
    const allStories = await Story.findAll({ order: [["createdAt", "DESC"]] });
    res.json(allStories);
  } catch (e) {
    next(e);
  }
});

router.post("/stories", async (req, res, next) => {
  try {
    const { name, content, imageUrl, spaceId } = req.body;
    if (!name || !content || !imageUrl || !spaceId) {
      res
        .status(400)
        .send("name, content, imageUrl, and spaceId must be entered");
    } else {
      const newStory = await Story.create({
        name,
        content,
        imageUrl,
        spaceId,
      });
      res.json(newStory);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

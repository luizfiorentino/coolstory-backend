const { Router } = require("express");
const { sequelize } = require("../models");
const authMiddleware = require("../auth/middleware");
const Space = require("../models").space;
const Story = require("../models").story;
const User = require("../models").user;
const router = new Router();

router.get("/spaces", async (req, res, next) => {
  try {
    const allSpaces = await Space.findAll({ raw: true });
    res.json(allSpaces);
  } catch (e) {
    next(e);
  }
});

router.get("/spaces/:id", async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);

    const thisSpace = await Space.findByPk(spaceId, {
      order: [[Story, "createdAt", "DESC"]],
      include: [
        {
          model: Story,
        },
      ],
    });
    res.json(thisSpace);
  } catch (e) {
    next(e);
  }
});

router.put("/spaces/:id", authMiddleware, async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);
    const { title, description, backgroundColor, color } = req.body;

    const thisSpace = await Space.findByPk(spaceId);
    if (!thisSpace) {
      res.status(400).send("Character not found");
    } else {
      const spaceUpdated = await thisSpace.update({
        title,
        description,
        backgroundColor,
        color,
      });
      res.send(spaceUpdated);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/spaces/:id", async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);
    const spaceToDelete = await Space.findByPk(spaceId);
    if (!spaceToDelete) {
      res.status(400).send("Space not found");
    } else {
      const spaceDeleted = spaceToDelete.destroy();
      res.status(200).send("space deleted:");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

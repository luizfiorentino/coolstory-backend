const { Router } = require("express");
const { sequelize } = require("../models");
const authMiddleware = require("../auth/middleware");
const Space = require("../models").space;
const Story = require("../models").story;
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
// router.post("/spaces", async (req, res, next) => {
//   // title: `<MyName>'s space`
//   // - description: null
//   // - backgroundColor: #ffffff (white)
//   // - color: #000000 (black)
//   try {
//     const { title, description, backgroundColor, color, userId } = req.body;
//     const newSpace = await Space.create({
//       title,
//       description,
//       backgroundColor,
//       color,
//       userId,
//     });
//     res.json(newSpace);
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;

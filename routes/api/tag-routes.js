const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try {
  const tags = await Tag.findAll({include : [{  model: Product, as: 'prodtag' }]});
  res.json(tags)

}catch (e) {
  res.json([])
}

});

router.get('/:id',async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {include : [{  model: Product, as: 'prodtag' }]});
    res.json(tag);
  } catch (e) {
    res.json({});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const result = await Tag.create({
      tag_name: req.body.tag_name,
    });

    if (result) res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const result = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (result) res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const result = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result) res.json({ success: true });
  } catch (e) {
    console.log(e)
    res.json({ success: false });
  }
});

module.exports = router;

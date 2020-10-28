const router = require("express").Router();
const { Category, Product } = require("../../models");

const sequelize = require("../../config/connection");

const mysql = require("mysql2/promise");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  // const connection = await  mysql.createConnection({
  //   user: 'root',
  //   host: 'localhost',
  //   password: '',
  //   database: 'ecommerce_example'
  // })

  //   Category.findAll({include: [{model: Product}]}).then(ans => {
  //     res.json(ans);
  // }).catch(err => {
  //  console.log(err);
  //  res.status(500).json(err);
  // });
  // });

  try {
    // const [cats, fields] = await connection.execute('SELECT * FROM category')
    const categories = await Category.findAll({include: [{model: Product}]});
    // const result = (await categories).map(categories=> categories instanceof Category)
    res.json(categories);
  } catch (e) {
    console.log(e);
  }
  // res.json({
  //   cats: cats,
  // });
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const category = await Category.findByPk(req.params.id);
    res.json(category);
  } catch (e) {
    res.json({ success: false });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const result = await Category.create({
      category_name: req.body.category_name,
    });

    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const result = await Category.update(
      { category_name: req.body.category_name },
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

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const result = await Category.destroy({
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

/**
 * CRUD
 * Create - POST
 * Read - GET
 * Update - PUT
 * Delete - DELETE
 *
 */

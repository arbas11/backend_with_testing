const { models } = require("../storage");
const AppError = require("../utilities/appError");

const getAllProduct = async (req, res) => {
  const products = await models.products.findAll();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(200).json({
      item: "no product available",
    });
  }
};

const getProductByID = async (req, res, next) => {
  const { prodid, id } = req.params;
  const product = await models.products.findOne({
    where: {
      id: prodid,
      merchant_id: id,
    },
  });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      item: "Product doesn't exist",
    });
  }
};
const addNewProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  if (req.body.id) {
    res.status(400).send({
      error:
        "id should not be provided, since it is determined automatically by the database",
    });
  } else {
    const id = req.cookies.uid;
    await models.products
      .create({
        name: name,
        quantity: quantity,
        price: price,
        merchant_id: id,
      })
      .then(function (item) {
        res.status(200).json({
          status: {
            add: "successfully added!",
          },
          product: {
            item,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: "something went wrong",
        });
      });
  }
};

const updateProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  const { prodid, id } = req.params;

  await models.products
    .update(
      {
        name: name,
        quantity: quantity,
        price: price,
      },
      {
        where: {
          id: prodid,
          merchant_id: id,
        },
      }
    )
    .then((product) => {
      res.status(200).json({
        instruction: {
          status: "sucessfully update",
        },
        product: {
          product,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "something went wrong",
      });
    });
};

const removeProduct = async (req, res) => {
  const { prodid } = req.params;
  const id = req.cookies.uid;
  await models.products
    .destroy({
      where: {
        id: prodid,
        merchant_id: id,
      },
    })
    .then((item) => {
      res.status(200).json({
        instruction: {
          status: "sucessfully delete",
        },
        product: {
          item,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "something went wrong",
      });
    });
  res.status(200).json({ success: true });
};

// const createMany = async () => {
//   await models.products
//     .bulkCreate([
//       {
//         id: "f8bab835-cd9d-4b72-bb34-8a1a1a67ff59",
//         name: "Kutang",
//         price: 450000,
//         stock: 45,
//         category: "Pakaian dalam",
//         description:
//           "ini pakaian dalam terbaik bahan adem dan nyaman. silahkan di coba ya teman2",
//         picture:
//           "http://cdn.shopify.com/s/files/1/0090/4773/6378/products/born-tough-black-sleeveless-running-shirt-for-men_5.jpg?v=1605876591",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//       {
//         id: "b3d89f38-60bf-46a6-8586-d2ec5b4c50b2",
//         name: "jumpsuit",
//         price: 150000,
//         stock: 15,
//         category: "New arrival",
//         description:
//           "this new arrival item is trending cool for the youth and stylish",
//         picture:
//           "https://media.missguided.com/s/missguided/M99907457_set/1/blue-stripe-wrap-front-belted-jumpsuit",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//       {
//         id: "4e864fe1-f158-4178-9304-0d5c1c17d8f1",
//         name: "jaket kulit buaya",
//         price: 750000,
//         stock: 75,
//         category: "mens fashion",
//         description:
//           "this cool leather jacket will make a man look awesome! trust me",
//         picture:
//           "https://www.navaapparel.co.za/wp-content/uploads/sites/2/2019/04/Mens-Moto-Racer-Biker-Leather-Jacket-in-Black.jpg",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//       {
//         id: "260fcd8f-cdc2-4de4-9c1c-c200b2c710bb",
//         name: "Woman dress",
//         price: 550000,
//         stock: 55,
//         category: "Women fashion",
//         description:
//           "this fantastic dress good for night out or daylight strolling",
//         picture:
//           "https://i5.walmartimages.com/asr/be44e6f2-23b7-4bd1-b49a-dc2bc7e059a6_1.ba97bc3e8fbebde41437b3042b273056.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//       {
//         id: "cd9b0f99-40af-40e8-8741-5addc8a87598",
//         name: "Nike shoes",
//         price: 450000,
//         stock: 45,
//         category: "sneakers",
//         description: "this one will get a looker when you wear it outside",
//         picture:
//           "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c368aa69-428f-421f-a59a-cc6d1c83460d/af-1-1-shoes-CTs0NC.png",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//       {
//         id: "4bf3fd9d-9433-479f-a0c4-58ffd9d6873f",
//         name: "hand bag",
//         price: 1500000,
//         stock: 15,
//         category: "women bag",
//         description:
//           "this luxurious good that will make you look fantastic and your husband broke",
//         picture:
//           "https://5.imimg.com/data5/NM/II/MY-3020503/ladies-hand-bags1-500x500.jpg",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//       {
//         id: "8999a071-d81a-481a-962f-c26726018bf4",
//         name: "Louis vuitton bag",
//         price: 15000000,
//         stock: 30,
//         category: "Luxury Bag",
//         description: "this is a louis vuitton bag expensive and unnecessary ",
//         picture:
//           "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-locky-bb-monogram-canvas-handbags--M44080_PM2_Front%20view.jpg",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//       {
//         id: "99c174a6-020e-4ea2-96e7-2be387f452e4",
//         name: "Louis Vuitton Duffle Bag",
//         price: 20000000,
//         stock: 20,
//         category: "Luxury bag",
//         description:
//           "luxurious and prestigious bag will make you look rich and awesome!",
//         picture:
//           "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-keepall-bandouli%C3%A8re-55-damier-ebene-canvas-personalisation--N41414_PM2_Front%20view.jpg",
//         merchant_id: "e348a79f-d44f-4ca9-aca8-b99f098de374",
//       },
//     ])
//     .then(function (item) {
//       console.log(item);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// createMany();

module.exports = {
  getAllProduct,
  getProductByID,
  addNewProduct,
  updateProduct,
  removeProduct,
};

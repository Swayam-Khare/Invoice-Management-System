const { db } = require("../models/connection.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const CustomError = require("../utils/customError.js");
const Product = db.Product;
const VendorProduct = db.VendorProduct;
const apiFeatures = require("../utils/apiFeatures");
const { Op } = require("sequelize");

// CREATE OPERATION
exports.addProduct = asyncErrorHandler(async (req, res, next) => {
  let product, vendorProduct;

  product = await Product.findOne({
    where: {
      name: req.body.name,
    },
  });

  // CHECK WHETHER EXISTING PRODUCT OR NOT
  if (product) {
    // IF EXISTING THEN CHECK FOR THE ASSCOIATION
    vendorProduct = await VendorProduct.findOne({
      where: {
        VendorId: req.vendor.id,
        ProductId: product.id,
      },
      paranoid: false,
    });

    // CHECK WHETHER PRODUCT WAS ASSOCIATED WITH THE VENDOR IN THE PAST OR NOT
    if (vendorProduct) {
      // IF PRODUCT WAS ASSOCIATED THEN RESTORE THE ENTRY
      await VendorProduct.restore({
        where: {
          VendorId: req.vendor.id,
          ProductId: product.id,
        },
      });

      // UPDATING THE INFORMATION OF PRODUCT RELATED TO PARTICULAR VENDOR
      const { stock, price, discount } = req.body;

      const updateData = {};
      if (stock !== undefined) updateData.stock = stock;
      if (price !== undefined) updateData.price = price;
      if (discount !== undefined) updateData.discount = discount;

      const [updatedRows] = await VendorProduct.update(updateData, {
        where: {
          VendorId: req.vendor.id,
          ProductId: product.id,
        },
      });

      vendorProduct = await VendorProduct.findOne({
        where: {
          VendorId: req.vendor.id,
          ProductId: product.id,
        },
      });
    } else {
      //  CREATE THE ASSOCIATION
      vendorProduct = await VendorProduct.create({
        VendorId: req.vendor.id,
        ProductId: product.id,
        stock: req.body.stock,
        price: req.body.price,
        discount: req.body.discount,
      });
    }
  } else {
    // IF THE PRODUCT IS NEW THEN CREATE PRODUCT AND ASSOCIATION
    product = await Product.create({
      name: req.body.name,
      description: req.body.description,
    });

    vendorProduct = await VendorProduct.create({
      VendorId: req.vendor.id,
      ProductId: product.id,
      stock: req.body.stock,
      price: req.body.price,
      discount: req.body.discount,
    });
  }

  res.status(201).json({
    status: "Success",
    data: {
      product,
      vendorProduct,
    },
  });
});

// READ OPERATION
exports.readProducts = asyncErrorHandler(async (req, res, next) => {
  let orderBy,
    whereCondition = {};
  let limitFields = null;
  let offset = null;
  const limit = req.query.limit || 10;
  let search = req.query.search || "%";

  if (req.query.stock === "0") {
    whereCondition = {
      VendorId: req.vendor.id,
      stock: 0,
    };
  } else if (req.query.stock) {
    whereCondition = {
      VendorId: req.vendor.id,
      stock: {
        [Op.gt]: 0,
      },
    };
  } else {
    whereCondition = {
      VendorId: req.vendor.id,
    };
  }
  if (req.query.sort) {
    orderBy = apiFeatures.sorting(req.query.sort);
  } else {
    orderBy = apiFeatures.sorting("-updatedAt");
  }
  if (req.query.fields) {
    limitFields = apiFeatures.limitFields(req.query.fields);
  }
  if (req.query.page) {
    offset = apiFeatures.paginate(req.query.page, limit, next);
  }
  if (req.query.search) {
    search = apiFeatures.search(search);
  }
  // FIRST FETCHING ALL THE PRODUCT ID CORRESPONDING TO VENDOR ID
  const vendorProducts = await VendorProduct.findAll({
    where: {
      VendorId: req.vendor.id,
    },
    attributes: {
      exclude: ["VendorId"],
    },
  });

  if (!vendorProducts.length) {
    return res.status(404).json({
      status: "fail",
      message: "No products found for this vendor with the specified filters.",
    });
  }

  // EXTRACTING PRODUCT ID FROM VENDORPRODUCTS AND SAVING IT INTO AN ARRAY
  const productIds = vendorProducts.map((vp) => vp.ProductId);

  // FETCHING PRODUCT DETAILS CORRESPONDING TO VENDOR
  const products = await Product.findAll({
    where: {
      id: productIds,
      name: {
        [Op.iLike]: search,
      },
    },
    offset: offset,
    limit: limit,
    order: orderBy,
  });

  // MERGING INFORMATION OF PRODUCT AND INFO RELATED TO VENDOR IN ONE OBJECT
  const myProducts = products.map((product) => {
    const vendorProduct = vendorProducts.find(
      (vp) => vp.ProductId === product.id
    );
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      stock: vendorProduct.stock,
      price: vendorProduct.price,
      discount: vendorProduct.discount,
    };
  });

  const totalRows = await Product.findAndCountAll({
    where: {
      id: productIds,
      name: {
        [Op.iLike]: search,
      },
    },
    offset: offset,
    limit: limit,
    order: orderBy,
  });

  res.status(200).json({
    status: "Success",
    count: myProducts.length,
    data: {
      myProducts,
      totalRows,
    },
  });
});

exports.readProductsByIds = asyncErrorHandler(async (req, res, next) => {

  const vendorProducts = await VendorProduct.findAll({
    where: {
      VendorId: req.vendor.id,
      ProductId: req.body.ids
    },
    attributes: {
      exclude: ["VendorId"],
    },
    paranoid:false
  });

  if (!vendorProducts.length) {
    return res.status(404).json({
      status: "fail",
      message: "No products found for this vendor with the specified filters.",
    });
  }


  const products = await Product.findAll({
    where: {
      id: req.body.ids
    },
    paranoid:false
  })
  
  const myProducts = products.map((product) => {
    const vendorProduct = vendorProducts.find(
      (vp) => vp.ProductId === product.id
    );

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      stock: vendorProduct.stock,
      price: vendorProduct.price,
      discount: vendorProduct.discount,
    };
  });




  return res.status(200).json({
    status: "Success",
    count: myProducts.length,
    data: {
      myProducts
    }
  })

})


// READ PRODUCT BY ID
exports.readProductById = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findOne({
    where: {
      id: req.params.productId,
    },
  });

  if (!product) {
    const error = new CustomError(
      `Product with ID '${req.params.productId}' is not available`,
      404
    );
    return next(error);
  }

  const vendorProduct = await VendorProduct.findOne({
    where: {
      VendorId: req.vendor.id,
      ProductId: product.id,
    },
  });

  if (!vendorProduct) {
    const error = new CustomError(
      `You don't have the stock of the product with ID '${product.id}' and Name '${product.name}'`,
      404
    );
    return next(error);
  }

  const myProduct = {
    name: product.name,
    description: product.description,
    stock: vendorProduct.stock,
    price: vendorProduct.price,
    discount: vendorProduct.discount,
  };

  res.status(200).json({
    status: "Success",
    data: {
      myProduct,
    },
  });
});

// UPDATE PRODUCT
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { stock, price, discount } = req.body;

  const updateData = {};
  if (stock !== undefined) updateData.stock = stock;
  if (price !== undefined) updateData.price = price;
  if (discount !== undefined) updateData.discount = discount;

  const [updatedRows] = await VendorProduct.update(updateData, {
    where: {
      VendorId: req.vendor.id,
      ProductId: req.params.productId,
    },
  });

  if (updatedRows) {
    const updatedProduct = await VendorProduct.findOne({
      where: {
        VendorId: req.vendor.id,
        ProductId: req.params.productId,
      },
      attributes: {
        exclude: ["VendorId"],
      },
    });

    const products = await Product.findOne({
      where: {
        id: updatedProduct.ProductId,
      },
    });

    const product = {
      name: products.name,
      description: products.description,
      stock: updatedProduct.stock,
      price: updatedProduct.price,
      discount: updatedProduct.discount,
    };

    res.status(200).json({
      status: "Success",
      message: "Product has been updated Successfully",
      data: {
        product,
      },
    });
  } else {
    res.status(404).json({
      status: "Fail",
      message:
        "No matching product found for the provided vendor and product IDs, or no new data provided for update.",
    });
  }
});

// DELETE PRODUCT
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const updateData = {};
  updateData.stock = 0;
  updateData.price = undefined;
  updateData.discount = undefined;

  const [updatedRows] = await VendorProduct.update(updateData, {
    where: {
      ProductId: req.params.productId,
      VendorId: req.vendor.id,
    },
  });

  await VendorProduct.destroy({
    where: {
      ProductId: req.params.productId,
      VendorId: req.vendor.id,
    },
  });

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

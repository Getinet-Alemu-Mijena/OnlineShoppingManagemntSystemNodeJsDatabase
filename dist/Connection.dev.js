"use strict";

var express = require("express");

var mysql = require("mysql2");

var multer = require("multer");

var app = express();
var port = 3050;

var cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.get("/", function (req, res) {
  return res.send("Hello World!");
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "online_shopping_management_system"
});
connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL server");
  }
}); //Start of Back end code to add a user to the database

app.post("/insertCustomer", function (req, res) {
  var _req$body = req.body,
      fname = _req$body.fname,
      lname = _req$body.lname,
      userName = _req$body.userName,
      emailAddress = _req$body.emailAddress,
      phoneN = _req$body.phoneN,
      Roll = _req$body.Roll,
      Gender = _req$body.Gender,
      Age = _req$body.Age,
      passw = _req$body.passw,
      Balance = _req$body.Balance;
  connection.query( // First_Name	Last_Name	User_Name	Email_Address	Phone_Number	Gender	Age	Password	Balance	Id	
  "INSERT INTO `account`(`First_Name`, `Last_Name`, `User_Name`, `Email_Address`, `Phone_Number`, `Roll`, `Gender`, `Age`, `Password`,`Balance`) VALUES (?,?,?,?,?,?,?,?,?,?)", [fname, lname, userName, emailAddress, phoneN, Roll, Gender, Age, passw, Balance], function (error, results) {
    if (error) throw error;
    res.status(201).send({
      message: "User added successfully",
      userId: results.insertId
    });
  });
}); //End of Back end code to add a user to the database
//Start of Check user if exist

app.get("/checkUsers/:firsname/:lastname/:phoneNumber", function (req, res) {
  var firsname = req.params.firsname;
  var lastname = req.params.lastname;
  var phoneNumber = req.params.phoneNumber;
  connection.query("SELECT * FROM account WHERE First_Name = '".concat(firsname, "' OR Last_Name = '").concat(lastname, "' Or Phone_Number = '").concat(phoneNumber, "'"), function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "User already exists"
      });
    } else {
      res.json({
        message: "User does not exist"
      });
    }
  });
}); //End of Check user if exist
//Start of check login

app.get("/loginCheck/:userName/:password", function (req, res) {
  var Pass_word = req.params.password;
  var username = req.params.userName;
  connection.query("SELECT * FROM account WHERE  User_Name = '".concat(username, "' AND Password = '").concat(Pass_word, "'"), function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "User exists"
      });
    } else {
      res.json({
        message: "User does not exist"
      });
    }
  });
}); //End of check login
// Start of checking roll

app.get("/RollCheck/:userName", function (req, res) {
  var userName = req.params.userName;
  connection.query("SELECT Roll FROM account WHERE  User_Name = '".concat(userName, "'"), function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "User exists",
        roll: results[0].Roll
      });
    } else {
      res.json({
        message: "User does not exist"
      });
    }
  });
}); //End of checking roll
//Start of quering user id

app.get("/UserId/:userName", function (req, res) {
  var userName = req.params.userName;
  connection.query("SELECT Id FROM account WHERE  User_Name = '".concat(userName, "'"), function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "User exists",
        Ids: results[0].Id
      });
    } else {
      res.json({
        message: "User does not exist"
      });
    }
  });
}); //End of quering user id
// Start of adding a product 

app.post("/addProduct", function (req, res) {
  var _req$body2 = req.body,
      productName = _req$body2.productName,
      aboutthisproduct = _req$body2.aboutthisproduct,
      productCategory = _req$body2.productCategory,
      produtType = _req$body2.produtType,
      productPrice = _req$body2.productPrice,
      produtDescription = _req$body2.produtDescription,
      produtBrand = _req$body2.produtBrand,
      productModel = _req$body2.productModel,
      screenSize = _req$body2.screenSize,
      productResolution = _req$body2.productResolution,
      memoryCapacity = _req$body2.memoryCapacity,
      operatingSystem = _req$body2.operatingSystem,
      batteryLife = _req$body2.batteryLife,
      cameraSpecifications = _req$body2.cameraSpecifications,
      audioFeatures = _req$body2.audioFeatures,
      productProcessor = _req$body2.productProcessor,
      installedRAM = _req$body2.installedRAM,
      systemType = _req$body2.systemType,
      penAndTouch = _req$body2.penAndTouch,
      productEdition = _req$body2.productEdition,
      productVersion = _req$body2.productVersion,
      installedOn = _req$body2.installedOn,
      oSBuild = _req$body2.oSBuild,
      serialNumber = _req$body2.serialNumber,
      productExprience = _req$body2.productExprience,
      productConnectivity = _req$body2.productConnectivity,
      powerRequirements = _req$body2.powerRequirements,
      productWarranty = _req$body2.productWarranty,
      productDimensions = _req$body2.productDimensions,
      productInputsoutputs = _req$body2.productInputsoutputs,
      productCompatibility = _req$body2.productCompatibility,
      productAccessories = _req$body2.productAccessories,
      productReviews = _req$body2.productReviews,
      productAvailability = _req$body2.productAvailability,
      productRatings = _req$body2.productRatings,
      energyEfficiency = _req$body2.energyEfficiency,
      userManual = _req$body2.userManual,
      produtQuantity = _req$body2.produtQuantity,
      produtWeight = _req$body2.produtWeight,
      produtImage = _req$body2.produtImage,
      images = _req$body2.images,
      UserId = _req$body2.UserId;
  var imagesString = JSON.stringify(images); // Convert the array to a JSON string

  connection.query("INSERT INTO `products`(`Product_Name`, `AboutThisProduct`,`ProductCategory`,`Product_Type`,`Produt_Price`,`Produt_Description`,`Product_Brand`,`Product_Model`,`Screen_Size`,`Resolution`,`Memory_Capacity`,`Operating_System`,`Battery_Life`,`Camera_Specifications`,`Audio_Features`,`Processor`,`Installed_RAM`,`System_Type`,`PenAndTouch`,`Edition`,`Version`,`Installed_On`,`OS_build`,`Serial_Number`,`Exprience`,`Connectivity_Option`,`Power_Requirements`,`Warranty`,`Dimensions`,`Inputs_Outputs`,`Compatibility`,`Accessories`,`Reviews`,`Availability`,`Ratings`,`Energy_Efficiency`,`User_Manual`,`Produt_Quantity`,`Produt_Weight`,`ProdutImage`,`ProdutsImage`,`ProductOwner`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [productName, aboutthisproduct, productCategory, produtType, productPrice, produtDescription, produtBrand, productModel, screenSize, productResolution, memoryCapacity, operatingSystem, batteryLife, cameraSpecifications, audioFeatures, productProcessor, installedRAM, systemType, penAndTouch, productEdition, productVersion, installedOn, oSBuild, serialNumber, productExprience, productConnectivity, powerRequirements, productWarranty, productDimensions, productInputsoutputs, productCompatibility, productAccessories, productReviews, productAvailability, productRatings, energyEfficiency, userManual, produtQuantity, produtWeight, produtImage, imagesString, UserId], function (error, results) {
    if (error) throw error;
    res.status(201).send({
      message: "Product added successfully",
      userId: results.insertId
    });
  });
}); // code to upload file

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "C:/Users/user/Desktop/Angular-Folder/EcommerceProject/OnlineShoppingManagementSystem/src/assets/Images/" // C:\Users\user\Desktop\Angular-Folder\EcommerceProject\OnlineShoppingManagementSystem
    );
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname); // use the original file name
  }
});
var upload = multer({
  storage: storage
});
app.post("/uploadImage", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.send("File uploaded successfully.");
}); //Code to upload multiple product

var upload1 = multer({
  storage: storage
});
app.post("/uploadImages", upload1.array("files"), function (req, res) {
  // console.log("Request received");
  // console.log("Uploaded files:", req.files);
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  } // Handle each uploaded file


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = req.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;
      console.log("File ".concat(file.originalname, " uploaded.")); // You can further process each uploaded file here
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  res.send("Files uploaded successfully.");
}); //check if the product already exists

app.get("/checkProducts/:productname/:serialnumber", function (req, res) {
  var productName = req.params.productname;
  var serialNumber = req.params.serialnumber;
  connection.query("SELECT * FROM products WHERE Product_Name = '".concat(productName, "' OR Serial_Number = '").concat(serialNumber, "'"), function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "Product already exists"
      });
    } else {
      res.json({
        message: "Product does not exist"
      });
    }
  });
}); //End of adding a product 
//get all the products

app.get("/getProducts/:userId", function (req, res) {
  var userId = req.params.userId;
  connection.query("SELECT Id, Product_Name, Product_Type, Produt_Price, Produt_Quantity, Product_Brand, Product_Model, ProdutImage  FROM products WHERE ProductOwner = ?", [userId], function (error, results) {
    if (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      res.json(results);
    }
  });
}); //code to query product detail from database
// Your existing code

app.get("/product", function (req, res) {
  var productId = req.query.id;
  connection.query("SELECT * FROM products WHERE Id = '".concat(productId, "'"), function (error, results) {
    if (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({
          message: 'Product not found'
        });
      }
    }
  });
}); //code to update product properties

app.put("/updateProduct/:productId", function (req, res) {
  var productId = req.params.productId; // const userId = req.params.userId;

  var updatedProduct = req.body; // Assuming the updated product data is sent in the request body

  connection.query("UPDATE products SET ? WHERE Id = ?", [updatedProduct, productId], function (error, results) {
    if (error) {
      console.error("Error updating product: ", error);
      res.status(500).json({
        message: "Failed to update product"
      });
    } else {
      if (results.affectedRows > 0) {
        res.json({
          message: "Product updated successfully"
        });
      } else {
        res.status(404).json({
          message: "Product not found"
        });
      }
    }
  });
}); // Delete product route

app["delete"]('/deleteProduct/:productId', function (req, res) {
  var productId = req.params.productId;
  connection.query('DELETE FROM products WHERE Id = ?', [productId], function (error, results) {
    if (error) {
      console.error('Error deleting product: ', error);
      res.status(500).json({
        message: 'Failed to delete product'
      });
    } else {
      if (results.affectedRows > 0) {
        res.json({
          message: 'Product deleted successfully'
        });
      } else {
        res.status(404).json({
          message: 'Product not found'
        });
      }
    }
  });
});
app.get('/subProducts/:productId', function (req, res) {
  var productId = req.params.productId;
  var query = 'SELECT ProdutsImage FROM products WHERE Id = ?';
  connection.query(query, [productId], function (error, results) {
    if (error) {
      console.error('Error fetching sub-product images:', error);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Sub-product images not found'
      });
    }

    var productImages = results[0].ProdutsImage;
    res.json({
      ProdutsImage: productImages
    });
  });
}); // loadAllProducts

app.get("/loadAllProducts", function (req, res) {
  var query = "SELECT * FROM products";
  connection.query(query, function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching product data."
      });
    } else {
      res.json(results);
    }
  });
}); //Code to add data to carts table

app.post("/addToCart", function (req, res) {
  var product = req.body;
  var query = "\n    INSERT INTO cart (ProductOwner, ProductId, CustomerId, ProductPrice, ProductQuantity, DateAdded, ProductCategory, ProductType,status)\n    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)\n  ";
  connection.query(query, [product.ProductOwner, product.ProductId, product.CustomerId, product.ProductPrice, product.ProductQuantity, product.DateAdded, product.ProductCategory, product.ProductType, product.status], function (error, results) {
    if (error) {
      console.error("Error adding item to cart", error);
      res.status(500).json({
        error: "Error adding item to cart"
      });
    } else {
      res.status(200).json({
        message: "Item added to cart successfully"
      });
    }
  });
}); //Code to update product quantity
// Update product quantity

app.put('/updateProductQuantity/:productId', function (req, res) {
  var productId = req.params.productId;
  var newQuantity = req.body.quantity; // Update the product quantity in the database

  var sql = 'UPDATE products SET Produt_Quantity = ? WHERE id = ?';
  connection.query(sql, [newQuantity, productId], function (err, result) {
    if (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).send('Error updating product quantity');
    } else {
      res.status(200).send('Product quantity updated successfully');
    }
  });
}); //Update the product availablity

app.put('/updateProductAvailability/:productId', function (req, res) {
  var productId = req.params.productId;
  var newQuantity = req.body.Availability; // Update the product quantity in the database

  var sql = 'UPDATE products SET Availability = ? WHERE id = ?';
  connection.query(sql, [newQuantity, productId], function (err, result) {
    if (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).send('Error updating product quantity');
    } else {
      res.status(200).send('Product quantity updated successfully');
    }
  });
}); //Get Carts Data	

app.get("/getCartsData/:userId", function (req, res) {
  var userId = req.params.userId;
  connection.query("SELECT ProductOwner, ProductId, CustomerId, ProductPrice, ProductQuantity, DateAdded, ProductCategory, ProductType, Id FROM cart WHERE CustomerId = ? AND status = 'unpaid'", [userId], function (error, results) {
    if (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      res.json(results);
    }
  });
}); //Get customer Balance 

app.get("/customerBalance/:userId", function (req, res) {
  var user_Id = req.params.userId;
  connection.query("SELECT Balance FROM account WHERE  Id = '".concat(user_Id, "'"), function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "Customer Balance exists",
        Ids: results[0].Balance
      });
    } else {
      res.json({
        message: "User does not exist"
      });
    }
  });
}); //update customer balance

app.put('/updateCustomerBalance/:userId', function (req, res) {
  var newQuantity = req.body.updated_Customer_Balance;
  var user_Id = req.params.userId;
  var sql = 'UPDATE account SET Balance = ? WHERE Id = ?';
  connection.query(sql, [newQuantity, user_Id], function (err, result) {
    if (err) {
      console.error('Error updating Customer Balance', err);
      res.status(500).json({
        error: 'Error updating Customer Balance'
      });
    } else {
      res.status(200).json({
        message: 'Customer Balance updated successfully'
      });
    }
  });
}); //Product owner balance

app.get("/ProductOwnerBalance/:productOwner", function (req, res) {
  var product_Owner = req.params.productOwner;
  connection.query("SELECT Balance FROM account WHERE  Id = '".concat(product_Owner, "'"), function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "Product Owner Balance exists",
        Ids: results[0].Balance
      });
    } else {
      res.json({
        message: "User does not exist"
      });
    }
  });
}); //update product owner balance

app.put('/updateProductOwnerBalance/:productId', function (req, res) {
  var productId = req.params.productId;
  var newQuantity = req.body.updated_Product_Owner_Balance;
  var sql = 'UPDATE account SET Balance = ? WHERE id = ?';
  connection.query(sql, [newQuantity, productId], function (err, result) {
    if (err) {
      console.error('Error updating product owner balance:', err);
      res.status(500).send('Error updating product owner balance:');
    } else {
      res.status(200).send('Product owner balance updated successfully');
    }
  });
});
app.get("/systemOwnerBalance", function (req, res) {
  // const user_Id = req.params.userId;
  connection.query("SELECT Balance FROM account WHERE  Roll = 'Admin'", function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      res.json({
        message: "System Owner Balance exists",
        Ids: results[0].Balance
      });
    } else {
      res.json({
        message: "User does not exist"
      });
    }
  });
}); //Updating system owner balance

app.put('/updateSystemOwnerBalance', function (req, res) {
  var newQuantity = req.body.updated_System_Owner_Balance; // Update the product quantity in the database

  var sql = 'UPDATE account SET Balance = ? WHERE Roll = "Admin"';
  connection.query(sql, [newQuantity], function (err, result) {
    if (err) {
      console.error('Error updating System owner balance:', err);
      res.status(500).send('Error updating System owner balance:');
    } else {
      res.status(200).send('System owner balance updated successfully');
    }
  });
}); //Chang product status

app.put("/changeProductStatusInCart", function (req, res) {
  var productIdInCart = req.body.productIdInCart;
  var sql = "UPDATE cart SET status = ? WHERE Id = ?";
  connection.query(sql, ['paid!', productIdInCart], function (err, result) {
    if (err) {
      console.error("Error changing product status:", err);
      res.status(500).send("Error changing product status");
    } else {
      res.status(200).send("Product status changed successfully");
    }
  });
}); //Delete from carts table

app["delete"]('/deleteFromCart/:productId/:productOwner', function (req, res) {
  var productId = req.params.productId;
  var productOwner = req.params.productOwner; // Delete the product from the cart in the database

  var sql = 'DELETE FROM cart WHERE Id = ? AND ProductOwner = ?';
  connection.query(sql, [productId, productOwner], function (err, result) {
    if (err) {
      console.error('Error deleting product from cart:', err);
      res.status(500).json({
        error: 'Error deleting product from cart'
      });
    } else {
      res.status(200).json({
        message: 'Product deleted from cart successfully'
      });
    }
  });
}); // get product quantity from products table

app.get('/getProductQuantity/:productId/:productOwner', function (req, res) {
  var productId = req.params.productId;
  var productOwner = req.params.productOwner;
  var sql = 'SELECT Produt_Quantity FROM products WHERE Id = ? AND ProductOwner = ?';
  connection.query(sql, [productId, productOwner], function (err, result) {
    if (err) {
      console.error('Error retrieving product quantity:', err);
      res.status(500).send('Error retrieving product quantity');
    } else {
      if (result.length > 0) {
        var productQuantity = result[0].Produt_Quantity; // Fix the field name here

        res.status(200).json({
          quantity: productQuantity
        });
      } else {
        res.status(404).send('Product not found');
      }
    }
  });
}); // updating product quantity in products table

app.put('/updateProductQuantity/:productId/:productOwner/:productQuantity', function (req, res) {
  var productId = req.params.productId;
  var productOwner = req.params.productOwner;
  var productQuantity = req.params.productQuantity; // Update the product quantity in the products table

  var sql = 'UPDATE products SET Produt_Quantity = ? WHERE Id = ? AND ProductOwner = ?';
  connection.query(sql, [productQuantity, productId, productOwner], function (err, result) {
    if (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).send('Error updating product quantity');
    } else {
      res.status(200).send('Product quantity updated successfully');
    }
  });
}); //Update user profile

app.put("/update-user/:userId", function (req, res) {
  var userId = req.params.userId;
  var updatedUser = req.body;
  connection.query("UPDATE account SET ? WHERE Id = ?", [updatedUser, userId], function (error, results) {
    if (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        error: "An error occurred while updating the user."
      });
    } else {
      console.log("User updated successfully");
      res.status(200).json({
        message: "User updated successfully"
      });
    }
  });
}); //Update sub user profile

app.put("/update-user-picture/:userId", function (req, res) {
  var userId = req.params.userId;
  var updatedUser = req.body;
  connection.query("UPDATE account SET ? WHERE Id = ?", [updatedUser, userId], function (error, results) {
    if (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        error: "An error occurred while updating the user."
      });
    } else {
      // console.log("User updated successfully");
      res.status(200).json({
        message: "User updated successfully"
      });
    }
  });
}); // updateUserProfilePicture

app.post("/updateUserProfilePicture", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.send("File uploaded successfully.");
}); //get user detail

app.get("/userDetail", function (req, res) {
  var userId = req.query.id;
  connection.query("SELECT * FROM account WHERE Id = '".concat(userId, "'"), function (error, results) {
    if (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    }
  });
});
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
      passw = _req$body.passw;
  connection.query( // First_Name	Last_Name	User_Name	Email_Address	Phone_Number	Gender	Age	Password	Balance	Id	
  "INSERT INTO `account`(`First_Name`, `Last_Name`, `User_Name`, `Email_Address`, `Phone_Number`, `Roll`, `Gender`, `Age`, `Password`) VALUES (?,?,?,?,?,?,?,?,?)", [fname, lname, userName, emailAddress, phoneN, Roll, Gender, Age, passw], function (error, results) {
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
});
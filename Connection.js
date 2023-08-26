const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");

const app = express();
const port = 3050;
const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "online_shopping_management_system",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL server");
  }
});


//Start of Back end code to add a user to the database

app.post("/insertCustomer", (req, res) => {
  let {
    fname,
    lname,
    userName,
    emailAddress,
    phoneN,
    Roll,
    Gender,
    Age,
    passw,
    Balance
  } = req.body;
  connection.query(
    // First_Name	Last_Name	User_Name	Email_Address	Phone_Number	Gender	Age	Password	Balance	Id	

    "INSERT INTO `account`(`First_Name`, `Last_Name`, `User_Name`, `Email_Address`, `Phone_Number`, `Roll`, `Gender`, `Age`, `Password`,`Balance`) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [fname, lname, userName, emailAddress, phoneN, Roll, Gender, Age, passw,Balance],
    (error, results) => {
      if (error) throw error;
      res
        .status(201)
        .send({
          message: "User added successfully",
          userId: results.insertId
        });
    }
  );
});

//End of Back end code to add a user to the database


//Start of Check user if exist
app.get("/checkUsers/:firsname/:lastname/:phoneNumber", (req, res) => {
  const firsname = req.params.firsname;
  const lastname = req.params.lastname;
  const phoneNumber = req.params.phoneNumber;
  connection.query(
    `SELECT * FROM account WHERE First_Name = '${firsname}' OR Last_Name = '${lastname}' Or Phone_Number = '${phoneNumber}'`,
    (error, results) => {
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
    }
  );
});

//End of Check user if exist


//Start of check login
app.get("/loginCheck/:userName/:password", (req, res) => {
  const Pass_word = req.params.password;
  const username = req.params.userName;

  connection.query(
    `SELECT * FROM account WHERE  User_Name = '${username}' AND Password = '${Pass_word}'`,
    (error, results) => {
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
    }
  );
});
//End of check login

// Start of checking roll
app.get("/RollCheck/:userName", (req, res) => {
  const userName = req.params.userName;

  connection.query(
    `SELECT Roll FROM account WHERE  User_Name = '${userName}'`,
    (error, results) => {
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
    }
  );
});
//End of checking roll

//Start of quering user id
app.get("/UserId/:userName", (req, res) => {
  const userName = req.params.userName;

  connection.query(
    `SELECT Id FROM account WHERE  User_Name = '${userName}'`,
    (error, results) => {
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
    }
  );
});
//End of quering user id

// Start of adding a product 
app.post("/addProduct", (req, res) => {
  let {
    productName,
    aboutthisproduct,
    productCategory,
    produtType,
    productPrice,
    produtDescription,
    produtBrand,
    productModel,
    screenSize,
    productResolution,
    memoryCapacity,
    operatingSystem,
    batteryLife,
    cameraSpecifications,
    audioFeatures,
    productProcessor,
    installedRAM,
    systemType,
    penAndTouch,
    productEdition,
    productVersion,
    installedOn,
    oSBuild,
    serialNumber,
    productExprience,
    productConnectivity,
    powerRequirements,
    productWarranty,
    productDimensions,
    productInputsoutputs,
    productCompatibility,
    productAccessories,
    productReviews,
    productAvailability,
    productRatings,
    energyEfficiency,
    userManual,
    produtQuantity,
    produtWeight,
    produtImage,
    images,
    UserId
  } = req.body;
  const imagesString = JSON.stringify(images); // Convert the array to a JSON string
  connection.query(
    "INSERT INTO `products`(`Product_Name`, `AboutThisProduct`,`ProductCategory`,`Product_Type`,`Produt_Price`,`Produt_Description`,`Product_Brand`,`Product_Model`,`Screen_Size`,`Resolution`,`Memory_Capacity`,`Operating_System`,`Battery_Life`,`Camera_Specifications`,`Audio_Features`,`Processor`,`Installed_RAM`,`System_Type`,`PenAndTouch`,`Edition`,`Version`,`Installed_On`,`OS_build`,`Serial_Number`,`Exprience`,`Connectivity_Option`,`Power_Requirements`,`Warranty`,`Dimensions`,`Inputs_Outputs`,`Compatibility`,`Accessories`,`Reviews`,`Availability`,`Ratings`,`Energy_Efficiency`,`User_Manual`,`Produt_Quantity`,`Produt_Weight`,`ProdutImage`,`ProdutsImage`,`ProductOwner`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [productName,
      aboutthisproduct,
      productCategory,
      produtType,
      productPrice,
      produtDescription,
      produtBrand,
      productModel,
      screenSize,
      productResolution,
      memoryCapacity,
      operatingSystem,
      batteryLife,
      cameraSpecifications,
      audioFeatures,
      productProcessor,
      installedRAM,
      systemType,
      penAndTouch,
      productEdition,
      productVersion,
      installedOn,
      oSBuild,
      serialNumber,
      productExprience,
      productConnectivity,
      powerRequirements,
      productWarranty,
      productDimensions,
      productInputsoutputs,
      productCompatibility,
      productAccessories,
      productReviews,
      productAvailability,
      productRatings,
      energyEfficiency,
      userManual,
      produtQuantity,
      produtWeight,
      produtImage,
      imagesString,
      UserId
    ],
    (error, results) => {
      if (error) throw error;
      res
        .status(201)
        .send({
          message: "Product added successfully",
          userId: results.insertId
        });
    }
  );
});

// code to upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "C:/Users/user/Desktop/Angular-Folder/EcommerceProject/OnlineShoppingManagementSystem/src/assets/Images/"
      // C:\Users\user\Desktop\Angular-Folder\EcommerceProject\OnlineShoppingManagementSystem
    );
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name
  },
});

const upload = multer({
  storage: storage
});

app.post("/uploadImage", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send("File uploaded successfully.");
});

//Code to upload multiple product
const upload1 = multer({
  storage: storage
});

app.post("/uploadImages", upload1.array("files"), (req, res) => {
  // console.log("Request received");
  // console.log("Uploaded files:", req.files);

  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  // Handle each uploaded file
  for (const file of req.files) {
    console.log(`File ${file.originalname} uploaded.`);
    // You can further process each uploaded file here
  }

  res.send("Files uploaded successfully.");
});



//check if the product already exists

app.get("/checkProducts/:productname/:serialnumber", (req, res) => {
  const productName = req.params.productname;
  const serialNumber = req.params.serialnumber;
  connection.query(
    `SELECT * FROM products WHERE Product_Name = '${productName}' OR Serial_Number = '${serialNumber}'`,
    (error, results) => {
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
    }
  );
});




//End of adding a product 

//get all the products
app.get("/getProducts/:userId", (req, res) => {
  const userId = req.params.userId;
  connection.query(
    `SELECT Id, Product_Name, Product_Type, Produt_Price, Produt_Quantity, Product_Brand, Product_Model, ProdutImage  FROM products WHERE ProductOwner = ?`,
    [userId],
    (error, results) => {
      if (error) {
        res.status(500).json({
          error: 'Internal Server Error'
        });
      } else {
        res.json(results);
      }
    }
  );
});

//code to query product detail from database
// Your existing code
app.get("/product", (req, res) => {
  const productId = req.query.id;
  connection.query(
    `SELECT * FROM products WHERE Id = '${productId}'`,
    (error, results) => {
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
    }
  );
});

//code to update product properties

app.put("/updateProduct/:productId", (req, res) => {
  const productId = req.params.productId;
  // const userId = req.params.userId;
  const updatedProduct = req.body; // Assuming the updated product data is sent in the request body

  connection.query(
    `UPDATE products SET ? WHERE Id = ?`,
    [updatedProduct, productId],
    (error, results) => {
      if (error) {
        console.error("Error updating product: ", error);
        res.status(500).json({ message: "Failed to update product" });
      } else {
        if (results.affectedRows > 0) {
          res.json({ message: "Product updated successfully" });
        } else {
          res.status(404).json({ message: "Product not found" });
        }
      }
    }
  );
});

// Delete product route
app.delete('/deleteProduct/:productId', (req, res) => {
  const productId = req.params.productId;

  connection.query(
    'DELETE FROM products WHERE Id = ?',
    [productId],
    (error, results) => {
      if (error) {
        console.error('Error deleting product: ', error);
        res.status(500).json({ message: 'Failed to delete product' });
      } else {
        if (results.affectedRows > 0) {
          res.json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      }
    }
  );
});
app.get('/subProducts/:productId', (req, res) => {
  const productId = req.params.productId;
  const query = 'SELECT ProdutsImage FROM products WHERE Id = ?';

  connection.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Error fetching sub-product images:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Sub-product images not found' });
    }

    const productImages = results[0].ProdutsImage;
    res.json({ ProdutsImage: productImages });
  });
});
// loadAllProducts
app.get("/loadAllProducts", (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching product data." });
    } else {
      res.json(results);
    }
  });
});
//Code to add data to carts table
app.post("/addToCart", (req, res) => {
  const product = req.body;

  const query = `
    INSERT INTO cart (ProductOwner, ProductId, CustomerId, ProductPrice, ProductQuantity, DateAdded, ProductCategory, ProductType,status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  connection.query(
    query,
    [
      product.ProductOwner,
      product.ProductId,
      product.CustomerId,
      product.ProductPrice,
      product.ProductQuantity,
      product.DateAdded,
      product.ProductCategory,
      product.ProductType,
      product.status
    ],
    (error, results) => {
      if (error) {
        console.error("Error adding item to cart", error);
        res.status(500).json({ error: "Error adding item to cart" });
      } else {
        res.status(200).json({ message: "Item added to cart successfully" });
      }
    }
  );
});

//Code to update product quantity
// Update product quantity
app.put('/updateProductQuantity/:productId', (req, res) => {
  const productId = req.params.productId;
  const newQuantity = req.body.quantity;

  // Update the product quantity in the database
  const sql = 'UPDATE products SET Produt_Quantity = ? WHERE id = ?';
  connection.query(sql, [newQuantity, productId], (err, result) => {
    if (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).send('Error updating product quantity');
    } else {
      res.status(200).send('Product quantity updated successfully');
    }
  });
});
//Update the product availablity
app.put('/updateProductAvailability/:productId', (req, res) => {
  const productId = req.params.productId;
  const newQuantity = req.body.Availability;

  // Update the product quantity in the database
  const sql = 'UPDATE products SET Availability = ? WHERE id = ?';
  connection.query(sql, [newQuantity, productId], (err, result) => {
    if (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).send('Error updating product quantity');
    } else {
      res.status(200).send('Product quantity updated successfully');
    }
  });
});

//Get Carts Data	
app.get("/getCartsData/:userId", (req, res) => {
  const userId = req.params.userId;
  connection.query(
    `SELECT ProductOwner, ProductId, CustomerId, ProductPrice, ProductQuantity, DateAdded, ProductCategory, ProductType, Id FROM cart WHERE CustomerId = ? AND status = 'unpaid'`,
    [userId],
    (error, results) => {
      if (error) {
        res.status(500).json({
          error: 'Internal Server Error'
        });
      } else {
        res.json(results);
      }
    }
  );
});

//Get customer Balance 
app.get("/customerBalance/:userId", (req, res) => {
  const user_Id = req.params.userId;

  connection.query(
    `SELECT Balance FROM account WHERE  Id = '${user_Id}'`,
    (error, results) => {
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
    }
  );
});

//update customer balance
app.put('/updateCustomerBalance/:userId', (req, res) => {
  const newQuantity = req.body.updated_Customer_Balance;
  const user_Id = req.params.userId;

  const sql = 'UPDATE account SET Balance = ? WHERE Id = ?';
  connection.query(sql, [newQuantity, user_Id], (err, result) => {
    if (err) {
      console.error('Error updating Customer Balance', err);
      res.status(500).json({ error: 'Error updating Customer Balance' });
    } else {
      res.status(200).json({ message: 'Customer Balance updated successfully' });
    }
  });
});


//Product owner balance
app.get("/ProductOwnerBalance/:productOwner", (req, res) => {
  const product_Owner = req.params.productOwner;

  connection.query(
    `SELECT Balance FROM account WHERE  Id = '${product_Owner}'`,
    (error, results) => {
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
    }
  );
});

//update product owner balance
app.put('/updateProductOwnerBalance/:productId', (req, res) => {
  const productId = req.params.productId;
  const newQuantity = req.body.updated_Product_Owner_Balance;

  const sql = 'UPDATE account SET Balance = ? WHERE id = ?';
  connection.query(sql, [newQuantity, productId], (err, result) => {
    if (err) {
      console.error('Error updating product owner balance:', err);
      res.status(500).send('Error updating product owner balance:');
    } else {
      res.status(200).send('Product owner balance updated successfully');
    }
  });
});

app.get("/systemOwnerBalance", (req, res) => {
  // const user_Id = req.params.userId;

  connection.query(
    `SELECT Balance FROM account WHERE  Roll = 'Admin'`,
    (error, results) => {
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
    }
  );
});

//Updating system owner balance
app.put('/updateSystemOwnerBalance', (req, res) => {
  const newQuantity = req.body.updated_System_Owner_Balance;

  // Update the product quantity in the database
  const sql = 'UPDATE account SET Balance = ? WHERE Roll = "Admin"';
  connection.query(sql, [newQuantity], (err, result) => {
    if (err) {
      console.error('Error updating System owner balance:', err);
      res.status(500).send('Error updating System owner balance:');
    } else {
      res.status(200).send('System owner balance updated successfully');
    }
  });
});

//Chang product status
app.put("/changeProductStatusInCart", (req, res) => {
  const productIdInCart = req.body.productIdInCart;
  const sql = "UPDATE cart SET status = ? WHERE Id = ?";
  
  connection.query(sql, ['paid!', productIdInCart], (err, result) => {
    if (err) {
      console.error("Error changing product status:", err);
      res.status(500).send("Error changing product status");
    } else {
      res.status(200).send("Product status changed successfully");
    }
  });
});

//Delete from carts table

app.delete('/deleteFromCart/:productId/:productOwner', (req, res) => {
  const productId = req.params.productId;
  const productOwner = req.params.productOwner;

  // Delete the product from the cart in the database
  const sql = 'DELETE FROM cart WHERE Id = ? AND ProductOwner = ?';
  connection.query(sql, [productId, productOwner], (err, result) => {
    if (err) {
      console.error('Error deleting product from cart:', err);
      res.status(500).json({ error: 'Error deleting product from cart' });
    } else {
      res.status(200).json({ message: 'Product deleted from cart successfully' });
    }
  });
});

	
// get product quantity from products table
app.get('/getProductQuantity/:productId/:productOwner', (req, res) => {
  const productId = req.params.productId;
  const productOwner = req.params.productOwner;

  const sql = 'SELECT Produt_Quantity FROM products WHERE Id = ? AND ProductOwner = ?';
  connection.query(sql, [productId, productOwner], (err, result) => {
    if (err) {
      console.error('Error retrieving product quantity:', err);
      res.status(500).send('Error retrieving product quantity');
    } else {
      if (result.length > 0) {
        const productQuantity = result[0].Produt_Quantity; // Fix the field name here
        res.status(200).json({ quantity: productQuantity });
      } else {
        res.status(404).send('Product not found');
      }
    }
  });
});


	// updating product quantity in products table
  app.put('/updateProductQuantity/:productId/:productOwner/:productQuantity', (req, res) => {
  const productId = req.params.productId;
  const productOwner = req.params.productOwner;
  const productQuantity = req.params.productQuantity;

  // Update the product quantity in the products table
  const sql = 'UPDATE products SET Produt_Quantity = ? WHERE Id = ? AND ProductOwner = ?';
  connection.query(sql, [productQuantity, productId, productOwner], (err, result) => {
    if (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).send('Error updating product quantity');
    } else {
      res.status(200).send('Product quantity updated successfully');
    }
  });
});
//Update user profile
app.put("/update-user/:userId", (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;

  connection.query(
    "UPDATE account SET ? WHERE Id = ?",
    [updatedUser, userId],
    (error, results) => {
      if (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user." });
      } else {
        console.log("User updated successfully");
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});

//Update sub user profile
app.put("/update-user-picture/:userId", (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;

  connection.query(
    "UPDATE account SET ? WHERE Id = ?",
    [updatedUser, userId],
    (error, results) => {
      if (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user." });
      } else {
        // console.log("User updated successfully");
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});

// updateUserProfilePicture
app.post("/updateUserProfilePicture", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send("File uploaded successfully.");
});


//get user detail
app.get("/userDetail", (req, res) => {
  const userId = req.query.id;
  connection.query(
    `SELECT * FROM account WHERE Id = '${userId}'`,
    (error, results) => {
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
    }
  );
});








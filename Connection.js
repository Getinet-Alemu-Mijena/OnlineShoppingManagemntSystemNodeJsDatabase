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
    passw
  } = req.body;
  connection.query(
    // First_Name	Last_Name	User_Name	Email_Address	Phone_Number	Gender	Age	Password	Balance	Id	

    "INSERT INTO `account`(`First_Name`, `Last_Name`, `User_Name`, `Email_Address`, `Phone_Number`, `Roll`, `Gender`, `Age`, `Password`) VALUES (?,?,?,?,?,?,?,?,?)",
    [fname, lname, userName, emailAddress, phoneN, Roll, Gender, Age, passw],
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
  connection.query(
    "INSERT INTO `electronics`(`Product_Name`,`Product_Type`,`Produt_Price`,`Produt_Description`,`Product_Brand`,`Product_Model`,`Screen_Size`,`Resolution`,`Memory_Capacity`,`Operating_System`,`Battery_Life`,`Camera_Specifications`,`Audio_Features`,`Processor`,`Installed_RAM`,`System_Type`,`Pen_and _Touch`,`Edition`,`Version`,`Installed_On`,`OS_build`,`Serial_Number`,`Exprience`,`Connectivity_Option`,`Power_Requirements`,`Warranty`,`Dimensions`,`Inputs_Outputs`,`Compatibility`,`Accessories`,`Reviews`,`Availability`,`Ratings`,`Energy_Efficiency`,`User_Manual`,`Produt_Quantity`,`Produt_Weight`,`ProdutImage`,`ProdutsImage`,`ProductOwner`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [  productName,
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
      // C:/Users/mikiyas/Desktop/House-Rental-Mangement-System/src/assets/House_Image/
    ); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name
  },
});

const upload = multer({ storage: storage });

app.post("/uploadImage", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send("File uploaded successfully.");
});


//check if the product already exists

app.get("/checkProducts/:productname/:serialnumber", (req, res) => {
  const productName = req.params.productname;
  const serialNumber = req.params.serialnumber;
  connection.query(
    `SELECT * FROM electronics WHERE Product_Name = '${productName}' OR Serial_Number = '${serialNumber}'`,
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

//start of sellecting seller products
// app.get("/getProductImages/:userId", (req, res) => {
//   const userId = req.params.userId;

//   connection.query(
//     `SELECT ProdutImage FROM electronics WHERE ProductOwner = ?`, // Change to your actual column name
//     [userId],
//     (error, results) => {
//       if (error) {
//         res.statusCode = 500;
//         res.json({ error: 'Internal Server Error' });
//       } else {
//         res.json(results);
//       }
//     }
//   );
// });
//get all the products
app.get("/getProducts/:userId", (req, res) => {
  const userId = req.params.userId;
  connection.query(
    `SELECT Id, Product_Name, Product_Type, Produt_Price, ProdutImage FROM electronics WHERE ProductOwner = ?`,
    [userId],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    }
  );
});




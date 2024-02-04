const model = require("../Schema/productSchema");

const mongoose = require("mongoose");
const Product = model.Product;
const path = require("path");
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const config = require("../Config/firebase.config");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

// firbase config
const app = initializeApp(config.firebaseConfig);
const storage = getStorage();

exports.addNewProduct = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.files);

    const { title, description, category, price } = req.body;

    // Assuming multiple files, use req.files
    const images = req.files.map((file) => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      buffer: file.buffer,
    }));

    // Upload each file to Firebase Storage
    const uploadedImages = [];
    for (const file of images) {
      const storageRef = ref(
        storage,
        `_files/${Date.now()}_${file.originalname}`
      );
      const metadata = { contentType: file.mimetype };
      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL);
      uploadedImages.push({
        originalname: file.originalname,
        downloadURL: downloadURL,
      });
    }
    console.log(uploadedImages);

    // Create a new product with the uploaded images
    const newProduct = new Product({
      title,
      description,
      category,
      price,
      images: uploadedImages,
    });

    const saveProduct = await newProduct.save();
    console.log(saveProduct);
    res.status(201).json(saveProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllproducts = async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (error) {
    console.error();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // console.log(id);
    const { title, description, inStock, category, price } = req.body;

    // Assuming multiple files, use req.files
    console.log(req.files);
    const updatedImages = req.files ? req.files.map((file) => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      buffer: file.buffer,
    })) : [];
    

    // Upload each file to Firebase Storage
    const uploadedImages = [];
    for (const file of updatedImages) {
      const storageRef = ref(
        storage,
        `_files/${Date.now()}_${file.originalname}`
      );
      const metadata = { contentType: file.mimetype };
      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedImages.push({
        originalname: file.originalname,
        downloadURL: downloadURL,
      });
    }

    // Update the product in MongoDB
    product.title = title;
    product.description = description;
    product.inStock = inStock;
    product.category = category;
    product.price = price;
    product.images.push(...uploadedImages);

    // Save the updated product
    await product.save();

    res.status(201).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
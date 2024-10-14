const express = require("express");
const router = express.Router();

let myArray = [{ id: 115, name: "Bob Ross" }];
// Get all
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Get to API - SUCCESSFUL",
    myArray,
  });
});

// Get by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Find the object in myArray that matches the provided id
  const foundItem = myArray.find((item) => item.id == id);

  if (foundItem) {
    // If the item is found, return it
    res.status(200).json({
      message: "Get by Id for /api",
      item: foundItem,
      metadata: { hostname: req.hostname, method: req.method },
    });
  } else {
    // If the item is not found, return a 404 error
    res.status(404).json({
      message: `Item with ID ${id} not found`,
      metadata: { hostname: req.hostname, method: req.method },
    });
  }
});

router.post("/", (req, res) => {
  const { data } = req.body;

  // Generate a random ID for the new object
  const newId = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
  const newData = { id: newId, ...data };
  myArray.push(newData);

  res.status(200).json({
    message: "POST to /api",
    data: newData,
    metadata: { hostname: req.hostname, method: req.method },
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  // Find the index of the object in myArray with the matching id
  const index = myArray.findIndex((item) => item.id == id); // Use == to account for string vs number comparison

  if (index !== -1) {
    // Update the object with the new data
    myArray[index] = { id: parseInt(id), ...data }; // Ensure id remains unchanged, rest of the data is updated
    res.status(200).json({
      message: `Item with ID ${id} updated successfully`,
      updatedItem: myArray[index],
      metadata: { hostname: req.hostname, method: req.method },
    });
  } else {
    res.status(404).json({
      message: `Item with ID ${id} not found`,
      metadata: { hostname: req.hostname, method: req.method },
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the object in myArray with the matching id
  const index = myArray.findIndex((item) => item.id == id); // Use == to account for string vs number comparison

  if (index !== -1) {
    const deletedItem = myArray.splice(index, 1); // splice returns the removed item as an array
    res.status(200).json({
      message: `Item with ID ${id} deleted successfully`,
      deletedItem: deletedItem[0], // Return the deleted item
      metadata: { hostname: req.hostname, method: req.method },
    });
  } else {
    res.status(404).json({
      message: `Item with ID ${id} not found`,
      metadata: { hostname: req.hostname, method: req.method },
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Get to API",
    metadata: { hostname: req.hostname, method: req.method },
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).json({
    message: "Get by Id for /api",
    metadata: { hostname: req.hostname, method: req.method },
  });
});

router.post("/", (req, res) => {
  const { data } = req.body;
  res.status(200).json({
    message: "POST to /api",
    data,
    metadata: { hostname: req.hostname, method: req.method },
  });
});

module.exports = router;

const testController = (req, res) => {
  res.status(200).json({ message: "Controller is working!" });
};

module.exports = { testController };

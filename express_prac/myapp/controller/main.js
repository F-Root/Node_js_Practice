const mainscreen = (req, res) => {
  res.render("index", { title: "Express" });
};

module.exports = { mainscreen };
// module.exports = mainscreen; //객체(object)를 보내주는게 아니라서 안되는듯?

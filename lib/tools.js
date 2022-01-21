const Tools = {
  slugifyString: (string) => {
    return string
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .toLowerCase();
  },
};

module.exports = Tools;

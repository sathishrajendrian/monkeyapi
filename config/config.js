require("dotenv").config();
const dev = {
  app: {
    port: process.env.PORT || 3003,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/monkeyapp",
    /*  url:
      process.env.DB_URL ||
      "mongodb+srv://monkeyapp:Tech3Sixty@cluster0.3ic5iir.mongodb.net/?retryWrites=true&w=majority",
   */
  },
};

module.exports = dev;

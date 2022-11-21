const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

const logger = (string, object) => {
  console.log(
    "%c ============== INFO LOG ============== \n",
    "color: #22D3EE",
    `${string ?? "Value: "}`,
    object
  );
};

const Categories = [
  {
    id: 1,
    name: "Cemilan",
  },
  {
    id: 2,
    name: "Furnitur",
  },
  {
    id: 3,
    name: "Alat Masak",
  },
];

const basePath = path.join(__dirname, "../../");

dotenv.config({ path: basePath + "/.env.local" });

const apiUrl = process.env.API_URL + process.env.API_TOKEN + "/categories";

module.exports.init = async () => {
  Categories.map(async (category) => {
    const addData = await axios.post(apiUrl, category);

    if (addData.status !== 201) logger("Failed", category);

    logger("Success", category);
  });
};

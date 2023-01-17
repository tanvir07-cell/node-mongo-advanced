const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const dbLocation = path.resolve("src", "db.json");

module.exports.getRandomUser = async (req, res) => {
  const data = await fs.readFile(dbLocation);
  const users = JSON.parse(data);

  // get the random user index:
  const randomUserIndex = Math.floor(Math.random() * users.length);

  // get the random user data:
  const user = users[randomUserIndex];

  if (user) {
    return res.status(200).json({
      message: "Successfully find the random user",
      user,
    });
  } else return res.status(404).json({ message: "user not found!" });
};

module.exports.getAllUsers = async (req, res) => {
  const data = await fs.readFile(dbLocation);

  //   parsing the json data because we know that in database all documents are the JSON:
  const users = JSON.parse(data);

  const { limit } = req.query;

  if (limit) {
    return res.status(200).json(users.slice(0, limit));
  }
  res.status(200).json(users);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports.postUser = async (req, res) => {
  // post the single user into the users array:

  const user = {
    id: shortid.generate(),
    ...req.body,
  };
  const { gender, name, contact, photoUrl, address } = req.body;
  //   get the users from src/db.json file and it returns the buffer then i convert the buffer into the json object:
  const data = await fs.readFile(dbLocation);
  const users = JSON.parse(data);

  //   push the single user into the users array:
  if (gender && name && contact && photoUrl && address) {
    users.push(user);
  }

  //   then write the all users into the src/db.json file:
  fs.writeFile(dbLocation, JSON.stringify(users));

  if (gender && name && contact && photoUrl && address) {
    return res.status(201).json({
      message: "Successfully added user",
      users,
    });
  }

  return res.status(400).json({ message: "Could not add this user", user });
};

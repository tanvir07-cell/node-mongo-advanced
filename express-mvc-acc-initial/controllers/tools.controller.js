const { ObjectID } = require("bson");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db");

const tools = [
  { id: 1, item: "Hammer1" },
  { id: 2, item: "Hammer2" },
  { id: 3, item: "Hammer3" },
];

module.exports.getAllTools = async (req, res, next) => {
  try {
    const db = getDb();
    // get all tools:
    // await db.collection("tools").find() ekti cursor return kore ar ei cursor theke  value gula nite chailte toArray() ar forEach() ei 2 ta method ache:
    const tools = await db.collection("tools").find().toArray();

    if (tools.length > 0) {
      return res
        .status(200)
        .json({ message: "Successfully get all tools", tools });
    }
    return res.status(400).json({ message: "No tools found!" });
  } catch (err) {
    next(err);
  }
};

module.exports.getToolById = async (req, res, next) => {
  try {
    const db = getDb();

    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid id!" });
    }

    const tool = await db.collection("tools").findOne({ _id: ObjectID(id) });
    console.log(tool);

    if (tool) {
      return res.status(200).json({ success: true, data: tool });
    }
    return res.status(400).json({ success: false, message: "No tool found!" });
  } catch (err) {
    next(err);
  }
};

module.exports.postAllTools = async (req, res, next) => {
  //  call the database and after call the database save the data into the mongodb database

  try {
    const db = getDb();
    const tool = req.body;

    // save the data into the collection of tools:
    const result = await db.collection("tools").insertOne(tool);

    if (result.insertedId) {
      return res.status(201).json({ success: true, result });
    }

    return res.status(400).json({ message: "please try again!" });
  } catch (err) {
    // catch the error and pass it to the global error handler in index.js file:
    next(err);
  }
};

module.exports.updateTool = async (req, res) => {
  const db = getDb();
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid tool id!" });
  }

  const tool = await db
    .collection("tools")
    .updateOne({ _id: ObjectID(id) }, { $set: req.body });

  console.log(tool);
  if (!tool.modifiedCount) {
    return res.status(400).json({
      success: false,
      message: "please give some updated information!",
    });
  }
  return res
    .status(200)
    .json({ success: true, message: "Successfully updated tool" });
};

module.exports.deleteTool = async (req, res, next) => {
  try {
    const db = getDb();

    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid tool id!" });
    }

    const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id) });
    console.log(tool);

    if (!tool) {
      return res.status(400).json({
        success: false,
        message: "please provide id carefully",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted tool" });
  } catch (err) {
    next(err);
  }
};

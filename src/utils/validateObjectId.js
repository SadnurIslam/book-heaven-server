const { ObjectId } = require("mongodb");

const isValidObjectId = (value) => ObjectId.isValid(value);
const toObjectId = (value) => new ObjectId(value);

module.exports = { isValidObjectId, toObjectId };

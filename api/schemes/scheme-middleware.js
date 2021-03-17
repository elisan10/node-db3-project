/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: `scheme with scheme_id ${id} not found` });
  } else {
    next();
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const schemeName = req.params.schem_name;
  if (
    !schemeName ||
    schemeName.length === 0 ||
    typeof schemeName !== "string"
  ) {
    res.status(400).json({ message: "invalid schema_name" });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.params.instructions;
  const stepNumber = req.params.step_number;

  if (
    !instructions ||
    instructions.length === 0 ||
    typeof instructions !== "string"
  ) {
    res.status(400).json({ message: "invalid step" });
  } else if (typeof stepNumber !== "number" || stepNumber < 1) {
    res.status(400).json({ message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};

const _ = require("lodash");
const { MedicineOrder } = require("../models/medicine_order");
const { validateAddMedicineOrder } = require("../validations/validations");

exports.getMedicineOrder = async (req, res, next) => {
  console.log(req.user._id );

  let medicineOrder = await MedicineOrder.find({ user: req.user._id }).populate("ciy").populate("user", "-password");            

  res.status(200).json(medicineOrder);
};

exports.addMedicineOrder = async (req, res, next) => {
  const { error } = validateAddMedicineOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // todo : should add time
  // let date = new Date();

  let medicineOrder = await MedicineOrder(
    _.pick(req.body, ["user",  "pharmacist" ,"medicine", "timeTableId", "status" ])
  );

  const result = await medicineOrder.save();

  // todo : should send notification to user oder

  res.status(200).json({
    success: true,
  });
};

exports.cancelMedicineOrder = async (req, res, next) => {
  let medicineOrder = await MedicineOrder.findOne({ _id: req.params.id });
  if (!medicineOrder) return res.status(400).send("Invalid MedicineOrdering");

  await MedicineOrder.updateOne(
    { _id: req.params.id },
    {
      $set: {
        active: !medicineOrder.active,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
  d;
};

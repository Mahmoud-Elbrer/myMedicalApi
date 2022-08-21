const Joi = require("joi");

exports.validateSignUp = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(3).max(255).required(),
    gender: Joi.number().required(),
    bloodType: Joi.string().required(),
  });
  return schema.validate(user);
};

exports.validateSignUpDoctor = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(3).max(255).required(),
    gender: Joi.number().required(),
    bloodType: Joi.string().required(),
    specialize: Joi.string().required(),
    clinic: Joi.string().required(),
    city: Joi.string().required(),
    birthDay: Joi.string().required(),
    experienceYears: Joi.number().required(),
    hospital: Joi.string(),
    appointmentFee: Joi.string().required(),
    aboutBio: Joi.string().required(),
    image: Joi.string(),
    longitude: Joi.string().required(),
    Latitude: Joi.string().required(),
    active: Joi.boolean().required(),
  });
  return schema.validate(user);
};

exports.validateSignIn = function (user) {
  const schema = Joi.object({
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(3).max(255),
  });
  return schema.validate(user);
};


exports.validateAddSpecialize = function (category) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(category);
};


exports.validateAddFavorite = function (favorite) {
  const schema = Joi.object({
    user: Joi.string().required(),
    doctor: Joi.string().required(),
  });
  return schema.validate(favorite);
};


exports.validateAddTimeTable = function (timeTable) {
  const schema = Joi.object({
    doctor: Joi.string().required(),
    day: Joi.number().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    isActive: Joi.boolean() ,
  });
  return schema.validate(timeTable);
};



exports.validateAddTypeService = function (typeService) {
  const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
  });
  return schema.validate(typeService);
};

exports.validateAddBook = function (order) {
  const schema = Joi.object({
    user: Joi.string().required(),
    doctor: Joi.string().required(),
    timeTableId: Joi.string().required(),
    status: Joi.number().required(),
    createdAt: Joi.string(),
  });
  return schema.validate(order);
};

exports.validateAddNotification = function (notification) {
  const schema = Joi.object({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    typeNotification: Joi.string().required(),
  });
  return schema.validate(notification);
};

exports.validateAddFireBaseToken = function (notification) {
  const schema = Joi.object({
    user: Joi.string().required(),
    firebaseToken: Joi.string().required(),
  });
  return schema.validate(notification);
};

exports.validateAddState = function (state) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(state);
};

exports.validateAddCity = function (state) {
  const schema = Joi.object({
    state: Joi.string().required(),
    name: Joi.string().required(),
  });
  return schema.validate(state);
};

exports.validateAddFacilities = function (state) {
  const schema = Joi.object({
    name: Joi.string().required(),
    imageUrl: Joi.string().required(),
  });
  return schema.validate(state);
};

var userRouter = require("../routes/user");
var authDoctorRouter = require("../routes/auth_doctor");
var specializeRouter = require("../routes/specialize");
var clinicRouter = require("../routes/clinic");
var doctorRouter = require("../routes/doctor");
var timetableRouter = require("../routes/timetable");
var favoriteRouter = require("../routes/favorite");
var bookRouter = require("../routes/book");
var notificationRouter = require("../routes/notification");
var stateRouter = require("../routes/state");
var cityRouter = require("../routes/city");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/api/user", userRouter);
  app.use("/api/authDoctor", authDoctorRouter);
  app.use("/api/specialize", specializeRouter);
  app.use("/api/clinic", clinicRouter);
  app.use("/api/doctor", doctorRouter);
  app.use("/api/timetable", timetableRouter);
  app.use("/api/favorite", favoriteRouter);
  app.use("/api/book", bookRouter);
  app.use("/api/notification", notificationRouter);
  app.use("/api/state", stateRouter);
  app.use("/api/city", cityRouter);
  app.use(error);
};

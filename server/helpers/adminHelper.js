// admin operations

const user = require("../config/models/userModel");
const jwt = require("jsonwebtoken");

module.exports = {
  // admin find mongoose operation
  doLogin: ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      const adminDetails = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      };
      if (adminDetails) {
        if (
          adminDetails.email === email &&
          adminDetails.password === password
        ) {
          const data = {
            time: Date(),
            id: adminDetails.email,
          };
          const token = jwt.sign({ data }, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });
          resolve({
            status: "ok",
            admin: true,
            token: token,
          });
        } else {
          reject({ status: "error", error: "invalid username or password" });
        }
      } else {
        reject({ status: "error", error: "admin not found" });
      }
    });
  },

  // userDetails get operation
  getUserDetails: () => {
    return new Promise((resolve, reject) => {
      user
        .find()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject("userDetails find error:", err);
        });
    });
  },

  editUserDetails: (userDetails) => {
    const { userId, firstname, lastname, email, phone } = userDetails;
    return new Promise((resolve, reject) => {
      user.findOne({ email }).then((data) => {
        if (!data) {
          update()
        } else if (data._id.equals(userId)) {
          update()
        } else {
          reject({
            status: "error",
            userUpdated: false,
            err: "email already exists",
          });
        }
        function update (){
          user
            .updateOne(
              { _id: userId },
              {
                $set: {
                  firstname,
                  lastname,
                  email,
                  phone,
                },
              }
            )
            .then(() => {
              resolve({ status: "ok", userUpdated: true, userDetails });
            })
            .catch((err) => {
              reject({ status: "error", userUpdated: false, error: err });
            });
        };
      });
    });
  },

  // userDetails delete operation
  deleteUserDetails: (userId) => {
    return new Promise((resolve, reject) => {
      user
        .deleteOne({ _id: userId })
        .then(() => {
          resolve({ status: "ok", userDeleted: true });
        })
        .catch((err) => {
          reject({ status: "error", userDeleted: false, err });
        });
    });
  },
};

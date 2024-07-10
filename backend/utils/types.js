const zod = require("zod");

const UserParser = zod.object({
  name: zod.string({
    required_error: "Name: This field is required",
  }),
  email: zod
    .string({
      required_error: "Email: This field is required",
    })
    .email("Email: Please enter a valid email address"),
  mobile: zod
    .string({
      required_error: "Mobile: This field is required",
    })
    .length(10, "Mobile: Mobile number must only contain 10 characters"),
  password: zod
    .string({
      required_error: "Password: This field is required",
    })
    .min(8, "Password: Password must contain minimum 8 characters"),
});

module.exports = {
  UserParser,
};

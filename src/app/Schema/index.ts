import * as Yup from 'yup'

export const RegisterSchema = Yup.object({
    username: Yup.string().required("username is required"),
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().notRequired(),
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], "must match")
});


export const LoginSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("This field is required"),
});

export const EditSchema = Yup.object({
    first_name: Yup.string().required("This field is required"),
    last_name: Yup.string().notRequired(),
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
})
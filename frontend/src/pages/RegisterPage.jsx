import * as Yup from "yup";
import { useFormik } from "formik";
import { FileParser } from "../utils/FileParser";
import { useEffect, useRef } from "react";
import UserService from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  let firstNameInputRef = useRef();
  let imageInputRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    firstNameInputRef.current.focus();
  }, []);

  // image validation
  const VALID_TYPES = ["image/png", "image/jpg", "image/jpeg"];
  const KB = 1024;
  const MB = KB * 1024;

  const formik = useFormik({
    // 1. initialValues
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      birthDate: "",
      image: "",
    },

    // 2. validation Yup
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(
          /^[A-Z][a-zA-Z-]+$/,
          "First name must start with a capital letter and contain only letters and hyphens"
        )
        .required("First Name is required!"),
      lastName: Yup.string()
        .matches(
          /^[A-Z][a-zA-Z-]+$/,
          "Last name must start with a capital letter and contain only letters and hyphens"
        )
        .required("Last Name is required!"),
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email is required!"),
      password: Yup.string().min(4).required("Password is required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match!")
        .required("Confirm password is required!"),
      gender: Yup.string().required("Gender is required!"),
      birthDate: Yup.string().required("Birth Date is required!"),
      image: Yup.mixed()
        .required("Profile image is required!")
        .test(
          "fileSize",
          "Image size must be under 1MB",
          (value) => value.size < MB * 0.5
        )
        .test("fileType", "Valid image types are jpg, jpeg and png.", (value) =>
          VALID_TYPES.includes(value.type)
        ),
    }),

    // 3. onSubmit
    onSubmit: (values) => {
      FileParser(values.image)
        .then((res) => {
          UserService.registerUser({ ...values, image: res })
            .then((res) => {
              console.log(res.data);
              toast.success(res.data);
              navigate("/login");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      formik.resetForm();
      imageInputRef.current.value = "";
    },
  });

  const showErrors = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];
  return (
    <div className="container mx-auto flex flex-col items-center gap-[20px] py-[20px] bg-slate-200 text-slate-900 dark:bg-neutral-600">
      <h2 className="text-2xl font-semibold text-blue-600 dark:text-green-600">
        Register
      </h2>
      <form
        className="flex flex-col gap-[5px] items-center border border-slate-900 p-[20px] rounded-md w-[35%] dark:border-slate-200"
        onSubmit={formik.handleSubmit}
      >
        {/* firstName */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="firstName"
            className={`${
              showErrors("firstName") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("firstName") ? showErrors("firstName") : "First Name"}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            ref={firstNameInputRef}
          />
        </div>
        {/* lastName */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="lastName"
            className={`${
              showErrors("lastName") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("lastName") ? showErrors("lastName") : "Last Name"}
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </div>
        {/* email */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="email"
            className={`${
              showErrors("email") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("email") ? showErrors("email") : "Email"}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        {/* password */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="password"
            className={`${
              showErrors("password") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("password") ? showErrors("password") : "Password"}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        {/* confirmPassword */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="confirmPassword"
            className={`${
              showErrors("confirmPassword") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("confirmPassword")
              ? showErrors("confirmPassword")
              : "Confirm password"}
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
        </div>
        {/* gender */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="gender"
            className={`${
              showErrors("gender") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("gender") ? showErrors("gender") : "Gender"}
          </label>
          <select
            name="gender"
            id="gender"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="" defaultChecked>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {/* birthDate */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="birthDate"
            className={`${
              showErrors("birthDate") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("birthDate") ? showErrors("birthDate") : "Birth Date"}
          </label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            placeholder="Birth Date"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
          />
        </div>
        {/* image */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="image"
            className={`${
              showErrors("image") ? "text-xs text-red-600" : "text-xs"
            }`}
          >
            {showErrors("image") ? showErrors("image") : "Profile image"}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="outline-none border py-[8px] px-[16px] rounded-lg"
            ref={imageInputRef}
            onChange={(e) =>
              formik.setFieldValue(e.target.name, e.target.files[0])
            }
          />
        </div>
        <button
          type="submit"
          className="py-[8px] px-[16px] bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition-all duration-300 dark:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;

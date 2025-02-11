import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserService from "../services/userService";
import { toast } from "react-toastify";

function LoginPage() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
      password: Yup.string().min(4).required("Password is required"),
    }),
    onSubmit: (values) => {
      UserService.login(values)
        .then((res) => {
          console.log(res.data);
          if (res.data === "User logged") {
            toast.success("User Logged");
            navigate("/products");
            formik.resetForm();
          } else {
            toast.error(res.data);
          }
        })
        .catch((err) => console.log(err));
    },
  });

  const showErrors = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];
  const emailInputRef = useRef();
  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <div className="container mx-auto h-[88vh] flex flex-col items-center gap-[30px] py-[50px] bg-slate-200 text-slate-900 dark:text-slate-200 dark:bg-neutral-600">
      <h2 className="text-2xl font-semibold text-blue-600 dark:text-green-600">
        Login
      </h2>
      <form
        className="border border-slate-900 rounded-md dark:border-slate-200 p-[40px] flex flex-col gap-[20px] w-[30%]"
        onSubmit={formik.handleSubmit}
      >
        {/* email */}
        <div className="flex flex-col">
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
            className="outline-none py-[8px] px-[16px] rounded-lg"
            ref={emailInputRef}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        {/* password */}
        <div className="flex flex-col">
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
            className="outline-none py-[8px] px-[16px] rounded-lg"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-[8px] px-[16px] rounded-lg dark:bg-green-600"
        >
          Login
        </button>
        <Link
          to={"/register"}
          className="self-end text-red-600 hover:underline text-md"
        >
          Register
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;

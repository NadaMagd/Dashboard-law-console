import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Login() {
  // let { setUserLogin } = useContext(UserContext);

  let [errorMessage, setErrorMessage] = useState(""); // for declear error message
  let navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      // .matches(/^[a-z][a-z0-9]{5,10}$/, "")
      .min(6, "password must be at least 6 char")
      .required("password is required"),
  });
  const handleSubmit = async (values) => {
    try {
      setErrorMessage(""); // reset error
      console.log(values);
      let userLogin = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const uid = userLogin.user.uid;

      const adminDoc = doc(db, "admins", uid);
      const getAdmin = await getDoc(adminDoc);
      if (getAdmin.exists()) {
        localStorage.setItem("uid", uid); // to set admin
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        }).then(()=>{
          navigate("/");
        })
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
          title: "error",
          text: error.message,
          icon: "error",
        });
    }
  };

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className=" flex items-center justify-center text-white min-h-screen ">
      <div className="bg-[#1c202e] shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center  mb-6">Welcome</h2>
        <form
          action="#"
          method="POST"
          className="space-y-5"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-[#c9b38c] text-white py-2 px-4 rounded-lg hover:bg-[#b69d75] transition duration-200"
          >
            Login
          </button>
          {errorMessage ? (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

import React from "react";

export default function Login() {
  return (
    <div className=" flex items-center justify-center text-white min-h-screen ">
      <div className="bg-[#1c202e] shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center  mb-6">
          Welcome
        </h2>
        <form action="#" method="POST" className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium "
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#c9b38c] text-white py-2 px-4 rounded-lg hover:bg-[#b69d75] transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

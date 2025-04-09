"use client";

import router from "next/navigation";
import Layout from "../../components/Layout";
import { FormEvent, useState } from "react";
import { isAdmin, updateUser } from "../../../func";

export default function Modal({
  uid,
  id,
  type,
  email,
  name,
  admin,
  accepted,
  toggle,
}: {
  uid: string;
  id: string;
  type: string;
  email: string;
  name: string;
  admin: boolean;
  accepted: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [inputEmail, setEmail] = useState(email);
  const [inputName, setName] = useState(name);
  const [inputType, setType] = useState(type);
  const [inputID, setID] = useState(id);
  const [inputAdmin, setAdmin] = useState(admin);
  const [inputAccepted, setAccepted] = useState(accepted);

  const editUser = async (event: React.FormEvent) => {
    event.preventDefault();
    updateUser(uid, inputType, inputAdmin, inputID, null, null, null, null, inputAccepted);
    toggle(false);
  };
  return (
    <>
      <div
        className="absolute w-screen h-screen bg-black z-10"
        onClick={(_) => toggle(false)}
      >
        <div
          className="relative flex flex-col min-h-3/4 sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-black self-center text-4xl font-bold pt-20">
            User Data
          </span>
          <span className="self-center text-lg p-10 invisible" />
          <div className="flex flex-col">
            <form
              onSubmit={editUser}
              className="[&>*]:block rounded-sm w-3/4 justify-center self-center content-center"
            >
              <input
                type="text"
                value={inputEmail}
                onChange={(e) => setEmail(e.target.value)}
                id="username"
                placeholder="Email"
                className={
                  "w-full border-b-2 mr-5 my-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
                }
              />
              <input
                type="text"
                value={inputName}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Name"
                className="w-full border-b-2 mr-5 my-5 pt-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
              />
              <input
                type="text"
                value={inputType}
                onChange={(e) => setType(e.target.value)}
                id="type"
                placeholder="Type"
                className="w-full border-b-2 mr-5 my-5 pt-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
              />
              <input
                type="text"
                value={inputID}
                onChange={(e) => setID(e.target.value)}
                id="id"
                placeholder="Student ID"
                className="w-full border-b-2 mr-5 my-5 pt-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
              />
              <div className="[&>*]:inline-block">
                <label htmlFor="admin" className="text-gray-400 w-2/6">
                  Admin?
                </label>
                <input
                  type="checkbox"
                  value={inputName}
                  checked={inputAdmin}
                  onChange={(e) => setAdmin(e.target.checked)}
                  id="admin"
                  className="border-b-2 ml-5 my-5 pt-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
                />
              </div>
              <div className="[&>*]:inline-block">
                <label htmlFor="accepted" className="text-gray-400 w-2/6">
                  Accepted?
                </label>
                <input
                  type="checkbox"
                  value={inputName}
                  checked={inputAccepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  id="accepted"
                  className="border-b-2 ml-5 my-5 pt-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 p-5 mt-16 w-full hover:bg-gray-600"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="p-10 self-center text-center"></div>
        </div>
      </div>
    </>
  );
}

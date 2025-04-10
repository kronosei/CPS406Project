"use client";

import router from "next/navigation";
import Layout from "../../components/Layout";
import { FormEvent, useState } from "react";
import { isAdmin, updateUser } from "../../../func";
import { auth } from "../../..";
import { sendPasswordResetEmail } from "firebase/auth";


export default function Modal() {
    const [inputEmail, setEmail] = useState("")
    const [result, setResult] = useState("")
    const [error, setError] = useState("")

    const resetPass = async (event: React.FormEvent) => {
        event.preventDefault()
        sendPasswordResetEmail(auth, inputEmail).then(() => {
            setResult("Password Reset Link Sent!")
        }).catch((e) => {
            setError("Invalid Email")
        })

    }
    return (
        <>
            <div className="relative flex flex-col min-h-3/4 sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2" onClick={(e) => e.stopPropagation()}>
                <span className="text-black self-center text-4xl font-bold pt-20">
                    Reset Your Password
                </span>
                <span className={
                    result
                        ? "text-green-500 self-center text-lg p-10 font-bold"
                        : error ? "text-red-500 self-center text-lg p-10 font-bold" : "self-center text-lg p-10 invisible"
                } > {result ? result : error ? error : null}</span>
                <div className="flex flex-col">
                    <form
                        onSubmit={resetPass}
                        className="[&>*]:block rounded-sm w-3/4 justify-center self-center content-center"
                    >
                        <input
                            type="text"
                            value={inputEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => {
                                setError("")
                                setResult("")
                            }}
                            id="username"
                            placeholder="Email"
                            className={"w-full border-b-2 mr-5 my-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"}
                        />
                        <button type="submit" className="bg-gray-800 p-5 mt-16 w-full hover:bg-gray-600 cursor-pointer">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="p-10 self-center text-center">
                </div>
            </div>
        </>
    )
}

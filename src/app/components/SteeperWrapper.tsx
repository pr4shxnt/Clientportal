"use client";

import { useEffect, useState } from "react";
import Stepper, { Step } from "./Steeper";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";

export default function SteeperComponent() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isCredentials, setIsCredentials] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {error} = useSelector((state:any)=> state.auth)

  console.log(error)

  useEffect(() => {
    if (!username && !password) {
      setIsCredentials(false);
    } else if (username && password) {
      setIsCredentials(true);
    } else {
      setIsCredentials(false);
    }
  }, [username, password]);

  const maskPassword = (pwd: string) => {
    if (!pwd) return "";
    const visibleChars = 3;
    if (pwd.length <= visibleChars) return pwd;
    const maskedPart = "*".repeat(pwd.length - visibleChars);
    return maskedPart + pwd.slice(-visibleChars);
  };

  return (
    <div className="h-full">
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => alert("All steps completed!")}
        backButtonText="Previous"
        nextButtonText="Next"
        isCredentials={isCredentials}
        credentials={{username, password}}
      >
        <Step>
          <h2>Hey Client,</h2>
          <p className="">Welcome! Please login to continue.</p>
        </Step>
        <Step>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Your name here:"
            className="w-full py-2 mt-2 outline-none px-3 bg-gray-900 text-gray-300 rounded-lg"
          />
          <div className="relative">
            <input
              value={password}
              type={`${showPassword ? "text" : "password"}`}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your Password here:"
              className="w-full py-2 mt-2 outline-none px-3 bg-gray-900 text-gray-300 rounded-lg"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-4 right-3 cursor-pointer"
              type="button"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="flex justify-end">
            <a href="" className="mt-3 px-2 text-blue-500 text-sm">
              Forgot Password?
            </a>
          </div>
        </Step>
        <Step>
          <h2>
            {isCredentials  ? (
              !error? 
              "Please review your credentials." : ""
            ) : (
              <span className="text-red-500">Please fill in all fields.</span>
            )}
          </h2>
          {!error && username && password &&<div className="mt-3 flex flex-col items-center text-sm">
            <p>username: {username}</p>
            <p>password: {maskPassword(password)}</p>
          </div>}
          {
            error && <div className="mt-3 flex flex-col items-center text-sm"><p className="text-red-500">{error} Please review your credentials</p></div>
          }
        </Step>
      </Stepper>
    </div>
  );
}

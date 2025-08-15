"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  error,
  autoComplete = "new-password",
  minLength = "8",
  pattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        className="p-3 w-full text-black bg-white bg-opacity-90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600"
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        pattern={pattern}
        type={showPassword ? "text" : "password"}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "👁️" : "👁️‍🗨️"}
      </button>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    if (!/\d/.test(value)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    if (!/[A-Za-z]/.test(value)) {
      setPasswordError("Password must contain at least one letter");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validatePassword(password) || !validateConfirmPassword()) {
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-white md:text-2xl">
        Reset Password
      </h1>
      <p className="mb-6 text-white text-opacity-80">
        Enter your new password below
      </p>
      <div className="flex flex-col gap-4 w-full">
        <PasswordInput
          placeholder="New Password"
          value={password}
          onChange={setPassword}
          error={passwordError}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={confirmPasswordError}
        />
      </div>
      <button
        className="mt-6 px-6 py-3 w-full text-white bg-lime-600 rounded-lg transition-all duration-200 hover:bg-lime-700 disabled:opacity-50"
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Confirming..." : <Link to="/verified">Confirm</Link>}
      </button>
    </>
  );
};

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-white md:text-2xl">
        Forgot Password
      </h1>
      <p className="mb-6 text-white text-opacity-80">
        Enter your email to receive reset instructions
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
        <input
          className="p-3 w-full text-black bg-white bg-opacity-90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button
          className="px-6 py-3 w-full text-white bg-lime-600 rounded-lg transition-all duration-200 hover:bg-lime-700 disabled:opacity-50"
          disabled={isSubmitting}
          onClick={handleForgotPassword}
        >
          {isSubmitting ? "Sending..." : "Reset Password"}
        </button>
        <button
          className="mt-2 text-sm underline text-white text-opacity-80"
          onClick={onBack}
        >
          Back to Login
        </button>
      </div>
    </>
  );
};

const ResetPassword = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-screen p-5 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')]">
      <section className="p-8 mx-auto bg-slate-500 bg-opacity-80 border border-gray-300 rounded-lg shadow-lg w-full max-w-md md:p-7 sm:p-6">
        <div className="mb-6 text-center">
          {isForgotPassword ? (
            <ForgotPasswordForm onBack={() => setIsForgotPassword(false)} />
          ) : (
            <ResetPasswordForm />
          )}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;

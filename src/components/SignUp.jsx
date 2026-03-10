import {  useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import authService from "../appwrite/auth";
import { login as storeLogin} from '../features/authSlice'
import {Button , Input ,Logo } from './index'

function SignUp() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

     const onSubmit = async ({name, email, password }) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.createUser({ email, password,name });
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(storeLogin(user));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">
            Sign in
          </Link>
        </p>

        {/* Global error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Full name"
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
          />

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

      </div>
    </div>
  );
}

export default SignUp;
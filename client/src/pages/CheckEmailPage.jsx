import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CheckEmailPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/login`
    try{
      const response = await axios.post(URL,data,{withCredentials:true})
      console.log("response", response)
      toast.success(response.data.message)

      if(response.data.success){
        reset()
        navigate('/')
      }

    }
    catch(error){
      toast.error(error?.response?.data?.message || "Failed to login")
      console.log("login during error", error)
    }
  }


  return (
    <>
      <div className="mt-10 flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden p-6 mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Login to Chat App!
          </h3>
          <form className="grid gap-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter your email"
                className="bg-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                {...register('email', { required: "Email is required" })}
              />
              {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter your password"
                className="bg-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                {...register('password', { required: "Password is required" })}
              />
              {errors.password && <span className="text-red-600">{errors.password.message}</span>}
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </form>
          <p className="my-3 text-center">
            No account?{" "}
            <Link to={"/register"} className="text-black hover:text-blue-500 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default CheckEmailPage
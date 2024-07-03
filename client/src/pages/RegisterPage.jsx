import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  
  const onSubmit = async (data) => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`;

    try {
      // Send a POST request to the registration endpoint 
      const response = await axios.post(URL, data);
      console.log("response", response); 
      toast.success(response.data.message); 

      // Check if the registration was successful
      if (response.data.success) {
        reset();
        navigate('/login'); 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register.");
      console.error("Error during registration:", error); 
    }
    console.log("data", data); 
  };

  return (
    <>
      <div className="mt-10 flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden p-6 mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Welcome to Chat App!
          </h3>
          <form className="grid gap-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="enter your name"
                className="bg-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                {...register('name', { required: "Name is required" })}
              />
              {errors.name && <span className="text-red-600">{errors.name.message}</span>}
            </div>

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

            {/* The following block is commented out for potential future use if profile picture upload is needed
            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic">
                Photo :
                <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                  <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                    {uploadPhoto?.name
                      ? uploadPhoto?.name
                      : "Upload profile photo"}
                  </p>
                  {uploadPhoto?.name && (
                    <button
                      className="text-lg ml-2 hover:text-red-600"
                      onClick={handleClearUploadPhoto}
                    >
                      <IoClose />
                    </button>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
                onChange={handleUploadPhoto}
              />
            </div> */}

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </form>
          <p className="my-3 text-center">
            Already have account?{" "}
            <Link to={"/login"} className="text-black hover:text-blue-500 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};


export default RegisterPage;



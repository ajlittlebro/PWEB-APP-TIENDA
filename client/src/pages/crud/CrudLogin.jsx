import { useForm } from "react-hook-form";
import { UseAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = UseAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/crud/dashboard");
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {signinErrors.map((error, i) => (
          <div key={i} className="text-red-500">
            {error}
          </div>
        ))}
        <p className="flex items-center justify-center">Login</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-6" >
          <input
            type="email"
            {...register("correo", { required: true })}
            placeholder="Correo"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          {errors.correo && <p className="text-red-500">Correo es requerido</p>}
          <input
            type="password"
            {...register("contrasena", { required: true })}
            placeholder="Contraseña"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          {errors.contrasena && (
            <p className="text-red-500">Contraseña es requerido</p>
          )}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

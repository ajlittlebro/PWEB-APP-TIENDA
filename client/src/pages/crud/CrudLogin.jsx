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
    <div>
      {signinErrors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={onSubmit}>
        {errors.rol && <p>Rol es requerido</p>}
        <input
          type="email"
          {...register("correo", { required: true })}
          placeholder="Correo"
        />
        {errors.correo && <p>Correo es requerido</p>}
        <input
          type="password"
          {...register("contrasena", { required: true })}
          placeholder="Contraseña"
        />
        {errors.contrasena && <p>Contraseña es requerido</p>}
        <button type="submit">Crear</button>
      </form>

      <p>
        Don't have an account? <Link to="/crear-usuario">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;

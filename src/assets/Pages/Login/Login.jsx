import styles from "./Login.module.css";
import logoGabor from "../../Images/logo-gabor.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordSubmit = () => {
    if (password === "gabor123") {
      navigate("/home", { state: { name } });
    } else {
      console.log("Senha incorreta");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.login}>
      <img src={logoGabor} alt="logotipo da gabor" />
      <div className={styles.formContainer}>
        <form>
          <label>Nome</label>
          <input type="text" value={name} onChange={handleNameChange} />
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className={styles.btn} onClick={handlePasswordSubmit}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

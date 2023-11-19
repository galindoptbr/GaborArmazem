import styles from "./Login.module.css";
import logoGabor from "../../Images/logo-gabor.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handlePasswordSubmit = () => {
    if (password === "gabor123") {
      navigate("/home", { state: { name } });
    } else {
      setError("Palavra-passe incorreta");
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
        <div className={styles.inputLogin}>
          <label>Nome</label>
          <input type="text" value={name} onChange={handleNameChange} />
          <label>Palavra-passe</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
          <button className={styles.btn} onClick={handlePasswordSubmit}>
            Entrar
          </button>
          {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

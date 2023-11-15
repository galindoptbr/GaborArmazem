import { useState } from "react";
import styles from "./Home.module.css";
import jsPDF from "jspdf";
import emailjs from "emailjs-com";

export const Home = () => {
  const opcoesMaterial = ["", "SOLAS", "PALMILHAS", "TACOES"];
  const [escolhaMaterial, setEscolhaMaterial] = useState("");

  const opcoesDificuldade = ["", "A", "B", "C"];
  const [escolhaDificuldade, setEscolhaDificuldade] = useState("");

  const [quantidade, setQuantidade] = useState(0);
  const [referencia, setReferencia] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const handleEscolhaMaterial = (e) => {
    setEscolhaMaterial(e.target.value);
  };

  const handleEscolhaDificuldade = (e) => {
    setEscolhaDificuldade(e.target.value);
  };

  const handleQuantidadeChange = (e) => {
    setQuantidade(e.target.value);
  };

  const handleReferenciaChange = (e) => {
    setReferencia(e.target.value);
  };

  const handleObservacoesChange = (e) => {
    setObservacoes(e.target.value);
  };

  

  return (
    <div className={styles.home}>
      <div className={styles.headerHome}>
        <h1>Gabor</h1>
        <p>Armazem</p>
      </div>
      <div className={styles.infoPerson}>
        <h2>Adsandro Galindo</h2>
        <p>15/11/2023</p>
      </div>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.material}>
            <label>Material</label>
            <select value={escolhaMaterial} onChange={handleEscolhaMaterial}>
              {opcoesMaterial.map((opcao, index) => (
                <option value={opcao} key={index}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.referencia}>
            <label>Referencia</label>
            <input type="text"/>
          </div>
          <div className={styles.dificuldade}>
            <label>Dificuldade</label>
            <select value={escolhaDificuldade} onChange={handleEscolhaDificuldade}>
                {opcoesDificuldade.map((opcao, index) => (
                    <option value={opcao} key={index}>
                        {opcao}
                    </option>
                ))}
            </select>
          </div>
          <div className={styles.quantidade}>
            <label>Quantidade</label>
            <input type="number"/>
          </div>
        </form>
        <div className={styles.observacoes}>
            <p>Outros trabalhos</p>
            <textarea placeholder="O que fez alem das partidas?" cols="30" rows="7"></textarea>
        </div>
      </div>
      <button className={styles.btn}>Enviar</button>
    </div>
  );
};

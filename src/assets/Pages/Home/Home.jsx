import { useRef, useState } from "react";
import styles from "./Home.module.css";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";

export const Home = () => {
  const opcoesMaterial = ["", "SOLAS", "PALMILHAS", "TACOES"];
  const [escolhaMaterial, setEscolhaMaterial] = useState("");

  const opcoesDificuldade = ["", "A", "B", "C"];
  const [escolhaDificuldade, setEscolhaDificuldade] = useState("");

  const [quantidade, setQuantidade] = useState(0);
  const [referencia, setReferencia] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const form = useRef();

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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(20, 20, `Material: ${escolhaMaterial}`);
    doc.text(20, 30, `Referência: ${referencia}`);
    doc.text(20, 40, `Dificuldade: ${escolhaDificuldade}`);
    doc.text(20, 50, `QUantodade: ${quantidade}`);
    doc.text(20, 60, `Observações: ${observacoes}`);

    return doc.output();
  };

  const sendEmailWithPDF = (e) => {
    e.preventDefault();
    const pdfOutput = generatePDF();

    const emailData = {
      to_email: "adsandro.galindo@gmail.com",
      from_name: "Armazem",
      subject: "Partidas do dia",
      message: "Corpo do email",
      attachment: new Blob([pdfOutput], { type: "application/pdf" }),
    };

    emailjs
      .sendForm(
        "service_ys23w05",
        "template_c4bxjo9",
        form.current,
        "bpPs98Htqb071c2yA",
        emailData
      )
      .then((result) => {
        console.log("Emial enviado com sucesso!", result.text);
      })
      .catch((error) => {
        console.error("Erro ao envair o email:", error.text);
      });
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
        <form ref={form} onSubmit={sendEmailWithPDF}>
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
            <input
              type="text"
              value={referencia}
              onChange={handleReferenciaChange}
            />
          </div>
          <div className={styles.dificuldade}>
            <label>Dificuldade</label>
            <select
              value={escolhaDificuldade}
              onChange={handleEscolhaDificuldade}
            >
              {opcoesDificuldade.map((opcao, index) => (
                <option value={opcao} key={index}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.quantidade}>
            <label>Quantidade</label>
            <input
              type="number"
              value={quantidade}
              onChange={handleQuantidadeChange}
            />
          </div>
          <div className={styles.observacoes}>
            <p>Outros trabalhos</p>
            <textarea
              placeholder="O que fez alem das partidas?"
              cols="30"
              rows="7"
              value={observacoes}
              onChange={handleObservacoesChange}
            ></textarea>
          </div>
          <button type="submit" className={styles.btn}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

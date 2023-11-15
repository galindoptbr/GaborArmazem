import { useRef, useState } from "react";
import styles from "./Home.module.css";
import { jsPDF } from "jspdf";

export const Home = () => {
  const opcoesMaterial = ["", "SOLAS", "PALMILHAS", "TACOES"];
  const [escolhaMaterial, setEscolhaMaterial] = useState("");

  const opcoesDificuldade = ["", "A", "B", "C"];
  const [escolhaDificuldade, setEscolhaDificuldade] = useState("");

  const [quantidade, setQuantidade] = useState("");
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
    return new Promise((resolve) => {
      const doc = new jsPDF();
      doc.text(`Material: ${escolhaMaterial}`, 10, 10);
      doc.text(`Referência: ${referencia}`, 10, 20);
      doc.text(`Dificuldade: ${escolhaDificuldade}`, 10, 30);
      doc.text(`Quantidade: ${quantidade}`, 10, 40);
      doc.text(`Observações: ${observacoes}`, 10, 50);
      const pdfOutput = doc.output();
      doc.save("a4.pdf");

      resolve(pdfOutput);
    });
  };

  const sendEmailWithAttachment = async () => {
    const pdfOutput = generatePDF();

    const emailData = {
      to: "adsandro.galindo@gmail.com",
      from: "galindoleitept@gmail.com",
      subject: "Partidas do dia",
      text: "Corpo do email",
      attachment: await pdfOutput,
    };

    const api_key =
      "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";
    const sendgrid_api = "https://api.sendgrid.com/v3/mail/send";

    const formData = new FormData();
    formData.append("to", emailData.to);
    formData.append("from", emailData.from);
    formData.append("subject", emailData.subject);
    formData.append("text", emailData.text);
    formData.append("attachment", emailData.attachment, "a4.pdf");

    try {
      const response = await fetch(sendgrid_api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${api_key}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Email enviado com sucesso!");
      } else {
        console.error("Falha ao enviar o email:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.headerHome}>
        <h1>Gabor</h1>
        <p>Armazém</p>
      </div>
      <div className={styles.infoPerson}>
        <h2>Adsandro Galindo</h2>
        <p>16/11/2023</p>
      </div>
      <div className={styles.formContainer}>
        <form ref={form} onSubmit={sendEmailWithAttachment}>
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
            <label>Referência</label>
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

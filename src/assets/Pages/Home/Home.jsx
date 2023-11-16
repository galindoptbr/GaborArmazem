import styles from "./Home.module.css";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import logoGabor from "../../Images/logo-gabor.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsCalendarWeek, BsFilePerson } from "react-icons/bs";

export const Home = () => {
  const location = useLocation();
  const { state } = location;
  const name = state && state.name ? state.name : "Usuário";

  const [selectDate, setSelectDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const opcoesMaterial = [
    "",
    "SOLAS",
    "PALMILHAS Acab",
    "PALMILHAS Mont",
    "TACOES",
    "CUNHAS",
  ];
  const [escolhaMaterial, setEscolhaMaterial] = useState("");

  const opcoesDificuldade = ["", "A", "B", "C"];
  const [escolhaDificuldade, setEscolhaDificuldade] = useState("");

  const [quantidade, setQuantidade] = useState("");
  const [referencia, setReferencia] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const navigate = useNavigate();

  const form = useRef();

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDataChange = (date) => {
    setSelectDate(date);
  };

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

  const handleLogin = () => {
    navigate("/");
  };

  const generatePDF = () => {
    return new Promise((resolve) => {
      const doc = new jsPDF();
      doc.text(`${name}`, 10, 10);
      doc.text(`Dia: ${selectDate.toLocaleDateString()}`, 10, 20);
      doc.text(`Material: ${escolhaMaterial}`, 10, 30);
      doc.text(`Referência: ${referencia}`, 10, 40);
      doc.text(`Dificuldade: ${escolhaDificuldade}`, 10, 50);
      doc.text(`Quantidade: ${quantidade}`, 10, 60);
      doc.text(`Observações: ${observacoes}`, 10, 70);
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
        <img src={logoGabor} alt="logo da gabor" />
      </div>
      <div className={styles.infoPerson}>
        <h2>{name}</h2>
        <p>{selectDate.toLocaleDateString()}</p>
        <div>
          <button
            className={styles.btnShowCalendar}
            onClick={handleShowCalendar}
          >
            <BsCalendarWeek size={15} />
          </button>
          {showCalendar && (
            <Calendar onChange={handleDataChange} value={selectDate} />
          )}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form ref={form} onSubmit={sendEmailWithAttachment}>
          <div className={styles.boxOpcoes}>
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
          </div>
          <div className={styles.observacoes}>
            <p>Outros trabalhos</p>
            <textarea
              placeholder="O que fez além das partidas?"
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
      <div className={styles.footer}>
        <span onClick={handleLogin} className={styles.iconLogin}>
          <BsFilePerson size={25} />
          Login
        </span>
      </div>
    </div>
  );
};

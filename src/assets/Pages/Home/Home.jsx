import styles from "./Home.module.css";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import logoGabor from "../../Images/logo-gabor.png";
import { useLocation, useNavigate } from "react-router-dom";
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
    "TACOES",
    "CAPAS",
    "PLATEAU",
    "Palm. Mont",
    "Palm. Acab",
  ];
  const opcoesDificuldade = ["", "A", "B", "C", "A e B", "A e C", "B e C", "A, B e C"];

  const [escolhaMaterial, setEscolhaMaterial] = useState("");
  const [escolhaDificuldade, setEscolhaDificuldade] = useState("");

  const [referencia, setReferencia] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [total, setTotal] = useState("");
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

  const handleTotalChange = (e) => {
    setTotal(e.target.value);
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
    return new Promise(() => {
      const doc = new jsPDF();
      doc.text(`${name}`, 10, 10);
      doc.text(`Dia: ${selectDate.toLocaleDateString()}`, 10, 20);
      doc.text(`Material: ${escolhaMaterial}`, 10, 30);
      doc.text(`Dificuldade: ${escolhaDificuldade}`, 10, 40);
      doc.text(`Referência: ${referencia}`, 10, 50);
      doc.text(`Quantidade: ${quantidade}`, 10, 60);
      doc.text(`Total: ${total}`, 10, 70);
      doc.text(`Outros trabalhos: ${observacoes}`, 10, 80);

      doc.save(`${name}.pdf`);

      navigate("/");
    });
  };

  const handleSubmit = () => {
    generatePDF();
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
            <BsCalendarWeek size={20} />
          </button>
          {showCalendar && (
            <Calendar onChange={handleDataChange} value={selectDate} />
          )}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form ref={form} onSubmit={handleSubmit}>
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
            <div className={styles.referencia}>
              <label>Referência</label>
              <input
                type="text"
                value={referencia}
                onChange={handleReferenciaChange}
              />
            </div>

            <div className={styles.quantidade}>
              <label>Quantidade</label>
              <input
                type="text"
                value={quantidade}
                onChange={handleQuantidadeChange}
              />
            </div>
            <div className={styles.total}>
              <label>Total</label>
              <input type="text" value={total} onChange={handleTotalChange} />
            </div>
          </div>
          <div className={styles.observacoes}>
            <p>Outros trabalhos</p>
            <textarea
              placeholder="O que fez além das partidas?"
              cols="30"
              rows="5"
              value={observacoes}
              onChange={handleObservacoesChange}
            ></textarea>
          </div>
          <button type="submit" className={styles.btn}>
            Gerar PDF
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

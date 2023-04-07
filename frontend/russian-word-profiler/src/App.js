import { useState } from "react";
import axios from "axios";
import background from "./assets/background.png";
import MainEditor from "./components/MainEditor";

//const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";
const TEXT =
  "Администрация президента США Джо Байдена обеспокоена возможным обсуждением высокопоставленными российскими военными использования ядерного оружия в войне с Украиной. Военное руководство в Москве недавно вело дискуссии на эту тему. Об этом пишет газета New York Times со ссылкой на неназванных американских чиновников.\n\nПо данным издания, президент России Владимир Путин не был частью этих обсуждений. Он единственный, кто может принять решение об использовании такого оружия, вне зависимости от мнения генералов. Но сам факт таких дискуссий вызывает опасения Белого дома. Там считают, что обсуждение вызвано фрустрацией российских военных от неудач в войне с Украиной.\n\nЗападные страны считают, что Кремль с февраля регулярно намекает на возможность использования ядерного оружия. В выступлении 27 октября Путин заявил, что Москва никогда не говорила, что готова сделать это. За день до этого сотрудничающий с российским правительством Института мировой экономики и международных отношений РАН выпустил доклад, в котором утверждалось, что Запад неправильно трактует высказывания российских официальных лиц.\n\nАнонимные источники газеты Washington Post в администрации Байдена говорят, что американские чиновники не успокоены словами Путина. Там считают, что риск применения ядерного оружия повысится, когда Москва исчерпает свои силы и конвенциональное оружие в Украине.";

function App() {
  const [input, setInput] = useState(TEXT);
  const [wordData, setWordData] = useState([]);

  const submitHandler = async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost/scantext/`,
      data: { text: input },
    });
    if (response.status === 200) {
      console.log(response.data);
      setWordData(response.data);
    } else {
      console.error(`ERROR CODE: ${response.status} - ${response.statusText}`);
    }
  };

  return (
    <div className="page-wrapper">
      <h1 className="title">Russian Word Profiler</h1>
      <section className="input-section">
        <h2>TEXT TO PROFILE:</h2>
        <MainEditor text={input} setText={setInput} wordData={wordData} placeholder="Place text here!" />
        <button onClick={submitHandler}>Profile Text</button>
      </section>
      <section className="bottom-panel">
        <section className="data-panel">
          <h2>DATA AGREGATION</h2>
          <div className="card"></div>
        </section>
      </section>
      {/* This is a background splash image */}
      <div className="image-container">
        <img src={background} alt="background splash" className="image" />
      </div>
    </div>
  );
}

export default App;

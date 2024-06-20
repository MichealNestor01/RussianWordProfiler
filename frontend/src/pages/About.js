const About = () => {
  return (
    <section className="about-page">
      <h1>About</h1>
      <p>
        This is an open source tool created by{" "}
        <a href="https://michealnestor.com" target="_blank" rel="noreferrer">
          Micheal Nestor
        </a>{" "}
        and{" "}
        <a href="https://benthirkill.com" target="_blank" rel="noreferrer">
          Ben Thirkill
        </a>{" "}
        while studying Computer Science at the{" "}
        <a href="https://www.leeds.ac.uk/" target="_blank" rel="noreferrer">
          University of Leeds
        </a>
        . It is a joint project created in collaboration with the{" "}
        <a
          href={"https://ahc.leeds.ac.uk/russian"}
          target="_blank"
          rel="noreferrer"
        >
          Russian and Slavonic Studies
        </a>{" "}
        department which was supervised and inspired by{" "}
        <a
          href="https://leeds.academia.edu/PavelGudoshnikov"
          target="_blank"
          rel="noreferrer"
        >
          Dr Pavel Gudoshnikov
        </a>
        . The goal of the Russian Word Profiler is to emulate the feature set of
        Laurence Anthony's{" "}
        <a
          href="https://www.laurenceanthony.net/software/antwordprofiler/"
          target="_blank"
          rel="noreferrer"
        >
          AntWordProfiler
        </a>{" "}
        through a web interface for the Russian language.
      </p>
      <br />
      <h1>Acknowledgements</h1>
      <ul>
        <li>
          <p>
            Lemma frequencies ranks are taken from{" "}
            <a
              href="http://dict.ruslang.ru/freq.php"
              target="_blank"
              rel="noreferrer"
            >
              Sharov's and Lyashevskaya's Russian Frequency Dictionary
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            Synonyms generation is{" "}
            <a
              href="https://tech.yandex.com/dictionary/"
              target="_blank"
              rel="noreferrer"
            >
              Powered by Yandex.Dictionary
            </a>
            .
          </p>
        </li>
      </ul>
      <br />
      <h1>Contribute</h1>
      <p>
        Have something to add or thoughts on the project? Please contact{" "}
        <a href="https://michealnestor.com" target="_blank" rel="noreferrer">
          Micheal Nestor
        </a>{" "}
        or contribute to the project directly{" "}
        <a
          href="https://github.com/MichealNestor01/RussianWordProfiler"
          target="_blank"
          rel="noreferrer"
        >
          through GitHub
        </a>
        .
      </p>
    </section>
  );
};

export default About;

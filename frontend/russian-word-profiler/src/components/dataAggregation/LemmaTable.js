import { useSelector } from "react-redux";

const LemmaTable = () => {
  const bands = useSelector((state) => state.stats.bands);
  return <div className="lemmaTable card">Hello World</div>;
};

export default LemmaTable;

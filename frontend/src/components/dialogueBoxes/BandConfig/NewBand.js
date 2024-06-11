import { PlusIcon } from "@heroicons/react/24/solid";

const NewBand = () => {

  return (
    <div className="band bandDisabled">
      <div className="bandColor disabled" style={{backgroundColor: "#afafaf"}}></div>
      <input disabled={true} className="bandInput disabled"></input>
      <p className="bandTo disabled">TO</p>
      <input disabled={true} className="bandInput disabled"></input>
      <button className="bandAdd" viewBox="0 0 24 24">
        <PlusIcon className="bandIcon" /> Add Band
      </button>
    </div>
  )
}

export default NewBand;


import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addBand } from "../../../store/slices/frequencyBandsSlice";

/**
 * @description
 * Component for adding a new band.
 *
 * ### Redux Store Interaction
 * The component dispatches the following Redux actions:
 * - `addBand`: Action to add a new band.
 *
 * @component
 *
 * @example
 * return (
 *   <NewBand />
 * )
 */
const NewBand = () => {
  const dispatch = useDispatch();

  return (
    <div className="band bandDisabled">
      <div
        className="bandColor disabled"
        style={{ backgroundColor: "#afafaf" }}
      ></div>
      <input disabled={true} className="bandInput disabled"></input>
      <p className="bandTo disabled">TO</p>
      <input disabled={true} className="bandInput disabled"></input>
      <button
        className="bandAdd"
        onClick={(e) => {
          dispatch(addBand());
        }}
        viewBox="0 0 24 24"
      >
        <PlusIcon className="bandIcon" /> Add Band
      </button>
    </div>
  );
};

export default NewBand;

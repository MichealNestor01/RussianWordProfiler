import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Band from "./Band";
import NewBand from "./NewBand";
import DialogBox from "../DialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  SwatchIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/solid";

// const BandConfigPanel = () => {
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const dispatch = useDispatch();
//   const bands = useSelector((state) => state.bands);

//   const createBandInputDivs = () => {
//     return bands.map((band, index) => {
//       const top = index === 0;
//       return (
//         <div className="bandInput" key={`bandInput-${index}`}>
//           <Band
//             id={band.id}
//             startColour={band.colour}
//             activeIndex={activeIndex}
//             setActiveIndex={setActiveIndex}
//           />
//           {top ? (
//             <div className="gridItem">
//               Top
//               <input
//                 type="number"
//                 min="0"
//                 max="60000"
//                 value={bands[index].top}
//                 onChange={(e) => {
//                   dispatch(changeTopValue({ target: index, top: e.target.value }));
//                 }}
//               />
//             </div>
//           ) : (
//             <div className="gridItem">
//               <input
//                 type="number"
//                 min="0"
//                 max="60000"
//                 value={parseInt(bands[index - 1].top) + 1}
//                 onChange={(e) => {
//                   dispatch(changeTopValue({ target: index - 1, top: e.target.value }));
//                 }}
//               />
//               to
//               <input
//                 type="number"
//                 min={parseInt(bands[index - 1].top) + 1}
//                 max="60000"
//                 value={bands[index].top}
//                 onChange={(e) => {
//                   dispatch(changeTopValue({ target: index, top: e.target.value }));
//                 }}
//               />
//             </div>
//           )}
//           <h2
//             className="removeButton"
//             onClick={() => {
//               dispatch(removeBand(index));
//             }}
//           >
//             x
//           </h2>
//         </div>
//       );
//     });
//   };

//   const panelHeight = 31 * bands.length;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: "0%", x: "350px" }}
//       animate={{ opacity: 1, y: "-60px", x: "350px" }}
//       exit={{ opacity: 0, y: "0%", x: "350px" }}
//       transition={{ duration: 0.2 }}
//       style={{ height: `${panelHeight + 160}px` }}
//       className="panel card"
//     >
//       <div className="top">
//         <h2>Band Configuration</h2>
//         <div
//           className="closeButton"
//           onClick={() => {
//             dispatch(closeActiveDialogue());
//             setActiveIndex(-1);
//           }}
//         >
//           x
//         </div>
//       </div>
//       <div className="bandsForm">
//         Bands:
//         {createBandInputDivs()}
//         <div
//           onClick={() => {
//             dispatch(addBand());
//           }}
//         >
//           Add Band +
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// Wrap the band config panel in a dialog box.
// We add an onclose that saves the configuration when closing the dialog box.
const BandConfigPanel = ({ active, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);

  return (
    <DialogBox
      header={<h1>Band Configuration</h1>}
      active={active}
      onClose={onClose}
      content={
        <Fragment>
          {Object.keys(bands).map((band) => {
            return (
              <Band
                key={band}
                id={band}
                colour={bands[band].colour}
                top={bands[band].topVal}
                bottom={bands[band].bottomVal}
              />
            );
          })}

          <NewBand />

          <div className="orDivider">
            <div className="divider"></div>
            <p>OR</p>
            <div className="divider"></div>
          </div>

          <div className="bandConfigOptions">
            <button>
              <SwatchIcon className="configIcon" />
              Use Ready-Made Presets
            </button>
            <button>
              <CloudArrowDownIcon className="configIcon" />
              Save current preset to local file
            </button>
            <button>
              <CloudArrowUpIcon className="configIcon" />
              Load a preset from a local file
            </button>
          </div>
        </Fragment>
      }
    />
  );
};
// return (
//   <motion.div
//     initial={{ opacity: 0, y: "0%", x: "350px" }}
//     animate={{ opacity: 1, y: "-60px", x: "350px" }}
//     exit={{ opacity: 0, y: "0%", x: "350px" }}
//     transition={{ duration: 0.2 }}
//     style={{ height: `${panelHeight + 160}px` }}
//     className="panel card"
//   >
//     <div className="top">
//       <h2>Band Configuration</h2>
//       <div
//         className="closeButton"
//         onClick={() => {
//           dispatch(closeActiveDialogue());
//           setActiveIndex(-1);
//         }}
//       >
//         x
//       </div>
//     </div>
//     <div className="bandsForm">
//         Add Band +
//     </div>
//   </motion.div>
// );

export default BandConfigPanel;

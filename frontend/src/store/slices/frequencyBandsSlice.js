import { createSlice } from "@reduxjs/toolkit";

// by default have 11 colours selected for readability
const colours = [
    "#e6194b",
    "#f58231",
    "#D7BF17",
    "#98C41D",
    "#3cb44b",
    "#42d4f4",
    "#4363d8",
    "#911eb4",
    "#f032e6",
    "#fabebe",
    "#aa6e28",
];

// const initialState = [];
const initialState = [];
for (let i = 0; i < 10; i++) {
    // initialState.push({
    //   id: i,
    //   top: 1000 * (i + 1),
    //   bottom: 1000 * i + 1,
    //   colour: colours[i],
    // });
    initialState[i] = {
        next: i + 1,
        prev: i - 1,
        bottomVal: 1000 * i + 1,
        topVal: 1000 * (i + 1),
        colour: colours[i],
        active: true,
    };
}

// initialState.push({
//   id: 10,
//   top: 52047,
//   bottom: 1000 * (10) + 1,
//   colour: colours[10],

// });
initialState[10] = {
    prev: 9,
    next: -1,
    bottomVal: 10001,
    topVal: 52047,
    colour: colours[10],
    active: true,
};

const storedState = localStorage.getItem("russianWordProfilerBandsV2")
    ? JSON.parse(localStorage.getItem("russianWordProfilerBandsV2"))
    : initialState;

export const frequencyBandsSlice = createSlice({
    name: "bands",
    initialState: storedState,
    reducers: {
        changeColour: (state, action) => {
            // state.forEach((band) => {
            //   if (band.id === action.payload.target) {
            //     band.colour = action.payload.colour;
            //   }
            // });
            state[action.payload.target].colour = action.payload.colour;
        },

        changeTopVal: (state, action) => {
            const { target, newVal } = action.payload;
            const next = state[target].next;

            // update the current target's top val
            state[target].topVal = parseInt(newVal);

            // update the bottom value of the "next" item
            if (next !== -1) {
                state[next].bottomVal = parseInt(newVal) + 1;
            }

            // for (let i = 0; i < state.length; i++) {
            //   let band = state[i];
            //   if (band.id == action.payload.target) {

            //     band.top = parseInt(action.payload.top);

            //     if (i + 1 < state.length) {
            //       state[i+1].bottom = band.top + 1;
            //     }
            //   }
            // }
        },

        changeBottomVal: (state, action) => {
            const { target, newVal } = action.payload;
            const prev = state[target].prev;

            // update the current target's bottom val
            state[target].bottomVal = parseInt(newVal);

            // update the top value of the "prev" item
            if (prev !== -1) {
                state[prev].topVal = parseInt(newVal) - 1;
            }
        },

        // changeBottomValue: (state, action) => {
        //   for (let i = 0; i < state.length; i++) {
        //     let band = state[i];
        //     if (band.id == action.payload.target) {

        //       band.bottom = parseInt(action.payload.bottom);

        //       if (i - 1 >= 0) {
        //         state[i-1].top = band.bottom - 1 ;
        //       }
        //     }
        //   }
        // },

        removeBand: (state, action) => {
            if (!state.hasKey(action.payload)) {
              return state;
            }

            const bandToRemove = state[action.payload];

            // update bands either side of the band to remove
            if (bandToRemove.prev !== -1) {
                // prev band does exist
                // make the prev point to the band to delete's next and take the band to delete's top
                const prevBand = state[bandToRemove.prev];
                prevBand.next = bandToRemove.next;
                prevBand.top = bandToRemove.top;

                // if next exists, repoint its prev to the band to delete's prev
                if (bandToRemove.next !== -1) {
                    state[bandToRemove.next].prev = bandToRemove.prev;
                }
            } else if (bandToRemove.next !== -1) {
                // prev band does not exist, but next does
                const nextBand = state[bandToRemove.next];
                // make the next band take all the values of the current band
                nextBand.bottomVal = bandToRemove.bottomVal;
                nextBand.prev = -1;
            }

            // remove the band
            delete state[action.payload];

            // state.splice(action.payload, 1);
            // //state.remove(action.payload.target);
            // for (let id = action.payload; id < state.length; id++) {
            //   console.log(state[id].colour);
            //   state[id].id = id;
            // }

            // if (action.payload === state.length) {
            //   state[state.length - 1].top = 60000;
            // }
        },

        toggleActive: (state, action) => {
          state[action.payload].active = !state[action.payload].active;
        },

        addBand: (state) => {
            // the maximum id already in state will be the "prev" of the new band
            let maxId = -1
            if (Object.keys(state).length > 0) {
              maxId = Math.max(Object.keys(state));  
            }

            if (maxId !== -1) {
              state[maxId + 1] = { prev: maxId, next: -1, bottomVal: state[maxId].top + 1, topVal: state[maxId].top + 2, colour: colours[maxId < 10 ? maxId : 10], active: true };
            } else { // no bands defined yet
              state[0] = {prev: -1, next: -1, bottomVal: 1, topVal: 52047, colour: colours[0], active: true};
            }
        },
        


        saveBands: (state) => {
            localStorage.setItem(
                "russianWordProfilerBandsV2",
                JSON.stringify(state)
            );
        },

        setDefaultBands: (state) => {
            // state.length = 0;
            // initialState.forEach((band) => {
            //     state.push(band);
            // });
            state = {...initialState}
            localStorage.setItem(
                "russianWordProfilerBandsV2",
                JSON.stringify(state)
            );
        },
    },
});

export const {
    changeColour,
    changeTopVal,
    changeBottomVal,
    removeBand,
    addBand,
    saveBands,
    setDefaultBands,
    toggleActive,
} = frequencyBandsSlice.actions;

export default frequencyBandsSlice.reducer;

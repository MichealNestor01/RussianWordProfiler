# Russian Word Profiler - react frontend

> react frontend

## Table of Contents

<!-- toc -->

  * [Install](#install)
- [Documentation](#documentation)
    + [Table of Contents](#table-of-contents)
  * [root](#root)
    + [Examples](#examples)
  * [App](#app)
    + [Initialization](#initialization)
    + [Examples](#examples-1)
  * [MainEditor](#maineditor)
    + [Redux Store Interaction](#redux-store-interaction)
    + [Parameters](#parameters)
    + [Examples](#examples-2)
  * [BandsBar](#bandsbar)
    + [Redux Store Interaction](#redux-store-interaction-1)
    + [API Interaction](#api-interaction)
    + [Examples](#examples-3)
  * [BandConfigPanel](#bandconfigpanel)
    + [Redux Store Interaction](#redux-store-interaction-2)
    + [Parameters](#parameters-1)
    + [Examples](#examples-4)
  * [scaleAnimation](#scaleanimation)
    + [Examples](#examples-5)
  * [scaleAnimation](#scaleanimation-1)
    + [Properties](#properties)
  * [fadeAnimation](#fadeanimation)
    + [Properties](#properties-1)
  * [Band](#band)
    + [Redux Store Interaction](#redux-store-interaction-3)
    + [Parameters](#parameters-2)
    + [Examples](#examples-6)
  * [BandColour](#bandcolour)
    + [Redux Store Interaction](#redux-store-interaction-4)
    + [Dependencies](#dependencies)
    + [Parameters](#parameters-3)
    + [Examples](#examples-7)
  * [NewBand](#newband)
    + [Redux Store Interaction](#redux-store-interaction-5)
    + [Examples](#examples-8)
  * [DialogBox](#dialogbox)
    + [Parameters](#parameters-4)
    + [Examples](#examples-9)
  * [ApiSettings](#apisettings)
    + [Parameters](#parameters-5)
    + [Examples](#examples-10)
  * [FileUpload](#fileupload)
    + [Redux Store Interaction](#redux-store-interaction-6)
    + [Examples](#examples-11)
  * [FormattedOutput](#formattedoutput)
    + [Redux Store Interaction](#redux-store-interaction-7)
    + [Examples](#examples-12)
  * [whichBand](#whichband)
    + [Parameters](#parameters-6)
    + [Examples](#examples-13)
  * [SynonymReplacer](#synonymreplacer)
    + [Redux Store Interaction](#redux-store-interaction-8)
    + [Parameters](#parameters-7)
    + [Examples](#examples-14)
  * [DistributionDisplay](#distributiondisplay)
    + [Redux Store Interaction](#redux-store-interaction-9)
    + [Examples](#examples-15)
  * [DistributionDisplay](#distributiondisplay-1)
    + [Redux Store Interaction](#redux-store-interaction-10)
    + [Examples](#examples-16)
  * [DownloadDistributionData](#downloaddistributiondata)
    + [Examples](#examples-17)
  * [DownloadButton](#downloadbutton)
    + [Parameters](#parameters-8)
    + [Examples](#examples-18)
  * [convertToCSV](#converttocsv)
    + [Parameters](#parameters-9)
    + [Examples](#examples-19)
  * [downloadCSV](#downloadcsv)
    + [Parameters](#parameters-10)
    + [Examples](#examples-20)
  * [downloadXLS](#downloadxls)
    + [Dependencies](#dependencies-1)
    + [Parameters](#parameters-11)
    + [Examples](#examples-21)
  * [BandBar](#bandbar)
    + [Parameters](#parameters-12)
    + [Examples](#examples-22)
  * [DownloadCoverageData](#downloadcoveragedata)
    + [Examples](#examples-23)
  * [LemmaTable](#lemmatable)
    + [Redux Store Interaction](#redux-store-interaction-11)
    + [Examples](#examples-24)
  * [DownloadTableData](#downloadtabledata)
    + [Examples](#examples-25)
  * [store](#store)
    + [Examples](#examples-26)
  * [setWordData](#setworddata)
    + [Parameters](#parameters-13)
  * [setText](#settext)
    + [Parameters](#parameters-14)
  * [setStopWords](#setstopwords)
    + [Parameters](#parameters-15)
  * [changeWord](#changeword)
    + [Parameters](#parameters-16)
  * [textSlice](#textslice)
    + [Initial State](#initial-state)
    + [Examples](#examples-27)
  * [splitText](#splittext)
    + [Parameters](#parameters-17)
    + [Examples](#examples-28)
  * [changeColour](#changecolour)
    + [Parameters](#parameters-18)
  * [changeTopVal](#changetopval)
    + [Parameters](#parameters-19)
  * [changeBottomVal](#changebottomval)
    + [Parameters](#parameters-20)
  * [removeBand](#removeband)
    + [Parameters](#parameters-21)
  * [toggleActive](#toggleactive)
    + [Parameters](#parameters-22)
  * [addBand](#addband)
    + [Parameters](#parameters-23)
  * [saveBands](#savebands)
    + [Parameters](#parameters-24)
  * [frequencyBandsSlice](#frequencybandsslice)
    + [Initial State](#initial-state-1)
    + [Examples](#examples-29)
  * [reset](#reset)
    + [Parameters](#parameters-25)
  * [setBandFrequencyDict](#setbandfrequencydict)
    + [Parameters](#parameters-26)
  * [setTableData](#settabledata)
    + [Parameters](#parameters-27)
  * [setCoverageData](#setcoveragedata)
    + [Parameters](#parameters-28)
  * [setDistributionData](#setdistributiondata)
    + [Parameters](#parameters-29)
  * [setLemmaFrequencyDict](#setlemmafrequencydict)
    + [Parameters](#parameters-30)
  * [setNotInList](#setnotinlist)
    + [Parameters](#parameters-31)
  * [statsSlice](#statsslice)
    + [Initial State](#initial-state-2)
    + [Examples](#examples-30)

<!-- tocstop -->

## Install

Installation instructions here

# Documentation

<!-- api -->
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [root][1]
    *   [Examples][2]
*   [App][3]
    *   [Initialization][4]
    *   [Examples][5]
*   [MainEditor][6]
    *   [Redux Store Interaction][7]
    *   [Parameters][8]
    *   [Examples][9]
*   [BandsBar][10]
    *   [Redux Store Interaction][11]
    *   [API Interaction][12]
    *   [Examples][13]
*   [BandConfigPanel][14]
    *   [Redux Store Interaction][15]
    *   [Parameters][16]
    *   [Examples][17]
*   [scaleAnimation][18]
    *   [Examples][19]
*   [scaleAnimation][20]
    *   [Properties][21]
*   [fadeAnimation][22]
    *   [Properties][23]
*   [Band][24]
    *   [Redux Store Interaction][25]
    *   [Parameters][26]
    *   [Examples][27]
*   [BandColour][28]
    *   [Redux Store Interaction][29]
    *   [Dependencies][30]
    *   [Parameters][31]
    *   [Examples][32]
*   [NewBand][33]
    *   [Redux Store Interaction][34]
    *   [Examples][35]
*   [DialogBox][36]
    *   [Parameters][37]
    *   [Examples][38]
*   [ApiSettings][39]
    *   [Parameters][40]
    *   [Examples][41]
*   [FileUpload][42]
    *   [Redux Store Interaction][43]
    *   [Examples][44]
*   [FormattedOutput][45]
    *   [Redux Store Interaction][46]
    *   [Examples][47]
*   [whichBand][48]
    *   [Parameters][49]
    *   [Examples][50]
*   [SynonymReplacer][51]
    *   [Redux Store Interaction][52]
    *   [Parameters][53]
    *   [Examples][54]
*   [DistributionDisplay][55]
    *   [Redux Store Interaction][56]
    *   [Examples][57]
*   [DistributionDisplay][58]
    *   [Redux Store Interaction][59]
    *   [Examples][60]
*   [DownloadDistributionData][61]
    *   [Examples][62]
*   [DownloadButton][63]
    *   [Parameters][64]
    *   [Examples][65]
*   [convertToCSV][66]
    *   [Parameters][67]
    *   [Examples][68]
*   [downloadCSV][69]
    *   [Parameters][70]
    *   [Examples][71]
*   [downloadXLS][72]
    *   [Dependencies][73]
    *   [Parameters][74]
    *   [Examples][75]
*   [BandBar][76]
    *   [Parameters][77]
    *   [Examples][78]
*   [DownloadCoverageData][79]
    *   [Examples][80]
*   [LemmaTable][81]
    *   [Redux Store Interaction][82]
    *   [Examples][83]
*   [DownloadTableData][84]
    *   [Examples][85]
*   [store][86]
    *   [Examples][87]
*   [setWordData][88]
    *   [Parameters][89]
*   [setText][90]
    *   [Parameters][91]
*   [setStopWords][92]
    *   [Parameters][93]
*   [changeWord][94]
    *   [Parameters][95]
*   [textSlice][96]
    *   [Initial State][97]
    *   [Examples][98]
*   [splitText][99]
    *   [Parameters][100]
    *   [Examples][101]
*   [changeColour][102]
    *   [Parameters][103]
*   [changeTopVal][104]
    *   [Parameters][105]
*   [changeBottomVal][106]
    *   [Parameters][107]
*   [removeBand][108]
    *   [Parameters][109]
*   [toggleActive][110]
    *   [Parameters][111]
*   [addBand][112]
    *   [Parameters][113]
*   [saveBands][114]
    *   [Parameters][115]
*   [frequencyBandsSlice][116]
    *   [Initial State][117]
    *   [Examples][118]
*   [reset][119]
    *   [Parameters][120]
*   [setBandFrequencyDict][121]
    *   [Parameters][122]
*   [setTableData][123]
    *   [Parameters][124]
*   [setCoverageData][125]
    *   [Parameters][126]
*   [setDistributionData][127]
    *   [Parameters][128]
*   [setLemmaFrequencyDict][129]
    *   [Parameters][130]
*   [setNotInList][131]
    *   [Parameters][132]
*   [statsSlice][133]
    *   [Initial State][134]
    *   [Examples][135]

## root

Entry point for the React application.

### Examples

```javascript
// This file typically renders the main App component into the root DOM element.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## App

Main application component for the Russian Word Profiler.

### Initialization

On the initial load, the application displays an alert informing users about the project's new status and requesting bug reports.

### Examples

```javascript
return (
  <App />
)
```

## MainEditor

Main editor component for text input and analysis in the Russian Word Profiler.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `textSlice.text`: The current text input by the user.

The component dispatches the following Redux actions:

*   `setText`: Action to update the text input in the Redux store.

### Parameters

*   `props` **[Object][136]** The props for MainEditor.

    *   `props.placeholder` **[string][137]** The placeholder text for the text input area. (optional, default `"Text Here."`)

### Examples

```javascript
return (
  <MainEditor placeholder="Enter your text here." />
)
```

## BandsBar

Component for displaying and configuring the bands bar, which includes options for configuring bands and API settings, as well as profiling the text.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `bandsSlice.bands`: An array of band objects.
*   `text.words`: The words to be profiled.
*   `text.stopWords`: The stop words to be excluded from profiling.

The component dispatches the following Redux actions:

*   `setWordData`: Action to set the word data based on the profiling response.
*   `toggleActive`: Action to toggle the active state of a band.

### API Interaction

The component interacts with the API as follows:

*   `submitHandler`: Sends a POST request to the `/scantext/` endpoint with the text and optional stop words.
    *   If the response status is 200, it dispatches `setWordData` with the received data.
    *   If the response status is not 200, it logs an error message.

### Examples

```javascript
return (
  <BandsBar />
)
```

## BandConfigPanel

Component for configuring bands in a panel, wrapped in a dialog box. The configuration is saved when the dialog box is closed.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `bandsSlice.bands`: An array of band objects.

The component dispatches the following Redux actions:

*   `saveBands`: Action to save the current band configuration.

### Parameters

*   `props` **[Object][136]** The props for BandConfigPanel.

    *   `props.active` **[boolean][138]** Whether the dialog box is active.
    *   `props.onClose` **[Function][139]** Function to close the dialog box.

### Examples

```javascript
return (
  <BandConfigPanel active={true} onClose={() => {}} />
)
```

## scaleAnimation

Contains default animation configurations for the application using Framer Motion.

### Examples

```javascript
import { scaleAnimation, fadeAnimation } from './animations';

// Use in a Framer Motion component
<motion.div {...scaleAnimation}>Content</motion.div>
<motion.div {...fadeAnimation}>Content</motion.div>
```

## scaleAnimation

Animation configuration for scaling elements with opacity transition.

### Properties

*   `initial` **[Object][136]** Initial state of the animation.

    *   `initial.opacity` **[Object][136]** Initial opacity value.
    *   `initial.scale` **[Object][136]** Initial scale value.
*   `animate` **[Object][136]** Animation state.

    *   `animate.opacity` **[Object][136]** Final opacity value.
    *   `animate.scale` **[Object][136]** Final scale value.
*   `exit` **[Object][136]** Exit state of the animation.

    *   `exit.opacity` **[Object][136]** Exit opacity value.
    *   `exit.scale` **[Object][136]** Exit scale value.
*   `transition` **[Object][136]** Transition configuration.

    *   `transition.duration` **[number][140]** Duration of the transition in seconds.

## fadeAnimation

Animation configuration for fading elements.

### Properties

*   `initial` **[Object][136]** Initial state of the animation.

    *   `initial.opacity` **[Object][136]** Initial opacity value.
*   `animate` **[Object][136]** Animation state.

    *   `animate.opacity` **[Object][136]** Final opacity value.
*   `exit` **[Object][136]** Exit state of the animation.

    *   `exit.opacity` **[Object][136]** Exit opacity value.
*   `transition` **[Object][136]** Transition configuration.

    *   `transition.duration` **[number][140]** Duration of the transition in seconds.

## Band

Component for configuring a single band.

### Redux Store Interaction

The component dispatches the following Redux actions:

*   `changeBottomVal`: Action to change the bottom value of a band.
*   `changeTopVal`: Action to change the top value of a band.
*   `removeBand`: Action to remove a band.

### Parameters

*   `props` **[Object][136]** The props for Band.

    *   `props.id` **[number][140]** The ID of the band.
    *   `props.colour` **[string][137]** The color of the band.
    *   `props.top` **[number][140]** The top value of the band.
    *   `props.bottom` **[number][140]** The bottom value of the band.
    *   `props.activeIndex` **[number][140]** The index of the active band.
    *   `props.setActiveIndex` **[Function][139]** Function to set the active band index.

### Examples

```javascript
const band = { id: 1, colour: 'red', top: 1000, bottom: 1 };
return (
  <Band
    id={band.id}
    colour={band.colour}
    top={band.top}
    bottom={band.bottom}
    activeIndex={0}
    setActiveIndex={() => {}}
  />
)
```

## BandColour

Component for selecting a band color.

### Redux Store Interaction

The component dispatches the following Redux actions:

*   `changeColour`: Action to change the color of a band.

### Dependencies

This component depends on the `ChromePicker` component from the `react-color` library to provide a color picker interface.

### Parameters

*   `props` **[Object][136]** The props for BandColour.

    *   `props.id` **[number][140]** The ID of the band.
    *   `props.colour` **[string][137]** The current color of the band.
    *   `props.activeIndex` **[number][140]** The index of the active band.
    *   `props.setActiveIndex` **[Function][139]** Function to set the active band index.

### Examples

```javascript
return (
  <BandColour id={1} colour="red" activeIndex={0} setActiveIndex={() => {}} />
)
```

## NewBand

Component for adding a new band.

### Redux Store Interaction

The component dispatches the following Redux actions:

*   `addBand`: Action to add a new band.

### Examples

```javascript
return (
  <NewBand />
)
```

## DialogBox

Generic dialog box component.

### Parameters

*   `props` **[Object][136]** The props for DialogBox.

    *   `props.header` **JSX.Element** The header content of the dialog box.
    *   `props.content` **JSX.Element** The main content of the dialog box.
    *   `props.active` **[boolean][138]** Whether the dialog box is active.
    *   `props.onClose` **[Function][139]** Function to close the dialog box.

### Examples

```javascript
[showDialog, setShowDialog] = useState(false)

return (
  <DialogBox
    active={showDialog}
    onClose={() => setShowDialog(false)}
    header={<h1>Header</h1>}
    content={<p>Content</p>}
  />
)
```

## ApiSettings

Component for API settings dialog.

### Parameters

*   `$0` **[Object][136]**&#x20;

    *   `$0.active` &#x20;
    *   `$0.onClose` &#x20;

### Examples

```javascript
return (
  <ApiSettings />
)
```

## FileUpload

Component for uploading a file to set stop words in the Redux store.

### Redux Store Interaction

The component dispatches the following Redux actions:

*   `setStopWords`: Action to set the stop words in the Redux store.

### Examples

```javascript
return (
  <FileUpload />
)
```

## FormattedOutput

Component for displaying the formatted output of the analyzed text in the Russian Word Profiler.
It highlights words based on their frequency band and allows synonym replacement.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `bandsSlice.bands`: An array of band objects used to determine the color and activity status of words.
*   `text.tokens`: The tokens from the input text.
*   `text.wordData`: The data associated with each word, including synonyms.

The component dispatches the following Redux actions:

*   `reset`: Action to reset the stats slice.
*   `setLemmaFrequencyDict`: Action to set the frequency dictionary for lemmas.
*   `setBandFrequencyDict`: Action to set the frequency dictionary for bands.

### Examples

```javascript
return (
  <FormattedOutput />
)
```

## whichBand

Determines the band for a given rank based on predefined bands.

### Parameters

*   `rank` **[number][140]** The rank to be evaluated.
*   `bands` **[Object][136]** An object containing band information. Each key is a band identifier, and each value is an object with `topVal` and `bottomVal` properties.

### Examples

```javascript
const bands = {
  "A": { topVal: 100, bottomVal: 90 },
  "B": { topVal: 89, bottomVal: 80 },
  "C": { topVal: 79, bottomVal: 70 }
};
const band = whichBand(85, bands);
console.log(band); // Output: "B"
```

Returns **([string][137] | [number][140])** The band identifier the rank falls into, or -1 if the rank does not fall into any band.

## SynonymReplacer

Dialog box component used to replace a selected word with one of its synonyms.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `bandsSlice.bands`: An array of band objects used here to determine the colour of synonyms based on their rank.

The component dispatches the following Redux actions:

*   `changeWord`: Action to update the selected word in the Redux store.

### Parameters

*   `props` **[Object][136]** The props for SynonymReplacer.

    *   `props.active` **[boolean][138]** Whether the dialog box is active.
    *   `props.onClose` **[Function][139]** Function to close the dialog box.
    *   `props.selectedWord` **[Object][136]** The currently selected word and its details.

        *   `props.selectedWord.index` **[number][140]** The index of the selected word.
        *   `props.selectedWord.word` **[string][137]** The selected word.
        *   `props.selectedWord.colour` **[string][137]** The colour of the selected word.
        *   `props.selectedWord.synonyms` **[Array][141]** The list of synonyms for the selected word.

### Examples

```javascript
const selectedWord = {
  index: 1,
  word: 'example',
  colour: 'blue',
  synonyms: [
    { synonym: 'sample', rank: 1, lemma: 'sample' },
    { synonym: 'instance', rank: 2, lemma: 'instance' },
  ]
};
return (
  <SynonymReplacer active={true} onClose={() => {}} selectedWord={selectedWord} />
)
```

## DistributionDisplay

Component for displaying distribution data.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `statsSlice.bandFrequencyDict`: Frequency dictionary for bands.

The component dispatches the following Redux actions:

*   `setDistributionData`: Action to set the distribution data. Used so this data can be downloaded

### Examples

```javascript
return (
  <DistributionDisplay />
)
```

## DistributionDisplay

Component for displaying coverage data.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `statsSlice.bandFrequencyDict`: Frequency dictionary for bands.

The component dispatches the following Redux actions:

*   `setCoverageData`: Action to set the coverage data. Used so this data can be downloaded.

### Examples

```javascript
return (
  <CoverageDisplay />
)
```

## DownloadDistributionData

Component for downloading distribution data.

### Examples

```javascript
return (
  <DownloadDistributionData />
)
```

## DownloadButton

Component for a download button that triggers downloading of data in XLS format.

### Parameters

*   `props` **[Object][136]** The props for DownloadButton.

    *   `props.data` **[Array][141]** The data to be downloaded.
    *   `props.filename` **[string][137]** The base filename for the downloaded file.
    *   `props.text` **[string][137]** The text displayed on the download button.

### Examples

```javascript
const data = [{ name: "John", age: 30 }, { name: "Jane", age: 25 }];
return (
  <DownloadButton data={data} filename="data" text="Download Data" />
)
```

## convertToCSV

Converts a 2D array of JavaScript objects to a CSV string.

### Parameters

*   `arr` **[Array][141]<[Array][141]<([string][137] | [number][140])>>** The 2D array of data to be converted to CSV format.

### Examples

```javascript
const data = [
  ["name", "age"],
  ["John", 30],
  ["Jane", 25]
];
const csv = convertToCSV(data);
console.log(csv);
// Output:
// name,age
// John,30
// Jane,25
```

Returns **[string][137]** The CSV formatted string.

## downloadCSV

Triggers a download of a CSV file with the given content and filename.

### Parameters

*   `csv` **[string][137]** The CSV string to be downloaded.
*   `filename` **[string][137]** The name of the file to be downloaded.

### Examples

```javascript
const csv = "name,age\nJohn,30\nJane,25";
downloadCSV(csv, "data.csv");
```

## downloadXLS

Triggers a download of an XLS file with the given data and filename.

### Dependencies

This function depends on the `XLSX` library for converting JSON data to an XLSX format.

### Parameters

*   `data` **[Array][141]<[Object][136]>** The data to be included in the XLS file. Each object represents a row.
*   `filename` **[string][137]** The name of the file to be downloaded.

### Examples

```javascript
const data = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
];
downloadXLS(data, "data.xlsx");
```

## BandBar

Generic component for displaying a bar representing a band. Shows a tooltip with the total number of words on hover.

### Parameters

*   `props` **[Object][136]** The props for BandBar.

    *   `props.index` **[number][140]** The index of the band bar.
    *   `props.total` **[number][140]** The total number of words in the band.
    *   `props.width` **[string][137]** The width of the band bar.
    *   `props.colour` **[string][137]** The color of the band bar.

### Examples

```javascript
return (
  <BandBar index={0} total={100} width="50%" colour="red" />
)
```

## DownloadCoverageData

Component for downloading coverage data.

### Examples

```javascript
return (
  <DownloadCoverageData />
)
```

## LemmaTable

Component for displaying lemma table data.

### Redux Store Interaction

The component uses the following parts of the Redux store:

*   `statsSlice.lemmaFrequencyDict`: Frequency dictionary for lemmas.

The component dispatches the following Redux actions:

*   `setTableData`: Action to set the table data. Used so that this data can be downloaded.

### Examples

```javascript
return (
  <LemmaTable />
)
```

## DownloadTableData

Component for downloading table data.

### Examples

```javascript
return (
  <DownloadTableData />
)
```

## store

Configures the Redux store with slices for text, frequency bands, and statistics.

### Examples

```javascript
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <MyComponent />
  </Provider>
);
```

## setWordData

Sets the word data returned by the API.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new word data.

## setText

Sets the raw text, tokenizes it, and updates the words and tokens in the state.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new text.

## setStopWords

Sets the stop words to be ignored by the API.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new stop words.

## changeWord

Changes a word in the tokenized text to a synonym and updates the relevant state.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the index of the word to change, the new word, its rank, and lemma.

## textSlice

Redux slice for managing text-related state, including the raw text, tokenized text, stop words, and word data.

### Initial State

*   `text`: The raw text typed by the user.
*   `words`: The words that make up the text typed.
*   `tokens`: The tokenized text.
*   `stopWords`: Words to be ignored by the API.
*   `wordData`: Data for each word returned by the API.

### Examples

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { setText, setStopWords } from './textSlice';

const dispatch = useDispatch();
const text = useSelector((state) => state.textSlice.text);

dispatch(setText("Hello world"));
dispatch(setStopWords(["the", "and"]));
```

## splitText

Splits the given text into an array of word objects, preserving punctuation and formatting. Each object contains the word, its prefix, and postfix. Also returns an array of just the words.

The function handles cases where words are nested within punctuation and maintains line breaks as part of the word objects.

### Parameters

*   `text` **[string][137]** The text to be split into word objects.

### Examples

```javascript
const text = "...hello.. .world. sleep.";
const result = splitText(text);
console.log(result.objects);
// Output:
// [
//   { index: 0, prefix: '...', word: 'hello', postfix: '..' },
//   { index: 1, prefix: '.', word: 'world', postfix: '.' },
//   { index: 2, prefix: ' ', word: 'sleep', postfix: '.' }
// ]
console.log(result.words);
// Output:
// ['hello', 'world', 'sleep']
```

Returns **[Object][136]** An object containing:*   `objects`: An array of word objects, each with `index`, `prefix`, `word`, and `postfix`.
*   `words`: An array of just the words extracted from the text.

## changeColour

Changes the color of a specified band.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with target band and new color.

## changeTopVal

Changes the top value of a specified band and adjusts the bottom value of the next band.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with target band and new top value.

## changeBottomVal

Changes the bottom value of a specified band and adjusts the top value of the previous band.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with target band and new bottom value.

## removeBand

Removes a specified band and adjusts the pointers of adjacent bands.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the target band to be removed.

## toggleActive

Toggles the active state of a specified band.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the target band.

## addBand

Adds a new band to the state.

### Parameters

*   `state` **[Object][136]** The current state of the slice.

## saveBands

Saves the current band configuration to localStorage.

### Parameters

*   `state` **[Object][136]** The current state of the slice.

## frequencyBandsSlice

Redux slice for managing frequency bands, including their colors, values, and active states.

### Initial State

The initial state is either loaded from localStorage or set to default values.

### Examples

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { changeColour, addBand } from './frequencyBandsSlice';

const dispatch = useDispatch();
const bands = useSelector((state) => state.bandsSlice.bands);

dispatch(changeColour({ target: 1, colour: '#000000' }));
dispatch(addBand());
```

## reset

Resets the `bands` array to an empty array.

### Parameters

*   `state` **[Object][136]** The current state of the slice.

## setBandFrequencyDict

Sets the band frequency dictionary.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new band frequency dictionary.

## setTableData

Sets the table data.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new table data.

## setCoverageData

Sets the coverage data.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new coverage data.

## setDistributionData

Sets the distribution data.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new distribution data.

## setLemmaFrequencyDict

Sets the lemma frequency dictionary.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new lemma frequency dictionary.

## setNotInList

Sets the not in list data.

### Parameters

*   `state` **[Object][136]** The current state of the slice.
*   `action` **[Object][136]** The action object containing payload with the new not in list data.

## statsSlice

Redux slice for managing statistics-related state, including bands, table data, coverage data, distribution data, and frequency dictionaries.

### Initial State

*   `bands`: An array for storing band information.
*   `tableData`: An object for storing table data.
*   `coverageData`: An array for storing coverage data.
*   `distributionData`: An array for storing distribution data.
*   `bandFrequencyDict`: An object for storing the frequency of bands.
*   `lemmaFrequencyDict`: An object for storing the frequency of lemmas.

### Examples

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { setTableData, reset } from './statsSlice';

const dispatch = useDispatch();
const stats = useSelector((state) => state.statsSlice);

dispatch(setTableData({ key: 'value' }));
dispatch(reset());
```

[1]: #root

[2]: #examples

[3]: #app

[4]: #initialization

[5]: #examples-1

[6]: #maineditor

[7]: #redux-store-interaction

[8]: #parameters

[9]: #examples-2

[10]: #bandsbar

[11]: #redux-store-interaction-1

[12]: #api-interaction

[13]: #examples-3

[14]: #bandconfigpanel

[15]: #redux-store-interaction-2

[16]: #parameters-1

[17]: #examples-4

[18]: #scaleanimation

[19]: #examples-5

[20]: #scaleanimation-1

[21]: #properties

[22]: #fadeanimation

[23]: #properties-1

[24]: #band

[25]: #redux-store-interaction-3

[26]: #parameters-2

[27]: #examples-6

[28]: #bandcolour

[29]: #redux-store-interaction-4

[30]: #dependencies

[31]: #parameters-3

[32]: #examples-7

[33]: #newband

[34]: #redux-store-interaction-5

[35]: #examples-8

[36]: #dialogbox

[37]: #parameters-4

[38]: #examples-9

[39]: #apisettings

[40]: #parameters-5

[41]: #examples-10

[42]: #fileupload

[43]: #redux-store-interaction-6

[44]: #examples-11

[45]: #formattedoutput

[46]: #redux-store-interaction-7

[47]: #examples-12

[48]: #whichband

[49]: #parameters-6

[50]: #examples-13

[51]: #synonymreplacer

[52]: #redux-store-interaction-8

[53]: #parameters-7

[54]: #examples-14

[55]: #distributiondisplay

[56]: #redux-store-interaction-9

[57]: #examples-15

[58]: #distributiondisplay-1

[59]: #redux-store-interaction-10

[60]: #examples-16

[61]: #downloaddistributiondata

[62]: #examples-17

[63]: #downloadbutton

[64]: #parameters-8

[65]: #examples-18

[66]: #converttocsv

[67]: #parameters-9

[68]: #examples-19

[69]: #downloadcsv

[70]: #parameters-10

[71]: #examples-20

[72]: #downloadxls

[73]: #dependencies-1

[74]: #parameters-11

[75]: #examples-21

[76]: #bandbar

[77]: #parameters-12

[78]: #examples-22

[79]: #downloadcoveragedata

[80]: #examples-23

[81]: #lemmatable

[82]: #redux-store-interaction-11

[83]: #examples-24

[84]: #downloadtabledata

[85]: #examples-25

[86]: #store

[87]: #examples-26

[88]: #setworddata

[89]: #parameters-13

[90]: #settext

[91]: #parameters-14

[92]: #setstopwords

[93]: #parameters-15

[94]: #changeword

[95]: #parameters-16

[96]: #textslice

[97]: #initial-state

[98]: #examples-27

[99]: #splittext

[100]: #parameters-17

[101]: #examples-28

[102]: #changecolour

[103]: #parameters-18

[104]: #changetopval

[105]: #parameters-19

[106]: #changebottomval

[107]: #parameters-20

[108]: #removeband

[109]: #parameters-21

[110]: #toggleactive

[111]: #parameters-22

[112]: #addband

[113]: #parameters-23

[114]: #savebands

[115]: #parameters-24

[116]: #frequencybandsslice

[117]: #initial-state-1

[118]: #examples-29

[119]: #reset

[120]: #parameters-25

[121]: #setbandfrequencydict

[122]: #parameters-26

[123]: #settabledata

[124]: #parameters-27

[125]: #setcoveragedata

[126]: #parameters-28

[127]: #setdistributiondata

[128]: #parameters-29

[129]: #setlemmafrequencydict

[130]: #parameters-30

[131]: #setnotinlist

[132]: #parameters-31

[133]: #statsslice

[134]: #initial-state-2

[135]: #examples-30

[136]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[137]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[138]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[139]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[140]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[141]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

<!-- apistop -->

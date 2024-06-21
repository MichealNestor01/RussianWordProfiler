# RussianWordProfiler

## Project Description

This project's aim is to emulate the feature set of the AntWordProfiler, (Laurence Anthony, https://www.laurenceanthony.net/software/antwordprofiler/), except this time through a web based interface and with baked in support for Russian.

The project relies heavily on Sharov's and Lyashevskaya's Russian Frequency Dictionary (О. Н. Ляшевская, С. А. Шаров, Частотный словарь современного русского языка (на материалах Национального корпуса русского языка). М.: Азбуковник, 2009, http://dict.ruslang.ru/freq.php)

## Running the Project Locally
### Prerequisites 

You will need to install python 10 or above, and node.js, if on windows ensure to click the ADD TO PATH option on installation for both. 

We have seen mixed results running the development evnironment locally on windows. If it runs very slowly, edit the [BandsBar.js](frontend/src/components/main/BandsBar.js) and change:

```
const url =
    window.location.href === "http://localhost:3000/" ||
    window.location.href === "http://localhost:5000/"
    ? "http://127.0.0.1:5000/"
    : "https://russianwordprofiler.pythonanywhere.com/";
```

to 

```
const url = "https://russianwordprofiler.pythonanywhere.com/";
```

Then rebuild.

### Running Locally

Run in a bash terminal:
```
$ ./build.sh
$ cd api
$ python -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
$ flask run
```

Run in a powershell terminal:
```
$ ./build.sh
$ cd api
$ python -m venv .venv
$ ./venv/Scripts/activate
$ pip install -r requirements.txt
$ flask run
```

## Building

In the top level of this directory there is a build.sh bash script designed to run on linux, but should work on windows. If you run this file and have python, node.js installed on your system, this build file will run all of the tests and subsequently build a zip file in the top level of the directory which can be uploaded directly to python anywhere. 

## Documentation

Documentation for the [frontend](frontend/) and [api](api/) are found in the README's of their respective directories. 

## Acknowledgements

Authors: Dr. Pavel Gudoshnikov, Micheal Nestor, Ben Thirkill

AntWordProfiler: Dr. Laurence Anthony

Russian Lemma Frequency List: О. Н. Ляшевская, С. А. Шаров (Lyashevskaya O. N. , Sharov S. A.)

const output = document.getElementById("output");

document.getElementById("getVal").addEventListener("click", () => {
  profiler.setText("hello world");
  let text = profiler.getText();
  output.innerText = `The output is: ${text}`;
});

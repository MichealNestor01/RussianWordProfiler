const time = document.getElementById("time");

document.getElementById("getTime").addEventListener("click", () => {
  let time_now = getTime();
  time.innerText = `The time is: ${time_now}`;
});

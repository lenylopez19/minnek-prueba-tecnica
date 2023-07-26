function isAletter(char) {
  if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
    return true;
  } else {
    return false;
  }
}

function reverse(arr) {
  let end = arr.length - 1;
  let start = 0;
  while (start < end) {
    if (!isAletter(arr[start])) {
      start++;
    } else if (!isAletter(arr[end])) {
      end--;
    } else {
      let hold = arr[start];
      arr[start] = arr[end];
      arr[end] = hold;
      start++;
      end--;
    }
  }
  return arr;
}

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let txt = document.querySelector('input[type="text"]').value.split("");
  result = reverse(txt).join("");
  html = `<span>${result}</span>`;
  const answer = document.getElementById("resultHolder");
  answer.innerHTML = html;
});

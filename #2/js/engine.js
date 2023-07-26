function getRamdonDog(numberOfDogs, limit) {
  let randomDog = [];

  for (let i = 0; i < limit; i++) {
    const randomPosition = Math.floor(Math.random() * numberOfDogs - 1);
    if (!randomDog.includes(randomPosition)) {
      randomDog.push(randomPosition);
    } else {
      i--;
    }
  }
  return randomDog;
}

function renderDogs(dogArr, limit) {
  let newDogArr = [];
  let cardItemHtml = "";

  const randomDog = getRamdonDog(dogArr.length, limit);

  for (let i = 0; i < limit; i++) {
    newDogArr.push(dogArr[randomDog[i]]);
  }

  for (dog of newDogArr) {
    const breedExist = dog[1].length != 0;
    let li = "";

    if (breedExist) {
      for (let i = 0; i < breedLimit; i++) {
        if (dog[1][i] != undefined) {
          li += `<li>${dog[1][i]}</li>`;
        }
      }
    } else {
      li = "<li>no breed</>";
    }

    cardItemHtml += `
    <article class="card">
        <div class="sub-breed">
            <ul>
              ${li}
            </ul>
        </div>
        <img id="IMG_${dog[0]}" class="dogImage" alt="${dog[0]}">
        <h2 class="mainTitle">${dog[0]}</h2>
    </article>
    `;

    getDogImage(dog[0]);
  }

  document.getElementById("contentHolder").innerHTML = cardItemHtml;
}

async function getDogImage(dog) {
  const url = `https://dog.ceo/api/breed/${dog}/images/random`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const imgUrl = data.message;
      const imgContainer = document.getElementById("IMG_" + dog);
      imgContainer.src = imgUrl;
    })
    .then(() => {
      const load = document.getElementById("contentHolder");
      load.style.opacity = "1";
    })
    .catch((error) => {
      showError(error);
    });
}

function showError(err) {
  const error = document.getElementById("errMsj");
  error.textContent = err;
}

async function getDogs(url, limit) {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dogs = Object.entries(data.message);
      renderDogs(dogs, limit);
    })
    .catch((error) => {
      showError(error);
    });
}

const url = "https://dog.ceo/api/breeds/list/all";
const breedLimit = 3;

getDogs(url, 8);

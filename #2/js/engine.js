const API = "https://dog.ceo/api";
const listAllDogs = "breeds/list/all";
let globalDogs = [];

function getRamdonDog(dogArr, maxDogs) {
  let newDogArr = [];
  let numberOfDogs = dogArr.length - 1;
  for (let i = 0; i < maxDogs; i++) {
    const randomDog = Math.round(Math.random() * numberOfDogs);
    if (!newDogArr.includes(dogArr[randomDog]))
      newDogArr.push(dogArr[randomDog]);
    else i--;
  }
  return newDogArr;
}

const getDogs = async () => {
  showLoading();
  let result;
  try {
    result = await fetch(`${API}/${listAllDogs}`);
  } catch (err) {
    hideLoading();
    showError("Woops, something went wrong.");
    console.error("Error fetching the dogs info", err);
  }

  if (result?.ok) {
    const dataJson = await result.json();
    globalDogs = Object.entries(dataJson.message);
    prepareDog();
  } 
  else {
    hideLoading();
    showError("Woops, something went wrong.");
    console.error(
      `Error fetching the dogs info, HTTP ResponseCode: ${result?.status}`
    );
  }
};

function prepareDog(){
  showLoading();
  const dogsToDisplay = getRamdonDog(globalDogs, homeDogs);
    for (const dog of dogsToDisplay) {
      const [dogName, dogBreeds] = dog;
      const dogObj = {
        name: dogName,
        breed: dogBreeds,
      };
      getDogsImg(dogObj, renderDogs);
    }
}

const getDogsImg = async (dogObj, fn) => {
  let result;
  try {
    result = await fetch(`${API}/breed/${dogObj.name}/images/random`);
  } catch (err) {
    hideLoading();
    showError("Woops, something went wrong.");
    console.error("error fetching img", err);
  }

  if (result?.ok) {
    const dataJson = await result.json();
    const dogImageUrl = dataJson.message;
    dogObj.imageUrl = dogImageUrl;
    fn(dogObj);
  } 
  else {
    hideLoading();
    showError("Woops, something went wrong.");
    console.error(
      `Error fetching the dogs info, HTTP ResponseCode: ${result?.status}`
    );
  }
};

function renderDogs(dogObj, breedLimit=3) {
  const { name: dogName, breed: breeds, imageUrl: dogImageUrl } = dogObj;
  let breedList = "";
  const breedExist = breeds.length;
  if (breedExist) {
    for (let i = 0; i < breeds.length; i++) {
      if (i >= breedLimit) break;
      breedList += `<li>${breeds[i]}</li>`;
    }
  } else {
    breedList = `<li>no breed</li>`;
  }
  const htmlCard = `
    <article id = "dog_${dogName}"class="card">
      <div class="sub-breed">
        <ul>
          ${breedList}
        </ul>
      </div>
      <img onerror="this.src='assets/errorImg.jpeg'" id="IMG_${dogName}" src="${dogImageUrl}" class="dogImage" alt="${dogName}">
      <h2 class="mainTitle">${dogName}</h2>
    </article>
    `;
  hideLoading();
  mainContent.innerHTML += htmlCard;
  setTimeout(() => {
    dogitem = document.getElementById(`dog_${dogName}`)
    if (dogitem) dogitem.style.opacity = 1;
  }, 200);
}

function search(char) {
  showLoading();
  char = char.toLowerCase();
  const result = [...globalDogs].filter((dog) => dog[0].startsWith(char));
  if (result.length) {
    for (const dog of result) {
      const newDog = {
        name: dog[0],
        breed: dog[1],
      };
      getDogsImg(newDog, renderDogs);
    }
  } 
  else {
    hideLoading();
    mainContent.innerHTML = `
    <div class="searchNotFound"> 
      <img src='assets/noResult.png' alt = 'no result found...' />
      <h2>Woops, couldnt find anything.</h2>
    </div> 
    `
  }
}

const searchInput = document.getElementById("searchDog");
searchInput.addEventListener("keypress", function (event) {
  if (event.key == "Enter" && this.value) {
      mainContent.innerHTML = "";
      search(this.value);
  }
});

function showError(errorMsg) {
  const errorMsjExist = mainContent.querySelector(".errorMsj");
  if (!errorMsjExist) {
    const errorMsjElement = document.createElement("div");
    errorMsjElement.className = "errorMsj";
    const html =
    `
    <img src="assets/loadingError.png" alt="error" />
    <h2 class="errorTittle">${errorMsg}</h2>
    `;
    errorMsjElement.innerHTML = html;
    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.className = "reload";
    tryAgainBtn.innerText = "Try Again";
    tryAgainBtn.addEventListener("click", init, { once: true });
    errorMsjElement.append(tryAgainBtn);
    contentHolder.append(errorMsjElement);
  }
}

function hideError() {
  const errorMsjExist = mainContent.querySelector(".errorMsj");
  if (errorMsjExist) {
    errorMsjExist.remove();
  }
}

function showLoading() {
  const loading = document.querySelector(".loading");
  loading.style.display = "flex";
}

function hideLoading() {
  const loading = document.querySelector(".loading");
  loading.style.display = "none";
}

const homeIcon = document.querySelector(".home");
homeIcon.addEventListener("click", function () {
  mainContent.innerHTML = "";
  prepareDog(homeDogs)
});

function init() {
  mainContent.innerHTML = "";
  getDogs(homeDogs);
}

const mainContent = document.getElementById("contentHolder");
const homeDogs = 16;

init();


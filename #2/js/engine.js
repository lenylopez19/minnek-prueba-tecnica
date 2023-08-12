const API = "https://dog.ceo/api";
const listAllDogs = "breeds/list/all";

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

const getDogs = async (numberOfDogs) => {
  let result;

  try {
    result = await fetch(`${API}/${listAllDogs}`);
  } catch {
    console.error("something went wrong fetching the dogs info", err);
  }

  if (result?.ok) {
    const dataJson = await result.json();
    const dogs = Object.entries(dataJson.message);
    const dogsToDisplay = getRamdonDog(dogs, numberOfDogs);

    for (const dog of dogsToDisplay) {
      const dogName = dog[0];
      try {
        result = await fetch(`${API}/breed/${dogName}/images/random`);
      } catch (err) {
        console.error("something went wrong fetching a dog image", err);
      }
      if (result?.ok) {
        const dataJson = await result.json();
        const dogImageUrl = dataJson.message;
        renderDogs(dog, dogImageUrl, 3);
      } else {
        console.log(result?.status);
      }
    }
  } else {
    console.log(`HTTP Response Code: ${result?.status}`);
  }
};

function renderDogs(dog, dogImageUrl, breedLimit) {
  const breeds = dog[1];
  const dogName = dog[0];
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

  document.getElementById("contentHolder").innerHTML += htmlCard;

  setTimeout(() => {
    document.getElementById(`dog_${dogName}`).style.opacity = 1;
  }, 1000);
}

getDogs(8);

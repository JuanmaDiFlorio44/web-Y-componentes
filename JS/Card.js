function AddCMS() {
  const spaceId = "eyu4lwv5ech6";
  const accessToken = "MLAOxXZWQ1yoi7bPDxxnaCw7l7e4ErNxRRtfLNUDr4Y";
  const contentTypeId = "web-components";

  function addCMSComtent(params = {}) {
    const template1 = document.querySelector("#card-template");
    const template2 = document.querySelector("#card-template2");
    const template3 = document.querySelector("#card-template3");

    const container1 = document.querySelector(".about-me__card");
    const container2 = document.querySelector(".about-me__card2");
    const container3 = document.querySelector(".about-me__card3");

    // Crear clon para el primer template
    const clone1 = document.importNode(template1.content, true);
    clone1.querySelector(".about-me__card-title").textContent =
      params.cardTtile;
    clone1.querySelector(".about-me__card-text").textContent = params.cardText;
    clone1.querySelector(".about-me__card-img").src = params.cardImg1;

    // Crear clon para el segundo template
    const clone2 = document.importNode(template2.content, true);
    clone2.querySelector(".about-me__card-title").textContent =
      params.cardTtile2;
    clone2.querySelector(".about-me__card-text").textContent = params.cardText2;
    clone2.querySelector(".about-me__card-img").src = params.cardImg2;

    // Crear clon para el tercer template
    const clone3 = document.importNode(template3.content, true);
    clone3.querySelector(".about-me__card-title").textContent =
      params.cardTtile3;
    clone3.querySelector(".about-me__card-text").textContent = params.cardText3;
    clone3.querySelector(".about-me__card-img").src = params.cardImg3;

    // Añadir los clones a sus respectivos contenedores
    container1.appendChild(clone1);
    container2.appendChild(clone2);
    container3.appendChild(clone3);
  }

  function getCMS() {
    const url = `https://cdn.contentful.com/spaces/${spaceId}/entries?content_type=${contentTypeId}&access_token=${accessToken}`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const assetsMap = {};
        if (data.includes && data.includes.Asset) {
          data.includes.Asset.forEach((asset) => {
            assetsMap[asset.sys.id] = asset.fields.file.url;
          });
        }
        return data.items.map((item) => ({
          cardTtile: item.fields.cardTitle1,
          cardText: item.fields.cardDescr1,
          cardImg1: assetsMap[item.fields.cardImg.sys.id],
          cardTtile2: item.fields.cardTitle2,
          cardText2: item.fields.cardDescr2,
          cardImg2: assetsMap[item.fields.cardImg.sys.id],
          cardTtile3: item.fields.cardTitle3,
          cardText3: item.fields.cardDescr3,
          cardImg3: assetsMap[item.fields.cardImg.sys.id],
        }));
      });
  }

  function main() {
    getCMS()
      .then((works) => {
        if (works) {
          works.forEach(addCMSComtent);
        }
      })
      .catch((error) => {
        console.error("Error fetching works:", error);
      });
  }

  main();
}

AddCMS();

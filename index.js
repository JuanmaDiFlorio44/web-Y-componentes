function loadHeader() {
  const headerContainer = document.querySelector(".main-header");
  const width = window.innerWidth;

  if (width >= 1024) {
    fetch("/Componentes/Desktop/header.html")
      .then((response) => response.text())
      .then((data) => {
        headerContainer.innerHTML = data;
      });
  } else {
    fetch("/Componentes/Mobile/header.html")
      .then((response) => response.text())
      .then((data) => {
        headerContainer.innerHTML = data;
      });
  }
}

function loadFooter() {
  const headerContainer = document.querySelector(".main-footer");
  const width = window.innerWidth;

  if (width >= 1024) {
    fetch("/Componentes/Desktop/footer.html")
      .then((response) => response.text())
      .then((data) => {
        headerContainer.innerHTML = data;
      });
  } else {
    fetch("/Componentes/Mobile/footer.html")
      .then((response) => response.text())
      .then((data) => {
        headerContainer.innerHTML = data;
      });
  }
}

window.onload = function () {
  loadHeader();
  loadFooter();
};

window.onresize = function () {
  loadHeader();
  loadFooter();
};

function AddCMS() {
  const spaceId = "eyu4lwv5ech6";
  const accessToken = "MLAOxXZWQ1yoi7bPDxxnaCw7l7e4ErNxRRtfLNUDr4Y";
  const contentTypeId = "web-components";

  function addCMSComtent(params = {}) {
    // Cambiado el nombre a addWorkCard
    const template = document.querySelector("#about-me-template");
    const container = document.querySelector(".info-content");

    const clone = document.importNode(template.content, true);
    clone.querySelector(".info__title").textContent = params.infoTitle;
    clone.querySelector(".info__text").textContent = params.infoText;
    clone.querySelector(".info__img").src = params.infoImg;

    container.appendChild(clone);
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
          infoTitle: item.fields.infoTitle,
          infoText: item.fields.infoText,
          infoImg: assetsMap[item.fields.infoImg.sys.id],
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

function MyService() {
  const spaceId = "eyu4lwv5ech6";
  const accessToken = "MLAOxXZWQ1yoi7bPDxxnaCw7l7e4ErNxRRtfLNUDr4Y";
  const contentTypeId = "web-components";

  function addServicesContent(params = {}) {
    // Cambiado el nombre a addWorkCard
    const template = document.querySelector("#servicios-template");
    const container = document.querySelector(".service-content");
    const clone = document.importNode(template.content, true);
    clone.querySelector(".servicios-title").textContent = params.servicesTitle;
    clone.querySelector(".servicios-title2").textContent =
      params.servicesTitle2;
    container.appendChild(clone);

    const templateSaludo = document.querySelector("#main-web__saludo-template");
    const saludoContainer = document.querySelector(".main-web__saludo");
    const cloneSaludo = document.importNode(templateSaludo.content, true);
    cloneSaludo.querySelector(".Saludo").textContent = params.Saludo;
    cloneSaludo.querySelector(".Saludo2").textContent = params.Saludo2;
    cloneSaludo.querySelector(".imgSaludo").src = params.imgSaludo;
    saludoContainer.appendChild(cloneSaludo);
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
          servicesTitle: item.fields.portName,
          servicesTitle2: item.fields.portName2,
          Saludo: item.fields.saludo,
          Saludo2: item.fields.saludo2,
          imgSaludo: assetsMap[item.fields.imgSaludo.sys.id],
        }));
      });
  }

  function main() {
    getCMS()
      .then((works) => {
        if (works) {
          works.forEach(addServicesContent);
        }
      })
      .catch((error) => {
        console.error("Error fetching works:", error);
      });
  }

  main();
}

MyService();

function loadCard() {
  const cardContainer = document.querySelector(".servicios-card");

  fetch("/Componentes/Card/card.html")
    .then((response) => response.text())
    .then((data) => {
      const template = document.createElement("template");
      template.innerHTML = data;

      const clone = document.importNode(template.content, true);
      cardContainer.appendChild(clone);
    });
}

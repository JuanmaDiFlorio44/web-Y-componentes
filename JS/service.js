function loadHeader() {
  const headerContainer = document.querySelector(".header");
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
  const headerContainer = document.querySelector(".footer-port");
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
    const template = document.querySelector("#port-main-template");
    const container = document.querySelector(".port-main__home-container");

    const clone = document.importNode(template.content, true);
    clone.querySelector(".port-main__home-title").textContent =
      params.homeTitle;
    clone.querySelector(".port-main__home-img").src = params.homeImg;
    clone.querySelector(".servicios-main__home-title2").textContent =
      params.servicioTitle;

    container.appendChild(clone);

    const templateServ = document.querySelector("#serv-main-template");
    const containerServ = document.querySelector(".serv-about-me__container");

    const cloneServ = document.importNode(templateServ.content, true);
    cloneServ.querySelector(".serv-main__home-title").textContent =
      params.servTitle;
    cloneServ.querySelector(".serv-main__home-title2").textContent =
      params.servTitle2;

    containerServ.appendChild(cloneServ);
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
          homeTitle: item.fields.portName,
          homeTitle2: item.fields.portName2,
          homeImg: assetsMap[item.fields.portImg.sys.id],
          servTitle: item.fields.portName,
          servTitle2: item.fields.servTitle,
          servicioTitle: item.fields.servTitle,
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

function loadCard() {
  const cardContainer = document.querySelector(".card-container");

  fetch("/Componentes/Card/card.html")
    .then((response) => response.text())
    .then((data) => {
      const template = document.createElement("template");
      template.innerHTML = data;

      const clone = document.importNode(template.content, true);
      cardContainer.appendChild(clone);
    });
}

loadCard();

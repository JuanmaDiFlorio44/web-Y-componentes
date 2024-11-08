function botonSend() {
  document.querySelector(".button-enviar").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Formulario enviado con los siguientes datos:");
    console.log("Correo: ", email);
    console.log("Mensaje: ", message);

    const data = {
      to: email,
      message: message,
    };

    const url = "https://apx.school/api/utils/email-to-student";

    console.log("Enviando solicitud POST a:", url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Respuesta del servidor recibida:", response);
      if (response.ok) {
        console.log("¡Mensaje enviado con éxito!");
      } else {
        console.log(
          "Hubo un error al enviar el mensaje: ",
          response.status,
          response.statusText
        );
        return response.text();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  botonSend();
});

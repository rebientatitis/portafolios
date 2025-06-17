
(function(window, $) {

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();
	
	var y = 0,
		f = 0.45;

	function move() {
		y -= f;
		$('#banner').css('background-position', 'center ' + y + 'px');
	  requestAnimationFrame(move);
	}
	move();

})(window, jQuery);


// VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const responseBox = document.getElementById("response");

            if (!name || !email || !message) {
                alert("Por favor completa todos los campos.");
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/api/contacto", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await res.json();
                responseBox.textContent = data.mensaje;
                responseBox.style.color = "green";
                contactForm.reset();
            } catch (error) {
                responseBox.textContent = "Hubo un error al enviar el mensaje.";
                responseBox.style.color = "red";
            }
        });
    }
    // VALIDACIÓN Y ENVÍO DEL FORMULARIO DE COMENTARIOS
    const commentForm = document.getElementById("comentario-form");
    const mensajeComentario = document.getElementById("mensaje-envio");
    const contenedorComentarios = document.getElementById("Comentarios-container");

    async function cargarComentarios() {
        try {
            const res = await fetch("http://localhost:3000/api/comentarios");
            const comentarios = await res.json();
            contenedorComentarios.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos comentarios
            comentarios.reverse().forEach(t => {
                const div = document.createElement("div");
                div.className.add("comentario");
                div.innerHTML = `<p>"${t.contenido}"</p><strong>- ${t.autor}</strong>`;
                contenedorComentarios.appendChild(div);
            });
        }
        catch (error) {
            console.error("Error al cargar comentarios:", error);
        }
    }
    if (commentForm) {
        commentForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const autor = document.getElementById("autor").value.trim();
            const contenido = document.getElementById("contenido").value.trim();

            if (!autor || !contenido) {
                mensajeComentario.textContent = "Por favor completa todos los campos.";
                mensajeComentario.style.color = "red";            
                return;
            }

        try {
            const res = await fetch("http://localhost:3000/api/comentarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ autor, contenido })
            });

            const data = await res.json();
            mensajeComentario.textContent = data.mensaje;
            mensajeComentario.style.color = "green";
            commentForm.reset();
            cargarComentarios(); // Recargar comentarios después de enviar uno nuevo
        } catch (error) {
            mensajeComentario.textContent = "Hubo un error al enviar el comentario.";
            mensajeComentario.style.color = "red";
        }
    });

    cargarComentarios(); // Cargar comentarios al cargar la página
}
    // mostrar/ocultar formulario de comentarios
    const comentarioBtn = document.getElementById("toggle-comentarios");
    const formComentario = document.getElementById("formulario-comentario");

    if(comentarioBtn && formComentario){
        comentarioBtn.addEventListener("click", function() {
            formComentario.style.display = formComentario.style.display === "block" ? "none" : "block";
    });
    }


document.addEventListener("DOMContentLoaded", function() {
    // BOTÓN HACIA ARRIBA
    const scrollTopButton = document.getElementById("scroll-top");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            scrollTopButton.style.display = "block";
            scrollTopButton.style.opacity = "1";
        } else {
            scrollTopButton.style.opacity = "0";
            setTimeout(() => { scrollTopButton.style.display = "none"; }, 300);
        }
    });

    scrollTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // VALIDACIÓN DEL FORMULARIO
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("¡Mensaje enviado correctamente!");
        contactForm.reset();
    });
    

});



// --- Menú hamburguesa para mobile ---
const navToggle = document.getElementById('nav-toggle');
const navUl = document.querySelector('.nav ul');
const whatsappLink = document.getElementById('whatsapp-link');

navToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
});

// --- Scroll suave para navegación ---
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      navUl.classList.remove('active'); // Cierra menú en mobile
    }
  });
});

// --- Testimonios dinámicos ---
const testimonios = [  {
    texto: "Hector Cabrera, abogado, logró captar clientes de empresas gracias a su nueva web profesional y formulario de contacto.",
    nombre: "Hector Cabrera - Abogados & Consultores",
    link: "https://veryjused.com"
  }
];

let testimonioIndex = 0;
const testimonioContainer = document.getElementById('testimonio-container');

function mostrarTestimonio(index) {
  const t = testimonios[index];
  testimonioContainer.innerHTML = `
    <div class="testimonio">
      <p>"${t.texto}"</p>
      <div class="testimonio-nombre"><a id="testimonio-link" href="${t.link}" target="_blank">${t.nombre}</a></div>
    </div>
  `;
}

function rotarTestimonios() {
  mostrarTestimonio(testimonioIndex);
  testimonioIndex = (testimonioIndex + 1) % testimonios.length;
}

rotarTestimonios();
setInterval(rotarTestimonios, 5000);

// --- Validación básica de formulario ---
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');



form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();
  const asunto = form.asunto.value.trim();
  const telefono = form.telefono.value.trim();

  if (!nombre || !email || !mensaje || !asunto || !telefono) {
    formMsg.textContent = "Por favor, completa todos los campos.";
    formMsg.style.color = "#b30000";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMsg.textContent = "El email no es válido.";
    formMsg.style.color = "#b30000";
    return;
  }

  formMsg.textContent = "¡Mensaje enviado! Te responderemos pronto.";
  formMsg.style.color = "#0056b3";
  form.reset();

  emailjs.send("service_qjciobx","template_pjla8ws",{
    from_name: nombre,
    from_email: email,
    subject: asunto,
    message: mensaje
  }).then(() => {
    formMsg.textContent = "¡Mensaje enviado! Te responderemos pronto.";
    formMsg.style.color = "#0056b3";
    form.reset();
  }, (error) => {
    formMsg.textContent = "Error al enviar el mensaje. Intenta nuevamente.";
    formMsg.style.color = "#b30000";
    console.error("EmailJS error:", error);
  });  
});

  whatsappLink.addEventListener('click', function(e) {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const asunto = form.asunto.value.trim();
    const telefono = form.telefono.value.trim();

    const texto = `*Nombre:* ${nombre}%0A*Asunto:* ${asunto}%0A*Correo:* ${email}%0A*Teléfono:* ${telefono}%0A*Mensaje:* ${mensaje}`;
    const numero = '18492078083';
    const url = `https://wa.me/${numero}?text=${texto}`;
    window.open(url, '_blank');
    form.reset();
  });

// --- Animaciones al hacer scroll (fade-in) ---
const animElements = document.querySelectorAll('.card, .sobre-nosotros, .testimonio, .cta, .contacto');
const animOnScroll = () => {
  animElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  });
};
window.addEventListener('scroll', animOnScroll);
window.addEventListener('load', animOnScroll);

// --- Modal de detalles de servicio ---
const detallesServicios = {
  solo: {
    titulo: "Paquete Solo",
    descripcion: [
      "Sitio web de una sola página (Landing page)",
      "Hosting + dominio por 1 año",
      "SSL gratuito",
      "Mantenimiento por 1 mes",
      "Diseño personalizado",
      "Optimizado para móviles",
      "Integración básica con WhatsApp",
      "Formulario de contacto",
      "Ideal para emprendedores y pequeños negocios"
    ],
    precio: {
        unico: "USD $300",
        instalacion: "USD $85",
        mensual: "USD $50/mes"
    }
  },
  pro: {
    titulo: "Paquete Pro",
    descripcion: [
      "Todo lo del paquete Solo, más:",
      "Sitio web profesional multi-sección",
      "Diseño avanzado",
      "Integración con redes sociales",
      "Blog básico",
      "Optimización SEO básica"
    ],
    precio: {
        unico: "USD $580",
        instalacion: "USD $150",
        mensual: "USD $50/mes"
    }
  },
  tienda: {
    titulo: "Paquete tienda",
    descripcion: [
      "Todo lo del paquete Pro, más:",
      "Carrito de compras",
      "Pasarelas de pago",
      "Integración con redes sociales",
      "Catálogo de productos",
      "Optimización SEO avanzada"
    ],
    precio: {
        unico: "USD $920",
        instalacion: "USD $180",
        mensual: "USD $100/mes"
    }
  },
  avanzado: {
    titulo: "Paquete Avanzado",
    descripcion: [
      "Desarrollo de software a medida",
      "Funcionalidades personalizadas",
      "Integración con sistemas existentes",
      "Panel de administración",
      "Soporte y mantenimiento",
      "Para empresas con necesidades específicas y proyectos complejos"
    ],
    precio: {
        unico: "USD $10 por hora",
        instalacion: "",
        mensual: ""
    }
    // precio: "$250,000"
  },
  mantenimiento: {
    titulo: "Paquete Mantenimiento",
    descripcion: [
      "Soporte técnico continuo",
      "Actualizaciones regulares del sitio web",
      "Monitoreo de seguridad",
      "Optimización del rendimiento",
      "Backups automáticos"
    ],
    precio: {
        unico: "",
        instalacion: "",
        mensual: "USD $100/mes"
    }
    // precio: "$250,000"
  }
};

const modal = document.getElementById('modal-detalle');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalPrecio1 = document.getElementById('modal-precio1');
const modalPrecio2 = document.getElementById('modal-precio2');

const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.btn-detalle').forEach(btn => {
  btn.addEventListener('click', function() {
    const tipo = this.getAttribute('data-servicio');
    const info = detallesServicios[tipo];
    modalTitulo.textContent = info.titulo;
    modalDescripcion.innerHTML = info.descripcion.map(item => `<li>${item}</li>`).join('');
    modalPrecio1.innerHTML = info.precio.unico ? "<strong>Pago único:</strong> " + info.precio.unico : "";
    modalPrecio2.innerHTML = info.precio.instalacion  ? "<strong>Pago inicial:</strong> " + info.precio.instalacion + (info.precio.mensual ? " | <strong>Mensual:</strong> " + info.precio.mensual : "") : (info.precio.mensual ? "<strong>Mensual:</strong> " + info.precio.mensual :"Sin suscripción");
    modal.classList.add('active');

    document.getElementById('modal-precio-o').style.display = (info.precio.unico && (info.precio.instalacion || info.precio.mensual)) ? 'block' : 'none';

  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});
const PRECIO_ESTANDAR = 22000;
const TOTAL_ESPACIOS = 30; 

let seleccionados = [];

function renderCatalogo() {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';

    for (let i = 1; i <= TOTAL_ESPACIOS; i++) {
        const nombreArchivo = `remera${i}.jpg`;
        const card = document.createElement('div');
        card.className = 'remera-card';
        card.style.display = 'none';

        const img = new Image();
        img.src = `img/${nombreArchivo}`;

        img.onload = function() {
            card.style.display = 'block';
            card.innerHTML = `
                <img src="img/${nombreArchivo}">
                <p class="precio">$${PRECIO_ESTANDAR.toLocaleString()}</p>
                
                <div class="talles-container">
                    <label>Talle:</label>
                    <select id="talle-${i}">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>

                <button class="add-btn" onclick="agregarAlPedido(${i})">
                    Seleccionar
                </button>
            `;
        };
        catalogo.appendChild(card);
    }
}

function agregarAlPedido(index) {
    const talleElegido = document.getElementById(`talle-${index}`).value;
    // Como no hay nombre, usamos el número de modelo para que sepas cuál es
    seleccionados.push({ modelo: `Modelo ${index}`, talle: talleElegido, precio: PRECIO_ESTANDAR });
    actualizarResumen();
}

function actualizarResumen() {
    const count = seleccionados.length;
    let totalSuma = seleccionados.reduce((sum, p) => sum + p.precio, 0);
    document.getElementById('items-count').innerText = `${count} seleccionados`;
    document.getElementById('total-price').innerText = `$${totalSuma.toLocaleString()}`;
}

function enviarWhatsApp() {
    if (seleccionados.length === 0) return alert("Por favor, selecciona al menos una remera.");

    let mensaje = "¡Hola Voglio Vestiti! ✨ Pedido nuevo:\n\n";
    let totalFinal = 0;

    seleccionados.forEach((p) => {
        mensaje += `▪️ ${p.modelo} - Talle: ${p.talle} ($${p.precio.toLocaleString()})\n`;
        totalFinal += p.precio;
    });

    mensaje += `\n💰 *Total: $${totalFinal.toLocaleString()}*`;
    
    const numeroTel = "5491126425994"; 
    const url = `https://wa.me/${numeroTel}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

renderCatalogo();
// Inicializar saldo y movimientos
let saldo = Number(localStorage.getItem('saldo')) || 0;
let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];


// cargar saldo y movimientos al iniciar
document.getElementById("saldo").innerText = saldo;
cargarMovimientos();


// Manejar deposito
document.getElementById("btnDepositar").addEventListener("click", () => {
    let cantidad = Number(document.getElementById("deposito").value);
    saldo += cantidad;

    movimientos.push({ tipo: "Ahorro", cantidad });
    guardarMovimiento();

    document.getElementById("saldo").innerText = saldo;
    cargarMovimientos();

    document.getElementById("deposito").value = "";
});


// Manejar retiro
document.getElementById("btnRetirar").addEventListener("click", () => {
    let cantidad = Number(document.getElementById("retiro").value);

    if (cantidad <= 0 || cantidad > saldo) {
        alert("ingresa una cantidad valida");
        return;
    }

    saldo -= cantidad;

    movimientos.push({ tipo: "Retiro", cantidad });
    guardarMovimiento();
    document.getElementById("retiro").value = "";

    document.getElementById("saldo").innerText = saldo;
    cargarMovimientos();
});


// Guardar movimientos en localStorage
function guardarMovimiento() {
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}


// Cargar movimientos en la lista
function cargarMovimientos() {
    const lista = document.getElementById("movimientos");
    lista.innerHTML = "";

    movimientos.forEach(m => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${m.tipo}: $${m.cantidad}`;
        lista.appendChild(li);
    });
}


// Resetear alcancía
function resetearAlcancia() {
    saldo = 0;
    movimientos = [];
    guardarMovimiento();
    document.getElementById("saldo").innerText = saldo;
    cargarMovimientos();
}

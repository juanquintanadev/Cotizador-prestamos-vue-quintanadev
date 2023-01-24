const calcularTotalPagar = (cantidad, plazo) => {
    let total;

    // mientas mayor es la cantidad menor es el interes
    if(cantidad < 5000) {
        total = cantidad * 1.4;
    } else if(cantidad >=5000 && cantidad < 10000) {
        total = cantidad * 1.3;
    } else if(cantidad >=10000 && cantidad < 15000) {
        total = cantidad * 1.2;
    } else {
        total = cantidad * 1.1;
    };

    // mientras mayor es el plazo mayor es el interes
    if(plazo === 6) {
        total *= 1.2;
    } else if(plazo === 12) {
        total *= 1.3;
    } else {
        total *= 1.4;
    };

    return total;
};

export {
    calcularTotalPagar,
};
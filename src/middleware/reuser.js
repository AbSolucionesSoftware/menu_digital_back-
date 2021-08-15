const ctrlFuncticon = {};

ctrlFuncticon.generateCode = (length) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

ctrlFuncticon.fechaCaducidad = (fecha) => {
	if (!fecha) {
		return null;
	} else {
		var newdate = new Date(fecha);
		const añoActual = newdate.getFullYear();
		const mesActual = newdate.getMonth() + 1;
		const hoy = newdate.getDate();
		const fechaCaducidad = añoActual + "-" + mesActual + "-" +  hoy;
		return fechaCaducidad;
	}
};


ctrlFuncticon.fechaActual = () => {
	var fecha = new Date();
    const añoActual = fecha.getFullYear();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;

    const fechaActual = añoActual + "-" + mesActual + "-" +  hoy;
	return fechaActual;
}


ctrlFuncticon.formatoFecha = (fecha) => {
	if (!fecha) {
		return null;
	} else {
		var newdate = new Date(fecha);
		return newdate.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
	}
};

  module.exports = ctrlFuncticon;
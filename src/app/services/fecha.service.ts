export class Fecha {

  public static fechaActual(): string {
    var date: Date = new Date();
    var anio = date.getFullYear();
    var mes = +date.getMonth() + 1;
    var dia = date.getDate();
    if (mes < 10) {
      if (dia < 10) {
        return anio + '0' + mes + '0' + dia;
      } else {
        return anio + '0' + mes + dia;
      }
    } else {
      if (dia < 10) {
        return anio + mes + '0' + dia;
      } else {
        return anio + '' + mes + dia;
      }
    }
  }

  public static fechaActualConGuion(): string {
    var date: Date = new Date();
    var anio = date.getFullYear();
    var mes = +date.getMonth() + 1;
    var dia = date.getDate();
    if (mes < 10) {
      if (dia < 10) {
        return anio + '0-' + mes + '-0' + dia;
      } else {
        return anio + '-0' + mes + '-' + dia;
      }
    } else {
      if (dia < 10) {
        return anio + '-' + mes + '-0' + dia;
      } else {
        return anio + '-' + mes + '-' + dia;
      }
    }
  }

  public static horaActual(): string {
    var date: Date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  public static numMes(): string {
    var date: Date = new Date();
    var mes = date.getMonth() + 1;
    if (mes < 10) {
      return '0' + mes;
    } else {
      return '' + mes;
    }
  }
}

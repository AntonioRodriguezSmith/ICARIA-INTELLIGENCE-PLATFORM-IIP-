
const assert = require('assert');
const path = require('path');
const helpers = require(path.resolve(__dirname, '../PR_Dectector/src/js/utilidades/helpers.js'));
const formatearFecha = helpers.formatearFecha;

describe('Helpers', function() {
  it('formatearFecha debe devolver fecha en formato dd/mm/yyyy HH:MM', function() {
    const fecha = new Date('2024-01-01T10:30:00');
    const resultado = formatearFecha(fecha);
    assert.match(resultado, /^01\/01\/2024 10:30/);
  });

  it('formatearFecha debe devolver cadena vacía si la fecha es inválida', function() {
    assert.strictEqual(formatearFecha('no-fecha'), '');
  });
});

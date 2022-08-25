import 'dotenv/config'

import { inquirerMenu, leerInput, pausa, listarLugares } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async () => {
  const busqueda = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // Mostrar mensaje
        const termino = await leerInput('Ciudad: ');

        // Buscar  los lugares
        const lugares = await busqueda.ciudad(termino);

        // seleccionar lugares
        const id = await listarLugares(lugares);
        if (id === '0') continue;

        const lugarSel = lugares.find(l => l.id === id);
        busqueda.agregarHistorial(lugarSel.nombre);
        //console.log(lugarSel.lng);       
        // clima
        const clima = await busqueda.climaLugar(lugarSel.lat, lugarSel.lng);
        // Mostrar resultado
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad:', lugarSel.nombre);
        console.log('Lat:', lugarSel.lat);
        console.log('Lng:', lugarSel.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Mínima:', clima.min);
        console.log('Máxima:', clima.max);
        console.log('Clima actual:', clima.desc.green);
        break;

      case '2':
        busqueda.historialCapitalizado.forEach((lugar, i) => {
            const idx = `${i+1}.`.green;
            console.log(`${idx}${lugar}`);
        })
        break;

    }

    await pausa();
  } while (opt !== '0');
  //console.log(opt);
}

main();

const celdas = [];
const RETICULA = 7; //número de filas y columnas de la reeticula
let ancho; //anchura de cada celda
let alto; //altura de cada celda

const azulejos = [];

let opcionesI = []; //opciones de los azulejos

const reglas = [
  //reglas de los bordes de cada azulejo
  {
    // tile 0
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 1
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 2
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 3
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 4
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 5
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 6
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 7
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 8
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 9
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 10
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 11
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 12
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 13
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 14
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 15
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 16
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 17
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 18
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 19
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 20
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 21
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 22
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 23
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 24
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 25
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 26
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 27
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 28
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },

  {
    // tile 29
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 30
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 31
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },

  {
    // tile 32
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },

  {
    // tile 33
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 34
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 35
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },

  {
    // tile 36
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
];

const NA = reglas.length; // numero de azulejos

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage(`tiles/tile${i}.png`);
  }
}

function setup() {
  createCanvas(1080, 1080);

  ancho = width / RETICULA; //calcular el ancho de cada celda
  alto = height / RETICULA; //calcular el alto de cada celda

  // inicializar opciones de azulejos
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  // inicializar información de celdas
  for (let i = 0; i < RETICULA * RETICULA; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }
}

function draw() {
  //background(111);

  //filtrar celdas con opciones disponibles y no colapsadas
  const celdasConOpciones = celdas.filter((celda) => {
    return celda.opciones.length > 0;
  });

  const celdasDisponibles = celdasConOpciones.filter((celda) => {
    return celda.colapsada == false;
  });

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });

    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
      return celda.opciones.length == celdasDisponibles[0].opciones.length;
    });

    //seleccionar una celda al azar de las celdas por colapsar y colapsarla
    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSeleccionada];

    //print(celdaSeleccionada);

    //dibujar el diseño en el lienzo
    for (let x = 0; x < RETICULA; x++) {
      for (let y = 0; y < RETICULA; y++) {
        const celdaIndex = x + y * RETICULA;
        const celdaActual = celdas[celdaIndex];

        if (celdaActual.opciones.length < 1) {
          //si no hay opciones disponibles dibujar un rectángulo rojo
          fill(255, 0, 0, 100);
          rect(x * ancho, y * alto, ancho, alto);
        }

        if (celdaActual.colapsada) {
          //si la celda está colapsada, dibujar el azulejo correspondiente
          const indiceDeAzulejo = celdaActual.opciones[0];
          const reglasActuales = reglas[indiceDeAzulejo];
          //print(reglasActuales);
          image(azulejos[indiceDeAzulejo], x * ancho, y * alto, ancho, alto);

          //Cambiar entropia  UP
          if (y > 0) {
            const indiceUP = x + (y - 1) * RETICULA;
            const celdaUP = celdas[indiceUP];
            if (!celdaUP.colapsada) {
              cambiarEntropia(celdaUP, reglasActuales["UP"], "DOWN");
            }
          }
          //Cambiar entropia RIGHT
          if (x < RETICULA - 1) {
            const indiceRIGHT = x + 1 + y * RETICULA;
            const celdaRIGHT = celdas[indiceRIGHT];
            if (!celdaRIGHT.colapsada) {
              cambiarEntropia(celdaRIGHT, reglasActuales["RIGHT"], "LEFT");
            }
          }
          //Cambiar entropia DOWN
          if (y < RETICULA - 1) {
            const indiceDOWN = x + (y + 1) * RETICULA;
            const celdaDOWN = celdas[indiceDOWN];
            if (!celdaDOWN.colapsada) {
              cambiarEntropia(celdaDOWN, reglasActuales["DOWN"], "UP");
            }
          }
          //Cambiar entropia LEFT
          if (x > 0) {
            const indiceLEFT = x - 1 + y * RETICULA;
            const celdaLEFT = celdas[indiceLEFT];
            if (!celdaLEFT.colapsada) {
              cambiarEntropia(celdaLEFT, reglasActuales["LEFT"], "RIGHT");
            }
          }
        } else {
          //strokeWeight(6);
          //dibujar contorno para celdas no colapsadas
          //rect(x * ancho, y * alto, ancho, alto);
        }
      }
    }
    //noLoop();
  } else {
    //desactivar Restablecer información de celdas si no hay celdas disponibles
    // for (let i = 0; i < RETICULA * RETICULA; i++) {
    //   celdas[i] = {
    //     colapsada: false,
    //     opciones: opcionesI,
    //   };
    // }
  }
}

function cambiarEntropia(_celda, _regla, _opuesta) {
  //cambiar las opciones disponibles para una celda según una regla y su opuesta
  const nuevasOpciones = [];
  for (let i = 0; i < _celda.opciones.length; i++) {
    const celdaOpcion = _celda.opciones[i];
    if (reglas[celdaOpcion][_opuesta] === _regla) {
      nuevasOpciones.push(celdaOpcion);
    }
  }
  _celda.opciones = nuevasOpciones;
  console.log(nuevasOpciones);
}

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 5


class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
    /* Al asignar los valores de colores si el nombre de la variable y el valor es el mismo podemos usar solamente el nombre y javascript sabra de que estamos habalndo */
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }


    /* Generamos un array con los numero atravez de un random y los redondeamos a una cifra  */
    generarSecuencia() {
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }


    siguienteNivel() {
      this.iluminarSecuencia()
      this.agregarEventosClick()
      this.subnivel = 0
    }

    /* Con este switch convertimos el numero obtenido a el color que le corresponde */
    transformarNumero(numero) {
        switch(numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }  
    }

    transformarColor(color) {
        switch(color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }  
    }

    /* Con este for recorremos el nivel actual de el jugador y se los asignamos a la funcion transformar numero para saber de que color se trata de la misma forma iluminamos los colores  a determinado tiempo con setTimeout para que no se pinten al mismo tiempo */
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumero(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    /* Esta funcion recibe como parametro el color obtenido de tranformarNumero y se lo pasa a esta funcion la cual añade una clase al css y pinta el color de diferente manera */
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    /* COn esta funcon quitamos el color iluminado con la funcion iluminarColor */
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
       const nombreColor = ev.target.dataset.color
       const numeroColor = this.transformarColor(nombreColor)
       this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]) {
           this.subnivel++
           if(this.subnivel === this.nivel) {
               this.nivel++
               this.eliminarEventosClick()
               if(this.nivel === (ULTIMO_NIVEL + 1)) {
                   this.ganoElJuego()
               } else {
                   setTimeout(this.siguienteNivel, 1500)
               }
           }
       } else {
           this.perdioElJuego()
       }
    }
    ganoElJuego() {
        swal('Platzi Game', 'Felicitaciones ganaste!', 'success')
        .then(this.inicializar)
    }

    perdioElJuego() {
        swal('Platzi Game', 'Lo lamentamos perdiste :(', 'error')
        .then(() => {
            this.inicializar()
            this.eliminarEventosClick()
        })
    }
}

/* Creamos un nuevo objeto juego */
function empezarJuego() {
  window.juego = new Juego()
}
import { createStore } from 'redux';
import users from './users';
import swal from 'sweetalert';


const InitialState = {

    atras: false,
    showBalance: false,
    retirar: false,
    currentBalance: 0,
    montoRetirar: 0,
    auth: false

}

let ya_retiro = false;
let b = 0;
let ya_consulto = false;


const reducer = (state = InitialState, action) => {

    if (action.type === "SUBMIT_FORM") {

        return {
            auth: true,

        }
    }

    if (action.type === "ATRAS") {
        return {
            atras: true,
            auth: true


        }
    }

    if (action.type === "IR_RETIRAR") {

        if (!ya_consulto) {
            users.map(u => {
                console.log(action.type)

                if (u.id === parseInt(action.id)) {
                    b = u.balance;
                    console.log(b)
                }
            })
        }

        return {
            atras: false,
            auth: true,



        }

    }

    if (action.type === "RETIRAR_DINERO") {
        ya_retiro = true;


        let num = parseInt(action.monto);
        if (num > 0 && num <= b) {
            b = b - num;


            swal("Retiro Exitoso!", "Haz click en el botton!", "success");
            action.monto = 0;
            num = 0;
            console.log(action.monto + " " + num + " " + b)
            return {
                atras: true,
                auth: true,


            }

        } else if (num > b) {
            swal("Fondo Insuficiente!", "Haz click en el botton!", "error");
        }



    }

    if (action.type === "SHOW_BALANCE") {
        ya_consulto = true;
        console.log(b)
        if (!ya_retiro) {
            users.map(u => {
                console.log(u)

                if (u.id === parseInt(action.id)) {
                    b = u.balance;
                }
            })
        }

        return {

            showBalance: true,
            currentBalance: b,
            auth: true



        }
    }

    if (action.type === "SALIR") {

        ya_retiro = false;
        b = 0;
        ya_consulto = false;

        return {

            atras: false,
            showBalance: false,
            retirar: false,
            currentBalance: 0,
            montoRetirar: 0,
            auth: false

        }


    }






    return state;

}

export default createStore(reducer)
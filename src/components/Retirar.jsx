import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';


const validator = new SimpleReactValidator({forceUpdate: this});
let monto = 0

const RetirarDinero = ({Atras,atras,ya_retiro,Retirar,users,handleInputMonto,monto, id}) => {

    return (
        <div className="form-div">
            
            <h1>React ATM</h1>
            {atras  &&
                <Redirect to={"/redirect/"+id}></Redirect>
                
            }
            { ya_retiro &&
                <Redirect to={"/redirect/"+id}></Redirect>

            }
           

            <input type="number" name="monto" id="monto" className="form-control" id="exampleInputPassword1" onChange={(e) => handleInputMonto(e.target.value)} placeholder="Monto de Retiro" required />
            {validator.message('monto', monto , 'required|numeric')}

            
            <button className="btn btn-primary btnDash" value="Iniciar Sesion" onClick={() => Retirar(monto)}>Retirar</button>
            <button type="button" className="btn btn-primary btnDash" onClick={() => Atras()}>Atras</button>

        </div >
    )
}


const mapStateToProps = state => ({
    users: state.users,
    atras: state.atras,
    ya_retiro: state.yaRetiro
})

const mapDispatchToProps = dispatch => ({

    Atras(){
        dispatch({
            type: "ATRAS"
        })
        

    },

    Retirar(){
        dispatch({
            type: "RETIRAR_DINERO",
            monto
        })
            
    },

    handleInputMonto(val){
        monto = val;   
    }

    

})


export default connect(mapStateToProps, mapDispatchToProps)(RetirarDinero)
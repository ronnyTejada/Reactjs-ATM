import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'




const Dashboard=({id, users, clickShowBalance,showBalance, retirar, balance, auth, salir})=>{
        
        console.log(auth)

        return (
            

            <div className="form-div">
                
                <h1>React ATM</h1>
                {showBalance &&
                    <h3>{balance}$</h3>
                }
                {!showBalance && 
                    <h3>Benvenido elije una opcion</h3>
                }
                

                <div className="btns">
                    {!showBalance &&
                        <button type="button" className="btn btn-primary btnDash" onClick={() => clickShowBalance(id)}>Consultar Saldo</button>

                    }
                    <Link to={'/retirar/'+id}className="btn btn-primary btnDash" onClick={() => retirar(id)}>Retirar Dinero</Link>

                    <Link to={'/'} className="btn btn-primary btnDash"  onClick={() => salir()}>Salir</Link>
                        

                    
                </div>
            </div >
        )
    }


const mapStateToProps = state => ({
    users: state.users,
    atras: state.atras,
    showBalance: state.showBalance,
    retirar: state.retirar,
    balance: state.currentBalance,
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({

    clickShowBalance(id){
        dispatch({
            type: "SHOW_BALANCE",
            id
        })
    },

    retirar(id){
        dispatch({
            type: "IR_RETIRAR",
            id
        })
    },

    salir(){
        dispatch({
            type: "SALIR"
        })
    }

    
    

})


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)


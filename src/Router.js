import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/LoginAtm';
import Dashboard from './components/Dashboard';
import RetirarDinero from './components/Retirar';
import { connect } from 'react-redux'


class MyRouter extends Component {




    render() {


        return (

            <BrowserRouter>

                {/*configurar rutas */}

                <Switch>


                    <Route exact path="/" component={Login} />

                    

                    {this.props.authenticated &&
                        <React.Fragment>
                            <Route exact path="/dashboard/:id" render={
                                (props) => {
                                    return (<Dashboard id={props.match.params.id} />)
                                }

                            } />

                            <Route exact path="/retirar/:id" render={
                                (props) => {
                                    return (<RetirarDinero id={props.match.params.id} />)
                                }

                            } />

                            <Route exact path="/redirect/:id" render={
                                (props) => {
                                    const id = props.match.params.id;
                                    return <Redirect to={'/dashboard/' + id} />
                                }
                            } />

                        </React.Fragment>


                    }
                    {!this.props.authenticated &&

                        <Redirect to={'/'}/>
                       
                    }
                    


                </Switch>
            </BrowserRouter>
        )
    }
}


const mapStateToProps = state => ({
    authenticated: state.auth
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MyRouter)
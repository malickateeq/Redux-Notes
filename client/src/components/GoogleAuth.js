import React, { Component } from 'react';
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends Component 
{
    componentDidMount()
    {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: '149555853147-vv0bn8s6o5bslbq0e8qqhmfv9j1d06g4.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen( this.onAuthChange() );
            }).catch( () => {
                console.error("Failed!!!");
            });
        });
    }

    onSignInClick = () =>
    {
        this.auth.signIn();
    }
    onSignOutClick = () =>
    {
        this.auth.signOut();
    }
    
    onAuthChange = isSignedIn =>
    {
        if(isSignedIn)
        {
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else
        {
            this.props.signOut();
        }
    }

    renderAuthButton = () =>
    {
        if(this.props.isSignedIn === null)
        {
            return (
                <div className="btn btn-outline-primary">
                    null
                </div>
            );
        }
        else if(this.props.isSignedIn)
        {
            return (
                <button onClick={ () => this.onSignOutClick() } className="btn btn-outline-danger">
                    G+ Sign Out
                </button>
            );
        }
        else
        {
            return (
                <button onClick={ () => this.onSignInClick() } className="btn btn-outline-primary">
                    G+ Sign In
                </button>
            );
        }
    }
    render() {
        return (
            <div>
                { this.renderAuthButton() }
            </div>
        )
    }
}

const mapStateToProps = (state) =>
{
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
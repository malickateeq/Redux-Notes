import React, { Component } from 'react'

export default class GoogleAuth extends Component 
{
    state = { isSignedIn: null };

    onAuthChange()
    {
        this.setState( {isSignedIn: this.auth.isSignedIn.get()} );
    }

    componentDidMount()
    {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: '149555853147-vv0bn8s6o5bslbq0e8qqhmfv9j1d06g4.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen( this.onAuthChange );
            });
        });
    }
    onSignInClick ()
    {
        this.auth.signIn();
    }
    onSignOutClick()
    {
        this.auth.signOut();
    }
    renderAuthButton()
    {
        if(this.state.isSignedIn === null)
        {
            return (
                <div className="btn btn-outline-primary">
                    null
                </div>
            );
        }
        else if(this.state.isSignedIn === true)
        {
            return (
                <button onClick={ ()=>{ this.onSignOutClick() } } className="btn btn-outline-danger">
                    G+ Sign Out
                </button>
            );
        }
        else
        {
            return (
                <button onClick={ ()=>{ this.onSignInClick() } } className="btn btn-outline-primary">
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

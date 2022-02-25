import React, {Component} from 'react';

class Login extends Component {
    constructor() {
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    performSubmit(event) {
        
            
    }

    render() {
        return (
            <form onSubmit={this.performSubmit}>
                
            </form>
        )
    }
}
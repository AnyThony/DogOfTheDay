import React, { Component } from 'react';
class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        // Tells React what HTML code to render
        return (
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo center">Vote for the Goodest Boy</a>
                </div>
            </nav>
        );
    }
}

export default NavBar

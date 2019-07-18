import React, {Component} from 'react';
import { isEmpty } from '../../../helper';

import './Alert.css';

class Alert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activate: false
        }
        this.clearSetTimout = null;
    }

    componentDidMount() {
        this.setState(
            {activate: true}
        );

        this.clearSetTimout = setTimeout(() => {
            this.onCloseAlert()
        }, 10000);
    }

    onCloseAlert = () => {
        const { alertClose } = this.props;
        this.setState({
            activate: false
        });

        if (!isEmpty(alertClose) ) alertClose();
    }

    componentWillUnmount() {
        // Clear the auto setTime Out
        clearTimeout(this.clearSetTimout);
    }

    render() {
        const {type, message, } = this.props;
        const { activate } = this.state;
        return (
            <div className={`alert alert-${type} ${activate ? 'active': ''}`}>
                <div className="alert-modal">
                    <div className="alert-message-wrapper">
                        <div className="alert-message">
                            {message}
                        </div>
                    </div>
                    <div className="alert-close" onClick={this.onCloseAlert}>
                        <span className="alert-close">&times;</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alert;
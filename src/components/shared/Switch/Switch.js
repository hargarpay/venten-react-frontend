import React, { Component } from 'react';
import './Switch.css';
import { isEmpty } from '../../../helper';

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // switchOn: false
         }
    }

    onSwitchHandler = () => {
        const { onSwitch, } = this.props;
        // const { switchOn } = this.state;
        // this.setState({switchOn: !switchOn})
        if (!isEmpty(onSwitch)) onSwitch('select');
    }

    render() { 
        const { status } = this.props;
        return ( 
            <div className="controls">
                <div className={`slider ${status ? 'active' : ''}`} onClick={this.onSwitchHandler}><span className={`dot-slider ${status ? 'active' : ''}`}></span></div>
            </div>
         )
    }
}
 
export default Switch;

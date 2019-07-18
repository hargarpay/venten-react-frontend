import React from 'react';
import { isEmpty } from '../../../../helper';

function InputForm(props) {
    const  {label, name, type, change, input, inputClass, readonly} = props;
    return (
        <div className={`field ${!input.valid && input.touch ? 'danger' : ''}`}>
            <div className="controls">
                <label htmlFor="">{label}</label>
                {
                    type !== 'textarea'
                    ? (
                        <div className="input">
                            <input 
                                type={type} 
                                placeholder={label} 
                                name={name} 
                                className={isEmpty(inputClass) ? '' : inputClass}
                                onChange={(event) => change(event)}
                                value={input.value}
                                readOnly={readonly}
                            />
                        </div>
                    )
                    : (
                        <div className="textarea">
                            <textarea
                                name={name}
                                id=""
                                cols="30"
                                rows="5"
                                onChange={(event) => change(event)} placeholder={label}
                                value={input.value} 
                            />
                        </div>
                    )
                }
                
            </div>
            {
                !input.valid && input.touch 
                ? (<span className="help-block"> {input.message} </span>)
                : null
            }
        </div>
    );
}

export default InputForm;
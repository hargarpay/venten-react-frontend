import React, { Component } from 'react';
import InputForm from './InputForm/InputForm';
import Validator from '../../../helper/validator';
import { isEmpty, deepPropsExist, getDeepObjValue, isEqual } from '../../../helper'
import Modal from '../../shared/Modal/Modal';
import Alert from '../../shared/Alert/Alert';


const initialFormState = {
    name: {
        value: '',
        validation: ['required', 'min_length:3'],
        valid: false,
        touch: false,
        message: '',
    },
    description: {
        value: '',
        validation: ['required', 'min_length:10'],
        valid: false,
        touch: false,
        message: '',
    },
    price: {
        value: '',
        validation: ['required', 'is_numeric'],
        valid: false,
        touch: false,
        message: '',
    },
    color: {
        value: '#000000',
        validation: ['required', 'min_length:2'],
        valid: false,
        touch: false,
        message: '',
    },
    category: {
        value: '',
        validation: ['required', 'min_length:2'],
        valid: false,
        touch: false,
        message: '',
    },
    image: {
        value: '',
        validation: ['required', 'min_length:2'],
        valid: false,
        touch: false,
        message: '',
    }
};

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            form : initialFormState,
            loading: false,
            showAlert: false,
            type: 'success',
            message: '',
         };
         this.validate = new Validator();
         this.errors = {};
    }

    checkValidation = (name, value) => {
        this.validate.make({[name]: value}, {[name]: this.state.form[name].validation});
        const errors = this.validate.getErrors();
        const valid = isEmpty(errors[name]);
        const message = valid === false ? errors[name] : '';
        return ({valid, message});
    }

    onHandleChange = (event) => {
        const { value, name } = event.target;
        const form = this.state.form;
        const currentInput = form[name];
        const { valid, message } = this.checkValidation(name, value);
        const currentForm = {...form, ...{[name] : {...currentInput, ...{ value, touch: true, valid, message}}}};
        this.setState({form: currentForm});
    }

    onGetImageURL = (imgURL) => {
        const form = this.state.form;
        const currentInput = form.image;
        const currentForm = {...form, ...{image : {...currentInput, ...{ value: imgURL, touch: true, valid: true, message: ''}}}};
        this.setState({form: currentForm});
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.newProduct, nextProps.newProduct)) {
            if (nextProps.newProduct.success) {
                this.setState({
                    loading: false,
                    showAlert: true,
                    type: 'success',
                    message: 'You have successfully created product',
                    form: initialFormState
                });
            }
        }
    }
    

    onSubmit = () => {
        const payload = {};
        let invalidForm = {};
        let status = true;
        Object.keys(this.state.form).forEach(name => {
            const currentInput = this.state.form[name];
            const { valid, message } = this.checkValidation(name, currentInput.value);
            if (!valid) {
                status = false;
                invalidForm = {...invalidForm, ...{[name] : {...currentInput, ...{ touch: true, valid, message}}}};
            } 
            payload[name] = this.state.form[name].value;
        });

        if(status){
            const { onAddProduct } = this.props;
            this.setState({loading: true});
            onAddProduct(payload)

        } else {
            const { form } = this.state;
            const newForm = {...form, ...invalidForm};
            const showAlert = deepPropsExist(invalidForm, 'image');
            this.setState({
                form: newForm,
                showAlert,
                type: 'danger',
                message: getDeepObjValue(invalidForm, 'image', 'message')
            });
        }
    }

    onCloseAlert = () => {
        this.setState({showAlert: false})
    }

    render() { 
        const { form, loading, showAlert, type, message } = this.state;
        return (
            <>
            {
                showAlert ? (
                <Alert type={type} message={message} alertClose={this.onCloseAlert} />
                ) : null
            }
            <div className="col-8 paddingless-top paddingless-left paddingless-right bg-light-grey col-offset-2">
                <div className="cols">
                    <div className="col-12 bg-blue">
                        <h3 className="marginless">Create Product</h3>
                    </div>
                    <div className="col-12">
                        <div className="cols">
                            <div className="col-12 paddingless-top">
                                <form>
                                    <InputForm
                                        type="text"
                                        name="name"
                                        label="Product Name"
                                        input={form.name}
                                        change={this.onHandleChange}
                                    />
                                    <InputForm
                                        type="text"
                                        name="price"
                                        label="Product Price"
                                        input={form.price}
                                        change={this.onHandleChange}
                                    />
                                    <InputForm
                                        type="text"
                                        name="category"
                                        label="Product Category"
                                        input={form.category}
                                        change={this.onHandleChange}
                                    />
                                    <Modal {...this.props} onGetImageURL={this.onGetImageURL} label="Product Image"/>
                                    <InputForm
                                        type="color"
                                        name="color"
                                        label="Product Color"
                                        input={form.color}
                                        change={this.onHandleChange}
                                    />
                                    <InputForm
                                        type="textarea"
                                        name="description"
                                        label="Product Description"
                                        input={form.description}
                                        change={this.onHandleChange}
                                    />
                                    <div className="field">
                                        <div className="controls">
                                            <button
                                                type="button"
                                                className={`button bg-blue loading ${loading ? 'running' : ''}`}
                                                onClick={this.onSubmit}
                                                
                                            > 
                                                Create Product
                                                <span className="spin"></span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>

         );
    }
}
 
export default CreateProduct;
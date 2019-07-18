import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionProduct from "../store/action/product";
import * as actionImage from "../store/action/image";
import CreateProduct from '../components/Product/CreateProduct/CreateProduct';

class CreateProductContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <CreateProduct {...this.props} />
          )
    }
}

const mapStateToProps = state => {
    return {
        newProduct: state.rProd.newProduct,
        products: state.rProd.products,
        product: state.rProd.product,
        image: state.rImg.image,
        images: state.rImg.images,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddImage: (payload) => dispatch(actionImage.onAddImage(payload)),
        onGetImages: () => dispatch(actionImage.onGetImages()),
        onAddProduct: (payload) => dispatch(actionProduct.onAddProduct(payload)),
        onGetProducts: () => dispatch(actionProduct.onGetProducts()),
        onGetProduct: (payload) => dispatch(actionProduct.onGetProduct(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductContainer);


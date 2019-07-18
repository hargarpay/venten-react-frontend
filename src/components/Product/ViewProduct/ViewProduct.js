import React, { Component } from 'react';
import { isEqual } from '../../../helper';
import './ViewProduct.css';

class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fetchProduct: false,
            product: {} 
         }
    }

    componentDidMount(){
        const {match, onGetProduct} = this.props;
        const productId = match.params.id;
        onGetProduct(productId);
        this.setState({fetchProduct: true});
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.product, nextProps.product)) {
            const {success, data} = nextProps.product;
            if (success) {
                const newProduct = {...data};
                this.setState({
                    product: newProduct,
                    fetchProduct: false
                });
            }
        }
    }
    render() { 
    const { fetchProduct, product} = this.state;
        return (<> {
            fetchProduct === false ? (
                <section className="p40">
                    <div className="container">
                        <div className="cols">
                            <div className="col-6">
                                <div className="product-thumbnails is-fullwidth">
                                    <div className="product-main-thumbnail">
                                        <img src={product.image} className="img-responsive" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="cols">
                                    <div className="col-12 paddingless-top paddingless-left">
                                        <h2 className="marginless">{product.name}</h2>
                                        <h5 className="marginless-top is-uppercase">{product.category}</h5>
                                    </div>
                                    <div className="col-12 paddingless-top">
                                        <h4 className="marginless">Description</h4>
                                        <div className="content">
                                            <p className="marginless text-grey text-justify">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="cols flex-space-between-not-mobile mobile-text-center flex-row-mobile">
                                    <div className="col-6 col-xs-6 mobile-paddingless-bottom">
                                        <h2 className="tablet-up-marginless-left tablet-up-marginless-right tablet-up-marginless-bottom tablet-up-mt25em mobile-marginless">$ {product.price}</h2>
                                    </div>
                                    <div className="col-6  col-xs-6 mobile-paddingless-bottom flex-space-middle">
                                        <h6 className="marginless is-uppercase"> Product Color</h6> <div className="product-color" style={{backgroundColor: product.color}}></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            ) : <p> Loading Product </p>
        }
        </>)
    }
}
 
export default ViewProduct;

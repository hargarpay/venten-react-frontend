import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import './ViewProducts.css';
import { isEqual } from '../../../helper';

class ViewProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: []
         }
    }

    componentDidMount() {
        const { onGetProducts } = this.props;
        onGetProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.products, nextProps.products)) {
            const { data } = nextProps.products;
            const newProducts = [...data];
            this.setState({products: newProducts});
        }
    }
    render() { 
        const { products } = this.state;
        return ( 
            <>
                <div className="col-8 paddingless-top paddingless-left paddingless-right bg-light-grey col-offset-2">
                    <div className="cols">
                    <div className="col-12 paddingless-top paddingless-left paddingless-right bg-light-grey">
                                <div className="cols">
                                    <div className="col-12 flex-space-between bg-light-grey flex-align-center">
                                        <h3 className="marginless">View Products</h3>
                                    </div>
                                    <div className="col-12">
                                        <div className="cols">
                                            <div className="col-12 paddingless-top">
                                                <div className="table">
                                                    <table className="serial">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Name</th>
                                                                <th>Price</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                products.length > 0 ? (
                                                                    products.map(product => (
                                                                        <tr key={product.id}>
                                                                            <td data-title="ID">{product.id}</td>
                                                                            <td data-title="Name">{product.name}</td>
                                                                            <td data-title="Price"> {product.price} </td>
                                                                            <td className="text-center">
                                                                                <button type="button" className="button link bg-blue dilb paddingless bdr-color-blue">
                                                                                    <Link to={`/product/${product.id}`}>
                                                                                        View
                                                                                    </Link>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : null
                                                            }
                                                            
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </>
         )
    }
}
 
export default ViewProducts;
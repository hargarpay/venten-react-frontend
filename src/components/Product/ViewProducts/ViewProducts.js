import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import './ViewProducts.css';
import { isEqual } from '../../../helper';
import Table from '../../shared/Table/Table';

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

    onActionHander = (product) => (
    <td className="text-center">
            <button type="button" className="button link bg-blue dilb paddingless bdr-color-blue">
                <Link to={`/product/${product.id}`}>
                    View
                </Link>
            </button>
        </td>
    )
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
                                                {
                                                    <Table
                                                        tableHead={
                                                            {
                                                                id: 'ID',
                                                                name: 'Name',
                                                                price: 'Price'
                                                            }
                                                        }
                                                        dataTable={products}
                                                        fieldKey="id"
                                                        action
                                                        onActionHander={this.onActionHander}
                                                    />
                                                }
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
import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { tableHead, dataTable, fieldKey, action, onActionHander} = this.props;
        return ( 
        <div className="table">
            <table className="serial">
            <thead>
                <tr>
                    {
                        Object.keys(tableHead).map(key => (
                            <th key={`${tableHead[key]}-0`}>{tableHead[key]}</th>
                        ))
                    }
                    {   
                        action ? <th> Actions </th> : null
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dataTable.length > 0 ? (
                        dataTable.map((data) => (
                            <tr key={data[fieldKey]}>
                               {
                                   Object.keys(tableHead).map((key) => (
                                    <td key={`${tableHead[key]}}-${data[fieldKey]}`} data-title={tableHead[key]}>{data[key]}</td>
                                ))
                               }
                               {
                                   action ? onActionHander(data) : null
                               }
                            </tr>
                        ))
                    ) : null
                }
                
            </tbody>
        </table>
    </div>
         );
    }
}
 
export default Table;
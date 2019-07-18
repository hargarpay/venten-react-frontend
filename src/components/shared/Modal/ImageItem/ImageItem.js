import React from 'react';

function ImageItem (props) {
        const {image, current, onClickHandler} = props;
        return ( 
            <div className="col-3 col-xs-4 col-sm-4 col-md-3" onClick={() => onClickHandler(image)}>
                <div className={`attachment-preview ${current === image.version ? 'active': ''}`}>
                    {
                        current === image.version ? (
                            <span className="checkbox icon">
                                <span className="checkbox-stem"></span>
                                <span className="checkbox-kick"></span>
                            </span>
                        ): null
                    }
                    
                    <div className="thumbnail">
                        <div className="center">
                            <img src={image.url} alt="" />
                        </div>
                    </div>
                </div>
            </div>
         )
}
 
export default ImageItem;
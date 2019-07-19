import React, { Component } from 'react';
import './Modal.css';
import ImageItem from './ImageItem/ImageItem';
import { getDeepObjValue, isEmpty, isEqual, deepPropsExist } from '../../../helper';
import FileUploader from './FileUploader/FileUploader';
import Alert from '../Alert/Alert';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentView: 'select',
            currentImage: null,
            mobileClose: false,
            mediaClose: true,
            imageURL: '',
            imageLists: [],
            showAlert: false,
            type: 'danger',
            message: ''
         }
    }

    componentDidMount() {
        const { onGetImages } = this.props;
        onGetImages();
    }

    componentWillReceiveProps(nextProps){
        if (!isEqual(this.props.images, nextProps.images)) {
            const imgLists =  nextProps.images
            if (imgLists.success) {
                const { resources } = imgLists.data;
                const newImagLists = [...resources];
                this.setState({imageLists: newImagLists});
            }
        }

        if (
            !isEqual(this.props.image, nextProps.image)
        && deepPropsExist(nextProps, 'image', 'data')
        && typeof nextProps.image.data === 'object') {
            const { imageLists } = this.state;
            const newImageLists = [nextProps.image.data].concat(imageLists);
            this.setState({imageLists: newImageLists});
        }
    }

    changeView = (view) => {
        this.setState({currentView: view});
    }

    onClickHandler = (image) => {
        this.setState({currentImage: image});
        const { mobileClose } = this.state;
        if(mobileClose){
            this.onCloseMobileInfo(false);
        }
    }
    onCloseMobileInfo = (status) => {
        this.setState({mobileClose: status})
    }

    onMediaClose = (status) => {
        this.setState({mediaClose: status});
    }

    onSelectImage = () => {
        const { currentImage } = this.state;
        const { onGetImageURL } = this.props;
        if(isEmpty(currentImage)){
            // alert
            this.setState({
                showAlert: true,
                type: 'danger',
                message: 'You have not selected any image'
            });
        }else{
            this.setState({
                imageURL: currentImage.url,
                mediaClose: true
            });
            onGetImageURL(currentImage.url);
        }
    }

    onCloseAlert = () => {
        this.setState({
            showAlert: false
        })
    }


    render() { 
        const {
            currentView, currentImage, mobileClose, mediaClose, imageLists,
            showAlert, type, message
         } = this.state;
        const { label, input } = this.props;
        return (
            <>
            {
                showAlert ? <Alert type={type} message={message} alertClose={this.onCloseAlert}/> : null
            }
            <div className={`modal ${ !mediaClose ? 'active' : ''}`}>
                <div className="modal-inner">
                    <div className="modal-header">
                        <header>
                            <h6 className="marginless">Add Media</h6>
                        </header>
                        <div className="close" onClick={() => this.onMediaClose(true)}>
                            <span className="close">&times;</span>
                        </div>
                    </div>
                    <div className="modal-content paddingless minus-mt2">
                        <div className="cols pr-mobile">
                            <div className="col-8 paddingless pages">
                                <div className="cols bg-c-grey">
                                    <div className="col-12 paddingless mobile-marginless-bottom">
                                        <div className={`inner-page-menu ${currentView === 'select' ? 'active' : ''}`} onClick={() => this.changeView('select')}>
                                            Select Media
                                        </div>
                                        <div className={`inner-page-menu ${currentView === 'upload' ? 'active' : ''}`} onClick={() => this.changeView('upload')}>
                                            Upload Media
                                        </div>
                                    </div>
                                </div>
                                <div className="cols">
                                    <div className="col-12 paddingless-right">
                                        <div className="inner-page-lists">
                                            <div className={`inner-page  ${currentView === 'select' ? 'active' : ''}`}>
                                                <div className="cols mobile">
                                                    {
                                                        imageLists.map(imageItem => (
                                                            <ImageItem
                                                                key={imageItem.version}
                                                                current={getDeepObjValue(currentImage, 'version')}
                                                                image={imageItem}
                                                                onClickHandler={this.onClickHandler}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className={`inner-page flex-center ${currentView === 'upload' ? 'active' : ''}`}>
                                                <div className="cols">
                                                    <FileUploader {...this.props} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-4 paddingless bg-light-grey sidebar-scroller mobile-view-info mobile-marginless-bottom ${mobileClose ? 'close' : ''}`}>
                                <div className="cols">
                                    {
                                        isEmpty(currentImage)
                                        ? (<p> No Image has been selected </p>)
                                        : (
                                            <>
                                                <div className="col-12">
                                                    <img src={currentImage.url} alt="" className="img-responsive" />
                                                </div>
                                                <div className="col-12 paddingless-top paddingless-bottom">
                                                    {/* <div className="divider"></div> */}
                                                </div>
                                                <div className="col-12">
                                                    <div className="cols">
                                                        <div className="col-12 paddingless">
                                                            <h4 className="marginless">Media Description</h4>
                                                        </div>
                                                    </div>
                                                    <div className="divider"></div>
                                                    <div className="cols">
                                                        <div className="col-12 paddingless-top">
                                                            <h5 className="marginless is-uppercase">Image Name:</h5>
                                                            <p className="marginless-top">{currentImage.public_id.replace('venten/', '')}</p>
                                                            <div className="divider"></div>
                                                            <h5 className="marginless  is-uppercase">Image Demension:</h5>
                                                            <p className="marginless-top">{currentImage.width}x{currentImage.height}</p>
                                                            <div className="divider"></div>
                                                            <h5 className="marginless  is-uppercase">Image Size:</h5>
                                                            <p className="marginless-top">{((currentImage.bytes / (1024 * 1024)) >= 1.00) 
                                                            ? `${(currentImage.bytes / (1024 * 1024)).toFixed(2)} MB`
                                                            :`${(currentImage.bytes / 1024).toFixed(2)} KB`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="flex-space-between flex-align-center">
                            <div className="">
                                <button onClick={() => this.onCloseMobileInfo(true)} type="button" className="button init-width bg-dark-peach close-info-view open">Close Preview</button>
                            </div>
                            <div className="select-image">
                                <button onClick={this.onSelectImage} type="button" className="button init-width bg-blue">Select File</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="field marginless-bottom">
                <div className="controls">
                    <label htmlFor="">{label}</label>
                </div>
            </div>
            <div className="field addon">
                <div className="control flex-4">
                    <div className="input is-fullheight">
                        <input type="text" value={input.value} className="is-fullheight radiusless-tr-br" readOnly placeholder="Click the button to slect Image" />
                    </div>
                </div>
                <div className="control flex-1">
                    <button onClick={() => this.onMediaClose(false)} type="button" className="button bg-dark-peach image-manager-opener bdr-color-dark-peach radiusless-tl-bl"> Select Image </button>
                </div>
            </div>
            </>

         )
    }
}
 
export default Modal;
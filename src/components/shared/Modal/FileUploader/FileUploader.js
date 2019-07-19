import React, { Component } from 'react';
import { isEmpty, rtrim, isEqual } from '../../../../helper';
import Alert from '../../Alert/Alert';

class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fileUpload: null,
            buttonStatus: 'select',
            loading: false,
            progress: 0,
            filenameView: '',
            showAlert: false,
            type: 'success',
            message: ''
         }
         this.sliceSize = 50 * 1024;
         this.currentFile = null;
         this.extension = null;
         this.start = 0;
         this.filename = '';
    }


    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.image, nextProps.image)) {
            const { success } = nextProps.image
            if(success){
                if ( (this.start + this.sliceSize + 1) < this.currentFile.size ) {
                    // Update upload progress
                    const size_done = this.start + this.sliceSize;
                    const percent_done = Math.floor( ( size_done / this.currentFile.size ) * 100 );
                    this.setState({progress: percent_done});
                    this.start = this.start + this.sliceSize + 1;
                    this.renderPDFtoBase64();
                } else {
                    this.setState({
                        progress: 100,
                        loading: false,
                        showAlert: true,
                        buttonStatus: 'select',
                        type: 'success',
                        message: 'Image Successfully uploaded'
                    });
                    console.log(nextProps.image);
                }
            } else {
                this.setState({
                    progress: 0,
                    loading: false,
                    buttonStatus: 'select',
                    showAlert: true,
                    type: 'danger',
                    message: nextProps.image.error
                });
            }
        }
    }

    onUploadImage = () => {
        this.setState({loading: true});
        this.renderPDFtoBase64();
    }

    fileInputRef = (element) => {
        if(element !== null){
            this.setState({
                fileUpload: element
            });
        }
    }

    fileUploadHandler = () => {
        const { fileUpload } = this.state;
        fileUpload.click();
    }

    fileUploadChangeHandler = (event) => {
       this.currentFile = event.target.files[0];
       this.fileDocProcessing();
    }

    fileDocProcessing = () => {
        const file = this.currentFile;
        if(isEmpty(file)){
            this.setState({
                showAlert: true,
                type: 'danger',
                message: "You have not selected any file"
            });
            return false;
        }

        const ext = this.getFileExtenstion(file.name)
        if(!this.allowedExtension(["jpg", 'jpeg', 'png'], ext)){
            this.setState({
                showAlert: true,
                type: 'danger',
                message: "only jpg, jpeg and png document is allowed"
            });
            return false;
        }

        this.extension = ext;
        const filename = rtrim(`${file.name}`.toLowerCase(), `.${ext}`)
                        .replace(/(\.\/\s+)/, '-');
        this.filename = `${filename}-${+new Date()}`;

        this.setState({buttonStatus: 'upload', filenameView: filename});

    }

    getFileExtenstion = (filename) => {
        return filename.split(".").pop().toLowerCase();
    }

    allowedExtension = (allowExts, fileExt) => {
        return allowExts.indexOf(fileExt)  > -1;
    }

    renderPDFtoBase64 = () => {
        const file = this.currentFile;
        const { onAddImage } = this.props;
        const reader = new FileReader();
        const next_slice = this.start + this.sliceSize + 1;
        const blob = file.slice( this.start, next_slice );
        const base64CodeSize = this.currentFile.size;

        reader.onload = (e) => {
            if ( e.target.readyState !== FileReader.DONE ) {
                return;
            }
            const fileData = e.target.result;
            const uploading = (this.start + this.sliceSize) < base64CodeSize ? true : false; 
            const payload = {
                fileData,
                filename: this.filename,
                start: this.start,
                extension: this.extension,
                uploading
            }
            onAddImage(payload);
        }

        reader.readAsDataURL(blob);
    }

    onCloseAlert = () => {
        this.setState({
            showAlert: false,
        })
    }
         

    render() { 
        const { buttonStatus, loading, progress, filenameView, showAlert, type, message } = this.state;


        return ( 
        <>
        {
            showAlert ? <Alert type={type} message={message} alertClose={this.onCloseAlert}/> : null
        }
        <div className="col-12 flex-center">
            <div className="field">
                <div className="controls">
                    <div className="input mw250">
                        <input
                            type="file"
                            className="dn"
                            id="file-input"
                            ref={this.fileInputRef} 
                            onChange={(event) => this.fileUploadChangeHandler(event)}
                        />
                        <h5 className="text-center marginless-top">{filenameView}</h5>
                        <button 
                            onClick={ 
                                buttonStatus === 'select' 
                                ? (() => this.fileUploadHandler()) :  
                                (() => this.onUploadImage())}
                            type="button"
                            className={`button  ${buttonStatus === 'select' ? 'bg-blue' : 'bg-dark-peach'} is-fullwidth file-upload loading ${loading ? 'running' : ''}`}>
                                {buttonStatus === 'select' ? 'Select File' : 'Upload File'}
                                <span className="spin"></span>
                            </button>
                    </div>
                </div>
                <progress value={`${progress}`} max="100" className="is-fullwidth"></progress>
                <h2 className="text-center marginless-top">{progress} %</h2>
            </div>
        </div>
        </>
        )
    }
}
 
export default FileUploader;
import React from "react";

import Dropzone from "react-dropzone";

/* File must be referenced by valid MIME type */
const acceptedFileType = "application/pdf";

class DragNDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: null
        };
    }

    render() {
        const { imageSource } = this.state;
        return (
            <div>
                {imageSource !== null ? <img src={imageSource} /> : ""}
                <Dropzone accept={acceptedFileType} onDrop={this._handleOnDrop}>
                    <br />
                    <span>Drop your PDF here!</span>
                </Dropzone>
                {/* <Image publicId="gxhyfftrqogxjf7yupuo.jpg" /> */}
            </div>
        );
    }

    _verifyFile = acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const currentAcceptFile = acceptedFiles[0];
            const currentAcceptFileType = currentAcceptFile.type;
            if (currentAcceptFileType != "application/pdf") {
                alert("This is not a PDF");
                return false;
            }
        }
        return true;
    };

    _handleOnDrop = (acceptedFiles, rejectedFiles) => {
        console.log("Accepted ", acceptedFiles);
        console.log("Rejected ", rejectedFiles);

        if (rejectedFiles && rejectedFiles.length > 0) {
            this._verifyFile(rejectedFiles);
        }

        if (acceptedFiles && acceptedFiles.length > 0) {
            const isVeryfied = this._verifyFile(acceptedFiles);
            if (isVeryfied) {
                /* get Base64 Data */
                const currentAcceptFile = acceptedFiles[0];
                const reader = new FileReader();
            }
        }
    };
}

export default DragNDrop;

import React from "react";

import Dropzone from "react-dropzone";

/* File must be referenced by valid MIME type */
const acceptedFileType = "application/pdf";

class DragNDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendFiles: [],
            previewFiles: []
        };
    }

    render() {
        return (
            <div>
                <Dropzone accept={acceptedFileType} onDrop={this._handleOnDrop}>
                    <br />
                    <span>Drop your PDF files here!</span>
                </Dropzone>
                <br />
                <div>
                    Your uploaded files are:
                    {this.state.previewFiles}
                </div>
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

        console.log("Accepted files: ", acceptedFiles[0].name);

        if (rejectedFiles && rejectedFiles.length > 0) {
            this._verifyFile(rejectedFiles);
        }

        if (acceptedFiles && acceptedFiles.length > 0) {
            const isVeryfied = this._verifyFile(acceptedFiles);
            if (isVeryfied) {
                const sendFiles = this.state.sendFiles;
                sendFiles.push(acceptedFiles);
                const previewFiles = sendFiles.map((file, index) => (
                    <div key={index}>{file[0].name}</div>
                ));

                console.log("PREVIEW FILES ARRAY", previewFiles);

                this.setState({ sendFiles, previewFiles });
            }
        }
    };
}

export default DragNDrop;

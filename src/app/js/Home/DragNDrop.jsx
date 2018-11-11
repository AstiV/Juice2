import React from "react";

import Dropzone from "react-dropzone";

import api from "../utils/api";
import { image } from "cloudinary";

/* File must be referenced by valid MIME type */
const acceptedFileType = "application/pdf";

class DragNDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendFiles: [],
            previewFiles: [],
            imageSource: null
        };
    }

    render() {
        const { imageSource } = this.state;
        return (
            <div>
                {imageSource && <img src={imageSource} />}

                <Dropzone accept={acceptedFileType} onDrop={this._handleOnDrop}>
                    <br />
                    <span>Drop your PDF files here!</span>
                </Dropzone>
                <br />

                {/* <button className="button" onClick={this._handleOnClick}>
                    Upload
                </button> */}
                <br />
                <br />
                <div>
                    You dropped the following files:
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

                // Get Base64 Data for preview
                const currentFile = acceptedFiles[0];
                const reader = new FileReader();

                reader.addEventListener(
                    "load",
                    () => {
                        console.log(reader.result);
                        this.setState({
                            imageSource: reader.result
                        });
                    },
                    false
                );
                reader.readAsDataURL(currentFile);

                // reader.onload = () => {
                //     const fileAsBinaryString = reader.result;
                //     console.log(fileAsBinaryString);
                // };
                // reader.onabort = () => console.log("file reading was aborted");
                // reader.onerror = () => console.log("file reading has failed");

                // reader.readAsBinaryString(file[index]);

                // console.log("PREVIEW FILES ARRAY", previewFiles);
                // console.log("FILES TO SEND ARRAY", sendFiles);

                this.setState({ sendFiles, previewFiles });
            }
        }
    };

    _handleOnClick = () => {
        console.log("Hello from handle On click!");
        console.log("Hopefully SendFiles Array from state: ", this.state.sendFiles);

        const xy = this.state.sendFiles;
        const xyz = xy.map((file, index) => console.log("All FILES Logged, yay ", file[index]));

        api.post("/api/pdf/new", { sendFiles: this.state.sendFiles })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                this.setState({
                    error: err.description
                });
            });
    };
}

export default DragNDrop;

// // 4. post request with files
// api.post('/api/artwork/new', { name: 'Whatever' }, { artworkPicture: this.state.artworkPicture }).then(
//     // use req.files.artworkPicture in the BACKEND
//     data => {
//         console.log(data)
//     }
// )

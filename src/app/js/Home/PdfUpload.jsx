import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.parcel";

import api from "../utils/api";

const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true
};

class PdfUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdf: undefined,
            numPages: null
        };

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);

        console.log("STATE: ", this.state.pdf);
    }

    render() {
        const { pdf, numPages } = this.state;

        return (
            <div>
                <input
                    type="file"
                    value={this.pdf}
                    onChange={evt => this._handleInputChange("pdf", evt.target.files[0])}
                    className="input"
                    placeholder="PDF"
                />
                <br />
                <br />
                <button className="button" onClick={this._handleSubmit}>
                    SUBMIT
                </button>
                <br />
                <br />
                {this.state.pdf && (
                    <div className="document">
                        <Document
                            file={pdf}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            options={options}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                            ))}
                        </Document>
                    </div>
                )}
            </div>
        );
    }

    _handleInputChange(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }

    _handleSubmit(e) {
        e.preventDefault();
        const data = { ...this.state };
        delete data.pdf;

        const pdfs = this.state.pdf ? { pdf: this.state.pdf } : undefined;

        api.post("/api/pdf/new", pdfs)
            .then(result => {
                console.log(result);
                localStorage.setItem("identity", result.token);
                this.props.setUser();
            })
            .catch(err => {
                console.log(err.description);
            });
    }

    // // 4. post request with files
    // api.post('/api/artwork/new', { name: 'Whatever' }, { artworkPicture: this.state.artworkPicture }).then(
    //     // use req.files.artworkPicture in the BACKEND
    //     data => {
    //         console.log(data)
    //     }
    // )
}

export default PdfUpload;

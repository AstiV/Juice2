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
        console.log("DATA ", data);
        // delete data.pdf;
        // console.log("DATA AFTER DELETE ", data);

        const pdfs = this.state.pdf ? { pdf: this.state.pdf } : undefined;

        console.log("PDFs ", pdfs);

        api.post("/api/pdf/new", pdfs)
            .then(result => {
                console.log("RESULT ", result);
                localStorage.setItem("identity", result.token);
                this.props.setUser();
            })
            .catch(err => {
                console.log(err.description);
            });
    }
}

export default PdfUpload;

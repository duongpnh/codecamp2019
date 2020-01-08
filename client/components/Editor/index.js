import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss';

class Editor extends Component {
    
    constructor (props) {
        super(props)
        this.state = { editorHtml: '', theme: 'snow' }
        this.handleChange = this.handleChange.bind(this)
    }
      
    handleChange (html) {
        this.setState({ editorHtml: html });
        this.props.onTextChange(html);
    }
      
    render () {
        const modules = {
            toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
              ],
              clipboard: {
                matchVisual: false,
            }
        }

        const formats =  [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ]
        return (
            <div className="mt-3">
                <ReactQuill 
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={modules}
                    formats={formats}
                    placeholder="Text (Optional)"
                />
            </div>
         )
    }
}

export default Editor;

import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class RichTextEditor extends Component {
  static propTypes = {
    editorChange: PropTypes.func.isRequired
  };

  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
   const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
   this.props.editorChange(text);
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/*<textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />*/}
      </div>
    );
  }
}
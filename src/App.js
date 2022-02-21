import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddLink from './common/modals/AddLink';

const App = () => {
  const textAreaRef = useRef();
  const [areaText, setAreaText] = useState('');
  const [linkModal, setLinkModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');


  const toggleLinkModal = () => setLinkModal(!linkModal);

  const textTransform = (value, updateFor) => {
    if (textAreaRef.current !== undefined) {
      let start = textAreaRef.current.selectionStart;
      let end = textAreaRef.current.selectionEnd;
      let textChange = areaText.slice(start, end);
      let updateText;
      if (updateFor == 'heading' || updateFor == 'blockquote') {
        updateText = `${areaText.replace(textChange, `${value}${" "}${areaText.substring(start, end)}`)}`;
      } else {
        updateText = `${areaText.replace(textChange, `${value}${areaText.substring(start, end).trim()}${value}`)}`;
      }
      setAreaText(updateText)
    };
  };


  const linkClick = () => {
    if (textAreaRef.current !== undefined) {
      let start = textAreaRef.current.selectionStart;
      let end = textAreaRef.current.selectionEnd;
      console.log(areaText.substring(start, end));
      setSelectedText(areaText.substring(start, end));

      toggleLinkModal();
    }
  };


  const handleLinkSubmit = ({ link, linkText }) => {
    if (textAreaRef.current !== undefined) {
      let start = textAreaRef.current.selectionStart;
      let end = textAreaRef.current.selectionEnd;
      let textChange = areaText.slice(start, end);
      let updateText = `${areaText.replace(textChange, `[${linkText}](${link})`)}`;;

      setAreaText(updateText)
    };
    toggleLinkModal();
  };


  return (
    <div className="App">
      
      <h4 className='title'>Editor</h4>
      <div className="row">
        <div className="col-md-6">
        <div className='header'>
        <button onClick={() => console.log('Hellloo Preview ')} style={{marginLeft:'20px'}}>Preview</button>
        {/* Text transform into Bold Italic underline block-quote */}
        <button onClick={() => textTransform('**', 'B')}>B</button>
        <button onClick={() => textTransform('*', 'I')}>I</button>
        <button onClick={() => textTransform('>', 'blockquote')}><i className="fas fa-quote-left"></i></button>
        <button >Aa</button>
        <button onClick={() => textTransform('```', 'code')}><i className="fas fa-code"></i></button>
        {/* Link */}
        <button onClick={linkClick}><i className="fas fa-link"></i></button>
        <button><i class="fas fa-list-ol"></i></button>
        <button><i className="fas fa-list"></i></button>
        {/* Set Heading */}
        <select onChange={(v) => textTransform(v.target.value, 'heading')}>
          <option value="">Heading</option>
          <option value="#">Heading 1</option>
          <option value="##">Heading 2</option>
          <option value="###">Heading 3</option>
        </select>
      </div>
 
      <textarea
        name=""
        id=""
        cols="88"
        rows="20"
        ref={(elemet) => textAreaRef.current = elemet}
        value={areaText}
        onChange={(event) => {
          setAreaText(event.target.value);
        }}
      >
      </textarea>
        </div>
        <div className="col-md-6">
        <div className='markdown-field'>
        <ReactMarkdown>{areaText}</ReactMarkdown>
      </div>
        </div>
      </div>
     

    
      <AddLink show={linkModal} hide={toggleLinkModal} selectedLink={selectedText} handleLinkSubmit={handleLinkSubmit} />
    </div>
  );
}

export default App;

import React,{useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const AddLink = ({show, hide, selectedLink, handleLinkSubmit}) => {
const [state, setState] = useState({
    linkText:'',
    link:''
});

useEffect(() => {
    console.log(selectedLink);
    setState({
        link:selectedLink
    });
},[selectedLink]);

const submitHandler = (e) => {
    e.preventDefault();
    handleLinkSubmit(state);
    setState({linkText:'', link:''});
};

const handleFormValueUpdate = (e) => {
    setState({
        ...state, 
        [e.target.name]:e.target.value
    });
   
}

  return (
      <Modal show={show} onHide={hide}>
          <Modal.Header closeButton>
              <Modal.Title>Link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Link Placeholder</Form.Label>
                      <Form.Control type="text" placeholder="link placeholder" value={state.linkText}  name="linkText" onChange={handleFormValueUpdate}/>
                      <Form.Text className="text-muted">
                          Text to display for link
                      </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Link</Form.Label>
                      <Form.Control type="text" placeholder="link" value={state.link}  name="link" onChange={handleFormValueUpdate} />
                  </Form.Group>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={hide}>
                          Close
                      </Button>
                      <Button variant="primary" type="submit">
                          Add
                      </Button>
                  </Modal.Footer>
              </Form>
          </Modal.Body>
      </Modal>
  )
}

export default AddLink
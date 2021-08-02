import React from 'react';
import './addButton.css';

// props: id, onClick, label
const AddButton = (props) => {
  return (
    <div id={props.id} class="button uppercase" onClick={props.onClick}>{props.label}  <div class="plus">+</div></div>
  );
};

export default AddButton;
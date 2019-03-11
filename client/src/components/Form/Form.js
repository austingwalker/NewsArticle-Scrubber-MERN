import React from "react";
import "./Form.css"

const Form = props => (
  <form>
    <div className="form-group">
      <label htmlFor="topic">
        <strong>Topic</strong>
      </label>
      <input
        className="form-control"
        id="topic"
        type="text"
        value={props.q}
        placeholder="Net Neutrality"
        name="q"
        onChange={props.handleInputChange}
        required
      />
    </div>
    <div className="pull-right">
      <button
        onClick={props.handleFormSubmit}
        type="submit"
        className="btn btn-lg"
      >
        Submit
      </button>
    </div>
  </form>
);

export default Form;

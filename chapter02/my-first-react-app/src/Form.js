import { useState } from "react";


export default function Form(params) {

  const [formData, setFormData] = useState(
    {
      name: '',
      email: '',
      terms: false
    }
  );

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleCheckBox = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  }

  return <article>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        First name
        <input type="text"
          id="name"
          name="name"
          onChange={handleInput}
          value={formData.name}
          placeholder="Your Name"
          required />
      </label>
      <label htmlFor="email">
        Email
        <input type="email"
          id="email"
          name="email"
          onChange={handleInput}
          value={formData.email}
          placeholder="Your Email"
          required />
      </label>

      <label htmlFor="terms">
        <input type="checkbox"
          id="terms"
          name="terms"
          onChange={handleCheckBox}
          value={formData.terms}
        /> &nbsp; Accept Terms and Conditions?
      </label>

      <button type="submit">Submit</button>
    </form>
  </article>
};

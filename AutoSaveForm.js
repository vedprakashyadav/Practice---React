import { useEffect, useState } from 'react';

function AutoSaveForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("autosave");
    if (saved) {
      setForm(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("autosave", JSON.stringify(form))
  }, [form, loaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }

  const clearForm = () => {
    setForm({ name: "", email: "", message: "" });
    localStorage.removeItem("autosave");
  }
  return (
    <div>
      <h1>Auto Save Form</h1>

      <form className="form">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          data-testid="form-input"
        />
        <br />
        <br />
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          data-testid="form-email"
        />
        <br />
        <br />
        <label>Message: </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          data-testid="form-message"
        ></textarea>
        <br />
        <br />
        <button type="button" onClick={clearForm} data-testid="clear-btn">
          Clear
        </button>
      </form>
    </div>
  );
}

export default AutoSaveForm;

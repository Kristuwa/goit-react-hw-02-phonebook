import { Formik } from 'formik';
import shortid from 'shortid';
import { FormContainer, Input, Button, Label } from './ContactForm.styled';
import PropTypes from 'prop-types';

const ContactForm = ({ contacts, onFormSubmit }) => {
  const initialValues = {
    name: '',
    number: '',
    id: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    const id = shortid.generate();
    const newValues = { ...values, id: id };
    if (contacts.length === 0) {
      contacts.push(newValues);
    } else {
      for (let contact of contacts) {
        if (newValues.name.toLowerCase() === contact.name.toLowerCase()) {
          return alert(`${newValues.name} is already in contacts`);
        }
      }
      contacts.push(newValues);
    }
    resetForm();
    onFormSubmit(newValues);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <FormContainer autoComplete="of">
        <Label htmlFor="name">
          Name:
          <Input
            type="text"
            id="name"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label htmlFor="number">
          Number:
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormContainer>
    </Formik>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

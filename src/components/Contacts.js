import React, { Component } from 'react'
import ContactDetails from './ContactDetails'
import axios from 'axios'
import './Contacts.css'

// class component of contact
class Contacts extends Component {
  // constructor is used to take some state variable and change using functions
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      showContacts: false,
    }
    // binding the functions used in component
    this.handleShowContacts = this.handleShowContacts.bind(this)
    this.handleAddContact = this.handleAddContact.bind(this)
  }

  // fetching the api and saving the data in a state at the start
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users').then((Response) => {
      this.setState({
        contacts: Response.data,
      })
    })
  }

  // function to change value of state variable and toggle show contacts and hide contacts
  handleShowContacts() {
    this.setState({
      showContacts: !this.state.showContacts,
    })
  }
  // function to add a contact dummy call
  handleAddContact() {
    const name = document.getElementById('name')
    const phone = document.getElementById('phone')
    // fetching the api and making a dummy POST call to add the contact to the server
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        phone: phone.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      // Saving the contact details in a state
      .then((data) => this.setState({ newContact: { data } }))
    // resetting the input values
    name.value = ''
    phone.value = ''
  }

  render() {
    return (
      <div className='container'>
        <h1 style={{ textAlign: 'center' }}>Contact List </h1>
        <div className='contact-form'>
          <input id='name' type="text" placeholder='Name' required></input>
          <input
            id='phone'
            type='number'
            placeholder='Phone No.'
            required
          ></input>
          <button type='submit' onClick={this.handleAddContact}>
            Add Contact
          </button>
        </div>
        {/* button to toggle between Showing and hiding contacts */}
        <button id='show-hide-contacts' onClick={this.handleShowContacts}>
          {!this.state.showContacts ? 'Show Contacts' : 'Hide Contacts'}
        </button>
        {this.state.showContacts && (
          <ul id='listOfContacts'>
            {this.state.contacts.map((contact) => (
              <li key={contact.email} className='list-item'>
                <ContactDetails contact={contact} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Contacts

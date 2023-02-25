import React, { Component } from 'react'
import './ContactDetails.css'

export default class ContactDetails extends Component {
  constructor(props) {
    super(props)

    //binding the handling function as they are not bound by default
    this.handleUpdateContact = this.handleUpdateContact.bind(this)
    this.handleDeleteContact = this.handleDeleteContact.bind(this)
    this.showMoreDetails = this.showMoreDetails.bind(this)
  }

  // fetching api and making a dummy call to the server to delete cintact
  handleDeleteContact() {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${this.props.contact.id}`,
      {
        method: 'DELETE',
      }
    )
    console.log(
      'contact with id ' + this.props.contact.id + ' is deleted successfully'
    )
  }

  // fetching api and making a dummy PUT call to the server
  handleUpdateContact() {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${this.props.contact.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

  // function for showing details of a particular from list
  showMoreDetails() {
    const details = document.getElementById(this.props.contact.id)
    details.classList.toggle('show')
  }

  render() {
    const contact = this.props.contact

    return (
      <div>
        {/* visible details of contacts in contactlist container */}
        <h3 id='visible-details'>
          {contact.name}
          <div id='icons'>
            <i
              className='fas fa-user-edit'
              onClick={this.handleUpdateContact}
              style={{ cursor: 'pointer' }}
            />
            <i
              className='fas fa-trash-alt'
              onClick={this.handleDeleteContact}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </h3>

        {/* hidden details of a contact */}
        <i
          id='more-details'
          className='fas fa-chevron-down'
          onClick={this.showMoreDetails}
          style={{ cursor: 'pointer' }}
        >
          <div id={contact.id} className='show'>
            <div id='phone'>
              <i className='details-icons fas fa-phone'></i>
              {contact.phone}
            </div>
            <div id='email'>
              <i className='details-icons fas fa-envelope'></i>
              {contact.email}
            </div>
            <div>
              <i className='details-icons fas fa-map-marker-alt'>Address</i>
              <div id='address'>
                {'street:'} {contact.address.street} <br></br>
                {'suite:'} {contact.address.suite} <br></br>
                {'city:'} {contact.address.city} <br></br>
                {'zipcode:'} {contact.address.zipcode}
              </div>
            </div>
            <div>
              {'Website:'} {contact.website}
            </div>
          </div>
        </i>
        <hr></hr>
      </div>
    )
  }
}

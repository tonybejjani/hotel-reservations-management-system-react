import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import useAllBookings from '../features/bookings/useAllBookings'; // Updated path

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

export default function BookingsCalendar() {
  const { bookings, isLoading, error } = useAllBookings();

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    // It's good practice to display the error message if available
    return <p>Error loading bookings: {error?.message || 'Unknown error'}</p>;
  }

  let myEventsList = [];
  if (bookings && bookings.length > 0) {
    myEventsList = bookings.map((booking) => {
      // Ensure guests and cabins objects exist and have the expected properties
      const guestName = booking.guests?.fullName || 'Unknown Guest';
      const cabinName = booking.cabins?.name || 'Unknown Cabin';
      
      return {
        id: booking.id,
        title: `Booking: ${guestName} - ${cabinName}`,
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
        // resourceId: booking.cabinId, // Optional: if you want to use resource views
      };
    });
  } else if (bookings && bookings.length === 0) {
    console.log('No bookings to display.');
  }


  return (
    <div className="calendar-container" style={{ height: '600px' }}> {/* Increased height slightly */}
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month" // Set a default view
        selectable // Allows clicking on dates/slots
        // onSelectSlot={(slotInfo) => {
        //   // Handle slot selection, e.g., open a modal to create a new booking
        //   console.log('Selected slot:', slotInfo);
        // }}
        // onSelectEvent={(event) => {
        //   // Handle event selection, e.g., navigate to booking details
        //   console.log('Selected event:', event);
        // }}
        style={{ height: '100%' }} // Make calendar fill the container
      />
    </div>
  );
}

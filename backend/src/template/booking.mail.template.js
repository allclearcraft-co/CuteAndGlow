const serviceBookingTemplate = (
  name,
  serviceName,
  dateOfBooking,
  storeName,
  storeContactNumber,
) => {
  return `
    <div style="font-family:Arial;padding:30px">
        <h2>Hello ${name}</h2>

        <p>Congratulations your booking is confirmed</p>

        <h1
            style="
                background:#0f172a;
                color:white;
                padding:15px;
                width:180px;
                text-align:center;
                border-radius:8px;
            "
        >
            ${serviceName}
        </h1>

        <p>${storeName}</p>
        <p>${storeContactNumber}</p>
        <p>${dateOfBooking}</p>
        
        <br>

        <small>
            If you didn't booked this service,
            please ignore this email.
        </small>

    </div>
    `;
};

export default serviceBookingTemplate;

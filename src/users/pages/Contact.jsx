import React, { useState } from "react";

import Nav from "../components/Nav";
import PagesHeader from "../components/PagesHeader";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contacts = [
    {
      title: "Contact",
      topic: "Contact Details",
      description:
        "ไบเบิลพาร์แดนซ์สแตนเลสบลูเบอร์รี่ อาว์โยโย่ คำสาปรองรับ แคชเชียร์วิป เยอบีร่าแอดมิสชันโมเดิร์นไฟลต์อริยสงฆ์ ทัวร์ซี้ซิตีตื้บคอนโด",
      address: "Building 5, Floor 8, Computer Engineering Room",
      mobile: "022 222 2222",
      availability: "Daily 09 am - 05 pm",
      email: "example@email.com",
    },
  ];

  return (
    <main className="contact-container">
      <Nav />
      <PagesHeader
        main_title={contacts[0].title}
        sub_title={contacts[0].title}
      />
      
      {contacts.map((contact, idx) => (
        <aritcle key={idx} className="content-container row m-0">
          <section className="contact-deatils col-md-6 py-5">
            <h1 className="topic">{contact.topic}</h1>
            <p className="desc">{contact.description}</p>

            <article className="contact-box-container row">
              {/* Location */}
              <section className="col-lg-5 contact-box address">
                <ion-icon name="location-sharp"></ion-icon>
                <div className="text-container">
                  <h5 className="title-box">Address</h5>
                  <p className="desc-box">{contact.address}</p>
                </div>
              </section>

              {/* mobile */}
              <section className="col-lg-5 contact-box mobile">
                <ion-icon name="call-sharp"></ion-icon>
                <div className="text-container">
                  <h5 className="title-box">Mobile</h5>
                  <p className="desc-box">{contact.mobile}</p>
                </div>
              </section>

              {/* availability */}
              <section className="col-lg-5 contact-box mobile">
                <ion-icon name="time-sharp"></ion-icon>
                <div className="text-container">
                  <h5 className="title-box">Availability</h5>
                  <p className="desc-box">{contact.availability}</p>
                </div>
              </section>

              {/* email */}
              <section className="col-lg-5 contact-box mobile">
                <ion-icon name="mail-sharp"></ion-icon>
                <div className="text-container">
                  <h5 className="title-box">Email</h5>
                  <p className="desc-box">{contact.email}</p>
                </div>
              </section>
            </article>
          </section>
          
          <div class="vl"></div>

          <form className="get-in-touch col-md-6 py-5">
            <h1 className="topic">Get in Touch</h1>
            <hr />

            {/* form name */}
            <div className="input-box">
              <input 
                type="text" 
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3 my-2"
                required
              />
            </div>

            {/* form email */}
            <div className="input-box">
              <input 
                type="email" 
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-3 my-2"
                required
              />
            </div>
            <div className="input-box">
              <textarea 
                type="text" 
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
                className="form-control mb-3 my-2"
                required
              ></textarea>
            </div>

            <button
              className="send-mess-btn"
              disabled={
                name?.trim() === '' || 
                email?.trim() === '' || 
                message?.trim() === ''
              }
            >
              Send Message
            </button>
          </form>
        </aritcle>
      ))}
    </main>
  );
};

export default Contact;

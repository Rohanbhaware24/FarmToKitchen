import React from 'react';
import styled from 'styled-components';

const StyledContactPage = styled.div`
  padding: 20px;

  .common-heading {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .map-container {
    margin-bottom: 20px;
    iframe {
      width: 100%;
      height: 400px;
      border: 0;
    }
  }

  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #f0f0f0;
    border-radius: 8px;

    form {
      display: grid;
      gap: 10px;

      input[type='text'],
      input[type='email'],
      textarea {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      input[type='submit'] {
        width: 100%;
        padding: 10px;
        font-size: 18px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }

  .footer {
    background-color: #333;
    color: #fff;
    padding: 40px 20px;
    margin-top: 40px;

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .footer-column {
        flex: 1 1 300px;
        padding: 20px;

        h4 {
          font-size: 18px;
          margin-bottom: 20px;
        }

        p,
        a {
          color: #ccc;
          text-decoration: none;
          font-size: 16px;
        }

        a:hover {
          color: #fff;
        }

        .footer-email,
        .footer-phone {
          margin-top: 10px;
        }
      }
    }
  }
`;

const Contact = () => {
  return (
    <StyledContactPage>
      {/* Contact form and map */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120072.38215637264!2d75.26753951980311!3d19.87115821067241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9880db53c867%3A0xd41d970a274947dd!2sD%20Mart!5e0!3m2!1sen!2sin!4v1728115215115!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/myzygyek"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              placeholder="Your Name"
              name="user"
              required
              autoComplete="off"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />
            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter your message/FeedBack/Querry"
            ></textarea>

            <input type="submit" value="Send" />
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>If you have any questions, feel free to reach out to us at:</p>
            <p className="footer-email">Email: pravin@FTK.com</p>
            <p className="footer-phone">Phone: +91-8459787658</p>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <p>
              For help and support, please visit our{' '}
              <a href="/support">Support Page</a>.
            </p>
            <p>
              Read our <a href="/faq">FAQ</a> for quick answers.
            </p>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <p>
              Stay connected through our social media channels:
            </p>
            <p>
              <a href="https://facebook.com">Facebook</a> |{' '}
              <a href="https://twitter.com">Twitter</a> |{' '}
              <a href="https://instagram.com">Instagram</a>
            </p>
          </div>
        </div>
      </footer>
    </StyledContactPage>
  );
};

export default Contact;
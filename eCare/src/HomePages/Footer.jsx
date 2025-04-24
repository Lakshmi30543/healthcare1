import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import "./styles/footer.css"
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top-content">
          <h1>Working for Your Better Health.</h1>
          <div className="footer-contact-info">
            <div className="footer-customer-support">
              <p>Customer Support</p>
              <span>+1 56589 54598</span>
            </div>
            <div className="footer-email-info">
              <p>Drop Us an Email</p>
              <span>info1256@example.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-column">
          <h2>Company</h2>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Careers</li>
            <li>Locations</li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Treatments</h2>
          <ul>
            <li>Dental</li>
            <li>Cardiac</li>
            <li>Spinal Cord</li>
            <li>Hair Growth</li>
            <li>Anemia & Disorder</li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Specialties</h2>
          <ul>
            <li>Transplant</li>
            <li>Cardiologist</li>
            <li>Oncology</li>
            <li>Pediatrics</li>
            <li>Gynecology</li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Utilities</h2>
          <ul>
            <li>Pricing</li>
            <li>Contact</li>
            <li>Request A Quote</li>
            <li>Premium Membership</li>
            <li>Integrations</li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h2>Newsletter</h2>
          <p>Subscribe & Stay Updated from Doccure</p>
          <input type="email" placeholder="Enter Email Address" />
          <button>Send</button>

          {/* Connect With Us moved here */}
          <div className="footer-connect">
            <h3>Connect With Us</h3>
            <div className="footer-social-icons">
              <Facebook size={20} />
              <Twitter size={20} />
              <Instagram size={20} />
              <Linkedin size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 Doccure. All Rights Reserved</p>
        <div className="footer-legal-links">
          <span>Legal Notice</span>
          <span>Privacy Policy</span>
          <span>Refund Policy</span>
        </div>
      </div>
    </footer>
  );
}

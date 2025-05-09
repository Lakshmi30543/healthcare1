import React from 'react';
import '../styles/blog.css'; // Import the external CSS file

export default function Blog() {
  return (
    <div className="blog-section">
      <div className="blog-container">
        <h2 className="blog-heading">Latest Blog</h2>
        
        <div className="blog-grid">
          {/* Blog Post 1 */}
          <div className="blog-post">
            <div className="post-content">
              <div className="post-header">
                <span className="post-category">Hospital Management Software</span>
                <span className="new-badge">New</span>
              </div>
              <h3 className="post-title">Helping you achieve NABH Compliance</h3>
              <p className="post-excerpt">Hospital Management Software Helping you Achieve NABH Compliance</p>
              <a href="#" className="learn-more">Learn more →</a>
            </div>
            <div className="post-number">
              <span>2.1</span>
            </div>
          </div>
          
          {/* Blog Post 2 */}
          <div className="blog-post">
            <div className="post-content">
              <div className="post-header">
                <span className="post-category">Hospital Billing Software</span>
                <span className="new-badge">New</span>
              </div>
              <h3 className="post-title">How Hospital Billing Software Enhances Patient Experience</h3>
              <p className="post-excerpt">From Admission to Discharge</p>
              <a href="#" className="learn-more">Learn more →</a>
            </div>
            <div className="post-number">
              <span>12</span>
            </div>
          </div>
          
          {/* Blog Post 3 */}
          <div className="blog-post">
            <div className="post-content">
              <div className="post-header">
                <span className="post-category">Management Software</span>
                <span className="new-badge">New</span>
              </div>
              <h3 className="post-title">Implementing Clinic and Hospital Management Software</h3>
              <p className="post-excerpt">Benefits of Implementing Clinic and Hospital Management Software</p>
              <a href="#" className="learn-more">Learn more →</a>
            </div>
            <div className="post-number">
              <span>20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Blogify</h1>
          <p>Your go-to platform for creating and sharing engaging blog posts.
            With a focus on user-friendly design and seamless functionality,
            Blogify empowers you to express your thoughts and ideas effortlessly.</p>
          <Link to="/blogs" className="cta-button">
            Join Us and Create Blogs
          </Link>
        </div>
        <img
          className="hero-image"
          src="https://i0.wp.com/www.rayowag.com/wp-content/uploads/2018/07/blogjuly-208022.jpg?resize=4104%2C2309&ssl=1"
          alt="Error"
        />
      </div>
      <div className="about-section">
        <h2>About Blogify</h2>
        <p>
          Blogify is a vibrant community where you can express your thoughts,
          ideas, and experiences through captivating blogs. Connect with like-minded
          individuals, explore diverse topics, and embark on a journey of storytelling.
          Whether you're a seasoned writer or just starting your blogging journey,
          Blogify offers a platform that supports your creativity and growth.
        </p>
      </div>
    </div>
  );
};

export default Home;

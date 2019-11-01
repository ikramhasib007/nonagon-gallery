import React from 'react';

function Home() {
  return (
    <div className="container home">
      <div className="row h-100">
        <div className="col-md-12 d-flex justify-content-around align-items-center">
          <h1 className="landing-text">Welcome, <p>Nonagon <span>Gallery</span></p></h1>
          <a href="/gallery" className="btn btn-outline-dark btn-lg text-uppercase">Let's try</a>
        </div>
      </div>
    </div>
  );
}

export default Home;

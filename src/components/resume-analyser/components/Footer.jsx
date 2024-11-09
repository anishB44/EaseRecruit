import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ease Recruit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

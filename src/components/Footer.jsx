const Footer = () => {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-body-secondary">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-body-secondary">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-body-secondary">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-body-secondary">
              Privacy Policy
            </a>
          </li>
        </ul>
        <p className="text-center text-body-secondary">©kashifwamik, Inc</p>
      </footer>
    </div>
  );
};
export default Footer;

import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundContainer}>
      <p>This page does not exist</p>
      <Link to="/">Go to home page</Link>
    </div>
  );
};

export default NotFoundPage;

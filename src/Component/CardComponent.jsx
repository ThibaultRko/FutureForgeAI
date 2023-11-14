import { Link } from "react-router-dom";

function Card({ image, alt, text, link, buttonText }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl flex space-x-4 m-4 w-2/5 h-max">
      <figure className="w-1/2">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body w-1/2">
        <p className="text-textColor2">{text}</p>
        <div className="card-actions justify-end">
          <Link to={link} className="btn bg-startCargus hover:bg-startCargusHover text-background1">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;

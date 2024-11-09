import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="text-primary font-extrabold text-2xl">
      <span className="">E</span>ase<span className="text-primary">R</span>ecruit
    </Link>
  );
}

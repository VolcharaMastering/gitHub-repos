import gifsLoader from "../../assets/loader2.gif";
import "./Loader.scss";

const Loader: React.FC = () => {
    return (
        <div className="loader__shadow">
            <div className="loader">
                <img className="loader" src={gifsLoader} alt="loader"></img>
            </div>
        </div>
    );
};
export default Loader;

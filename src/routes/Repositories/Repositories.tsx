import TheTable from "../../components/TheTable/TheTable";
import "./Repositories.scss";

type PropsRepositories = {};
const Repositories: React.FC<PropsRepositories> = () => {
    return (
        <section className="repositories">
            <h2 className="subtitle">Repositories Page</h2>
            <TheTable />
        </section>
    );
};
export default Repositories;

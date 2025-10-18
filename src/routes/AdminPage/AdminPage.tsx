import GitForm from "../../components/GitForm/GitForm";
import "./AdminPage.scss";

const AdminPage: React.FC = () => {
    return (
        <section className="admin-page">
            <h2 className="subtitle">Settings</h2>
            <p className="description">GitHub credentials</p>

            <GitForm />
        </section>
    );
};
export default AdminPage;

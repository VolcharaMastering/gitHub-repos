import { useFormStore } from "full-form-control";
import { useAllReposStore } from "../../store/allReposStore";
import CustomButton from "../../UI/CustomButton/CustomButton";
import InputElement from "../../UI/InputElement/InputElement";
import "./GitForm.scss";
import { formSchema } from "../../utils/validation/formSchema";

const GitForm: React.FC = () => {
    const { getAllRepos, repositories } = useAllReposStore();
    //custom form validation npm package
    const { formValues, setFormValues, errors, isValid } = useFormStore();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { gitLogin, gitToken } = formValues;
            getAllRepos(gitLogin, gitToken);
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                console.error(`Error fetching repositories: ${error.message}`);
            } else {
                console.error(`Error fetching repositories: ${String(error)}`);
            }
        }
        // Handle form submission logic here
    };
    const setInputData = async (name: string, value: string | Blob) => {
        setFormValues({ [name]: value }, { type: "zod", schema: formSchema });
    };

    console.log("REPOS", repositories);
    return (
        <form className="git-form" onSubmit={handleSubmit}>
            <InputElement
                inputType="text"
                label="GitHub Login"
                name="gitLogin"
                value={formValues.gitLogin}
                onChange={(e) => {
                    setInputData("gitLogin", e.target.value);
                }}
                placeholder="Enter your GitHub login"
                errorMessage={errors.gitLogin}
            />
            <InputElement
                inputType="password"
                label="GitHub Token"
                name="gitToken"
                onChange={(e) => setInputData("gitToken", e.target.value)}
                placeholder="Enter your GitHub token"
                errorMessage={errors.gitToken}
                value={formValues.gitToken}
            />

            <CustomButton text="Save" disabled={!isValid} onSubmit={handleSubmit} />
        </form>
    );
};
export default GitForm;

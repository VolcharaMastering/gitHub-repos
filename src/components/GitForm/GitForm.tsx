import { useNavigate } from "react-router-dom";
import { useFormStore } from "full-form-control";
import { useAllReposStore } from "../../store/allReposStore";
import CustomButton from "../../UI/CustomButton/CustomButton";
import InputElement from "../../UI/InputElement/InputElement";
import { formSchema } from "../../utils/validation/formSchema";
import { useLoader } from "../../store/loaderStore";
import "./GitForm.scss";
import { useGitUserStore } from "../../store/gitUserStore";

const GitForm: React.FC = () => {
    const { setGitUser } = useGitUserStore();
    const { getAllRepos } = useAllReposStore();
    const { setIsLoading, setIsSuccess } = useLoader();
    const navigate = useNavigate();
    //custom form validation npm package
    const { formValues, setFormValues, errors, isValid } = useFormStore();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);
        const { gitLogin, gitToken } = formValues;
        try {
            await getAllRepos(gitLogin, gitToken);
            setGitUser(gitLogin, gitToken);
            navigate("/repositories");
            setIsSuccess(true);
            setIsLoading(false);
        } catch (error: unknown | Error) {
            setIsLoading(false);
            if (error instanceof Error) {
                console.error(`Error fetching repositories: ${error.message}`);
            } else {
                console.error(`Error fetching repositories: ${String(error)}`);
            }
        }
    };
    const setInputData = async (name: string, value: string | Blob) => {
        setFormValues({ [name]: value }, { type: "zod", schema: formSchema });
    };
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

            <CustomButton type="submit" text="Save" disabled={!isValid} />
        </form>
    );
};
export default GitForm;

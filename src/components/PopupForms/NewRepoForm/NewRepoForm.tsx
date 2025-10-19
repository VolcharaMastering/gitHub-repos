import { useFormStore } from "full-form-control";
import { useAllReposStore } from "../../../store/allReposStore";
import { useGitUserStore } from "../../../store/gitUserStore";
import { useLoader } from "../../../store/loaderStore";
import { useOpenPopup } from "../../../store/popupStore";
import InputElement from "../../../UI/InputElement/InputElement";
import SelectElement from "../../../UI/SelectElement/SelectElement";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import { createRepositorySchema } from "../../../utils/validation/createRepositorySchema";
import "./NewRepoForm.scss";

const NewRepoForm: React.FC = () => {
    const { gitLogin, gitToken } = useGitUserStore();
    const { setIsOpen } = useOpenPopup();
    const { createRepository } = useAllReposStore();
    const { setIsLoading, setIsSuccess } = useLoader();
    const { formValues, setFormValues, errors, isValid, clearFormValues } = useFormStore();

    const setInputData = async (name: string, value: string | Blob) => {
        setFormValues({ [name]: value }, { type: "zod", schema: createRepositorySchema });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);
        const { name, description, isPrivate } = formValues;
        if (!gitLogin || !gitToken) {
            setIsLoading(false);
            return;
        }
        try {
            await createRepository(gitLogin, gitToken, {
                name,
                description,
                isPrivate: isPrivate === "yes",
            });
            setIsSuccess(true);
            setIsLoading(false);
            setIsOpen(false, {});
            clearFormValues();
        } catch (error: unknown | Error) {
            setIsLoading(false);
            if (error instanceof Error) {
                console.error("Error updating repository:", error.message);
            } else {
                console.error("Error updating repository:", String(error));
            }
        }
    };

    return (
        <form className="new-repo-form" onSubmit={handleSubmit}>
            <h2 className="subtitle">Edit Repository</h2>

            <InputElement
                inputType="text"
                name="name"
                onChange={(e) => setInputData("name", e.target.value)}
                placeholder="Name"
                label="Repository Name"
                errorMessage={errors.name}
                value={formValues.name}
            />
            <InputElement
                inputType="text"
                name="description"
                onChange={(e) => setInputData("description", e.target.value)}
                placeholder="Description"
                label="Description"
                errorMessage={errors.description}
                value={formValues.description}
            />
            <SelectElement
                label="Is isPrivate?"
                name="isPrivate"
                defaultValue={formValues.isPrivate}
                onChange={(e) => setInputData("isPrivate", String(e.target.value))}
                values={["yes", "no"]}
                errorMessage={errors.visibility}
            />
            <CustomButton text="Create" type="submit" disabled={!isValid} />
        </form>
    );
};
export default NewRepoForm;

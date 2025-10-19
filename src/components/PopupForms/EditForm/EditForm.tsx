/* eslint-disable react-hooks/exhaustive-deps */
import { useFormStore } from "full-form-control";
import { useGitUserStore } from "../../../store/gitUserStore";
import { useLoader } from "../../../store/loaderStore";
import { useAllReposStore } from "../../../store/allReposStore";
import { updateFormSchema } from "../../../utils/validation/updateFormSchema";
import InputElement from "../../../UI/InputElement/InputElement";
import SelectElement from "../../../UI/SelectElement/SelectElement";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import "./EditForm.scss";
import { useEffect } from "react";
import { useOpenPopup } from "../../../store/popupStore";

type PropsEditForm = {
    repoName: string;
};
const EditForm: React.FC<PropsEditForm> = ({ repoName }) => {
    const { gitLogin, gitToken } = useGitUserStore();
    const { setIsOpen } = useOpenPopup();
    const { updateRepository, repositories } = useAllReposStore();
    const { setIsLoading, setIsSuccess } = useLoader();
    const { formValues, setFormValues, errors, isValid, clearFormValues } = useFormStore();

    const setInputData = async (name: string, value: string | Blob) => {
        setFormValues({ [name]: value }, { type: "zod", schema: updateFormSchema });
    };

    useEffect(() => {
        const repoToEdit = repositories.find((repo) => repo.name === repoName);
        if (repoToEdit) {
            setFormValues(
                {
                    description: repoToEdit.description || "",
                    visibility: repoToEdit.visibility,
                },
                { type: "zod", schema: updateFormSchema },
                "edit"
            );
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);
        const { description, visibility } = formValues;
        if (!gitLogin || !gitToken || !visibility) {
            setIsLoading(false);
            return;
        }
        try {
            await updateRepository(gitLogin, gitToken, repoName, {
                description,
                visibility,
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
        <form className="edit-form" onSubmit={handleSubmit}>
            <h2 className="subtitle">Edit Repository</h2>
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
                label="Select visibility"
                name="visibility"
                defaultValue={formValues.visibility}
                onChange={(e) => setInputData("visibility", String(e.target.value))}
                values={["public", "private"]}
                errorMessage={errors.visibility}
            />
            <CustomButton text="Save" type="submit" disabled={!isValid} />
        </form>
    );
};
export default EditForm;

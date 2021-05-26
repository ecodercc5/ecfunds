import { Formik, Form, Field } from "formik";
import { useCreateProject } from "../hooks/projects";
import { useAuth } from "../providers/auth";
import { Redirect } from "react-router";
import { firebase } from "../firebase";

const storageRef = firebase.storage().ref();

export const CreateProjectPage = () => {
  const [createProject] = useCreateProject();
  const { user } = useAuth();

  if (!user?.chargesEnabled) {
    return <Redirect to="/billing/onboarding" />;
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          target: 0,
          description: "",
          photo: null,
        }}
        onSubmit={async ({ photo, ...values }) => {
          console.log("creating a project");

          console.log(values);

          const photoFile = photo! as File;

          const uploadFile = storageRef
            .child(`/images/${photoFile.name}`)
            .put(photoFile);

          await uploadFile;

          const image = await uploadFile.snapshot.ref.getDownloadURL();

          createProject({
            variables: {
              input: {
                ...values,
                image,
              },
            },
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      >
        {({ values, setFieldValue }) => {
          console.log(values);

          return (
            <Form>
              <label>Project Name</label>
              <Field required name="name" />

              <label>Funding Target</label>
              <Field required type="number" name="target" />

              <label>Image</label>
              <input
                required
                type="file"
                onChange={(e) => {
                  console.log(e.target.files);
                  const photoFile = e.target.files![0];

                  setFieldValue("photo", photoFile);
                }}
              />

              <label>Description</label>
              <Field name="description" />

              <button type="submit">Create Project</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

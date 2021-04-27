import { Formik, Form, Field } from "formik";
import { useCreateProject } from "../hooks/projects";
import { Tag } from "../graphql/types";
import { useAuth } from "../providers/auth";
import { Redirect } from "react-router";

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
          deadline: Date.now(),
          description: "",
        }}
        onSubmit={({ deadline, ...values }) => {
          console.log("creating a project");

          console.log(values);

          createProject({
            variables: {
              input: {
                ...values,
                image: "asdf",
                tag: Tag.Art,
              },
            },
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      >
        {({ values }) => {
          console.log(values);

          return (
            <Form>
              <label>Project Name</label>
              <Field name="name" />

              <label>Funding Target</label>
              <Field type="number" name="target" />

              <label>Deadline</label>
              <Field type="date" name="deadline" />

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

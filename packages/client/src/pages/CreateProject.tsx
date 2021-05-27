import { Formik, Form, Field } from "formik";
import { useCreateProject } from "../hooks/projects";
import { useAuth } from "../providers/auth";
import { Redirect } from "react-router";
import { firebase } from "../firebase";
import { Layout } from "../components/layout/Layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";

const storageRef = firebase.storage().ref();

export const CreateProjectPage = () => {
  const [createProject] = useCreateProject();
  const { user } = useAuth();

  if (!user?.chargesEnabled) {
    return <Redirect to="/billing/onboarding" />;
  }

  return (
    <Layout>
      <Text as="h1" color="brand" fontSize="xl" fontWeight="bold" mb={2}>
        Your Project
      </Text>

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
              <FormControl id="name">
                <FormLabel>Project Name</FormLabel>
                <Field required name="name" as={Input} />
              </FormControl>

              <FormControl id="target">
                <FormLabel>Funding Target</FormLabel>
                <Field required type="number" name="target" as={Input} />
              </FormControl>

              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  required
                  type="file"
                  onChange={(e) => {
                    console.log(e.target.files);
                    const photoFile = e.target.files![0];

                    setFieldValue("photo", photoFile);
                  }}
                />
              </FormControl>

              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Field required name="description" as={Textarea} />
              </FormControl>

              <Button type="submit">Create Project</Button>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

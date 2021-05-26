import { GetProjectQuery } from "../../graphql/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Field, Form, Formik } from "formik";
import { useFundProject } from "../../hooks/projects";
import { useHistory } from "react-router";

interface Props {
  project: GetProjectQuery["getProject"];
}

export const BackProjectForm: React.FC<Props> = ({ project }) => {
  const [fundProject] = useFundProject();
  const elements = useElements();
  const stripe = useStripe();
  const history = useHistory();

  console.log({ project });

  return (
    <div>
      <p>backing {project?.name}</p>

      <Formik
        initialValues={{
          amount: 0,
        }}
        onSubmit={(values) => {
          console.log("on submit back project");
          console.log(values);

          fundProject({
            variables: {
              input: {
                projectId: project?.id!,
                amount: values.amount,
              },
            },
          }).then(async (res) => {
            console.log("response");

            console.log(res);

            const clientSecret = res.data?.fundProject;
            const cardElement = elements?.getElement(CardElement);

            const result = await stripe?.confirmCardPayment(clientSecret!, {
              payment_method: {
                card: cardElement!,
              },
            });

            if (result?.error) {
              console.log("stripe error");

              console.log(result.error);
              return;
            }

            console.log("success");

            history.push("/");
          });
        }}
      >
        {({ values, errors }) => {
          console.log(values);

          return (
            <Form>
              <label>Amount</label>
              {errors.amount}
              <Field
                type="number"
                name="amount"
                validate={(value: number) => {
                  return typeof value === "number"
                    ? undefined
                    : "Please enter a valid amount";
                }}
              />

              <CardElement />
              <button type="submit">Back Project</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

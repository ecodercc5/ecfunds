import { GetProjectQuery } from "../../graphql/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Field, Form, Formik } from "formik";
import { useFundProject } from "../../hooks/projects";
import { useHistory } from "react-router";
import {
  AspectRatio,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { AvatarDetails } from "../../components/user/AvatarDetails";

interface Props {
  project: GetProjectQuery["getProject"];
}

export const BackProjectForm: React.FC<Props> = ({ project }) => {
  const [fundProject] = useFundProject();
  const elements = useElements();
  const stripe = useStripe();
  const history = useHistory();

  console.log({ project });

  const { name } = project!;

  return (
    <div>
      <Text
        as="h1"
        color="brand"
        fontSize="24px"
        fontWeight={600}
        textAlign="center"
        mb={3}
      >
        Backing This Project
      </Text>

      <AspectRatio ratio={4 / 3} width="100%">
        <Image
          src="https://images.unsplash.com/photo-1617357284025-6d4e2dc08cf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          borderRadius="8px"
        />
      </AspectRatio>

      <Flex justifyContent="space-between" alignItems="center" my={3}>
        <Text fontSize="sm" color="brand" fontWeight={500}>
          {/* {percentFunded}% Funded */}
        </Text>
      </Flex>

      <Text as="h1" fontWeight={600} fontSize="lg" mb={2}>
        {name}
      </Text>

      <AvatarDetails
        photoUrl="https://images.unsplash.com/photo-1617353318123-78b8edc20f82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
        name="Eric Chen"
        date="April 28, 2020"
      />

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

            history.push("/projects");
          });
        }}
      >
        {({ values, errors }) => {
          console.log(values);

          return (
            <Form>
              <FormControl mb={2}>
                <FormLabel>Amount</FormLabel>
                {errors.amount}
                <Field
                  as={Input}
                  type="number"
                  name="amount"
                  validate={(value: number) => {
                    return typeof value === "number"
                      ? undefined
                      : "Please enter a valid amount";
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Payment Info</FormLabel>
                <Input as={CardElement} />
              </FormControl>
              {/* <CardElement /> */}
              <Button
                type="submit"
                width="100%"
                color="white"
                bg="brand"
                mt={4}
              >
                Back Project
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Redirect } from "react-router";
import { Layout } from "../components/layout/Layout";
import { useCompleteUserOnboarding } from "../hooks/billing";
import { useAuth } from "../providers/auth";

export const BillingOnboardingPage = () => {
  const { user } = useAuth();
  const [completeUserOnboarding] = useCompleteUserOnboarding();

  if (user?.chargesEnabled) {
    return <Redirect to="/create-project" />;
  }

  const handleSetUpBilling = () => {
    completeUserOnboarding().then((res) => {
      // get the stripe onboarding link
      const link = res.data?.completeBillingOnboarding?.link;

      // navigate to that link
      window.location.assign(link!);
    });
  };

  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center" flex={2}>
        <Button onClick={handleSetUpBilling}>Set up billing</Button>
      </Box>
    </Layout>
  );
};

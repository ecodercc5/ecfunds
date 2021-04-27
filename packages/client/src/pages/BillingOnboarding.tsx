import { Redirect } from "react-router";
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
    <div>
      <button onClick={handleSetUpBilling}>Set up billing</button>
    </div>
  );
};

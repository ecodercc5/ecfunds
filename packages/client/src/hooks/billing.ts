import { useMutation } from "@apollo/client";
import { CompleteBillingOnboardingMutation } from "../graphql/types";
import { COMPLETE_BILLING_ONBOARDING } from "../graphql/user";

export const useCompleteUserOnboarding = () => {
  return useMutation<CompleteBillingOnboardingMutation>(
    COMPLETE_BILLING_ONBOARDING
  );
};

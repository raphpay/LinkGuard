import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISubscriptionPlan from "../../models/ISubscriptionPlan";

export interface SubscriptionPlanState {
  selectedPlan: ISubscriptionPlan | undefined;
}

const initialState: SubscriptionPlanState = {
  selectedPlan: undefined,
};

export const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlans",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSelectedSubscriptionPlan: (
      state,
      action: PayloadAction<ISubscriptionPlan>
    ) => {
      state.selectedPlan = action.payload;
    },
    removeSelectedPlan: (state) => {
      state.selectedPlan = undefined;
    },
  },
});

export const { setSelectedSubscriptionPlan, removeSelectedPlan } =
  subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;

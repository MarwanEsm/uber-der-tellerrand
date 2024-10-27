// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  email: string;
  password: string;
  confirmationPassword: string;
  linkedIn: string;
  github: string;
  owner: string;
}

const initialState: FormState = {
  email: "",
  password: "",
  confirmationPassword: "",
  linkedIn: "",
  github: "",
  owner: ""
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      state.email = "";
      state.password = "";
      state.confirmationPassword = "";
      state.linkedIn = "";
      state.github = "";
      state.owner = "";
    }
  }
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;

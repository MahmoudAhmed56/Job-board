"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { pending } = useFormStatus();
  return <LoadingButton {...props} type="submit" loading={pending} />;
};

export default FormSubmitButton;

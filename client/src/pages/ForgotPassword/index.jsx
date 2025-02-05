import { useForm } from "react-hook-form";

import TextInput from "../../components/Inputs/TextInput"
import useUserStore from "../../state/user"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"
import toast from "react-hot-toast";
import { Button } from "../../components/Catalyst/button";
import { Input } from "../../components/Catalyst/input";
import { ErrorMessage, Field, FieldGroup, Label } from "../../components/Catalyst/fieldset";


const ForgotPassword = () => {
  const onForgotPassword = useUserStore(s => s.forgotPassword)
  const { register, formState: { errors }, handleSubmit, setError } = useForm();

  const onSubmit = async ({email}) => {
    const res = await onForgotPassword({
      email,
    })

    if (!res.error) {
      toast.success("Password reset email sent!", {duration: 20000, style: {background: "#62d346"}})
    }

    if (res.data?.errors) {
      Object.entries(res.data.errors).forEach(([key, value]) => {
        setError(key, {type: "manual", message: value.msg})
      })
    }
  }

  return <>
    <div className="pt-6">
      <Header />
    </div>
    <div className="w-[1280px] max-w-[98%] mx-auto mt-10 flex flex-col items-center min-h-[60vh] pb-20">
      <h1 className="text-3xl font-semibold mb-4">Forgot Password?</h1>
      <FieldGroup>
        <div className="mt-8 flex flex-col gap-4 items-center">
          <Field>
            <Label>Email</Label>
            <Input
              invalid={!!errors.email?.message}
              {...register('email', {required: "Email is required"})}
              type="email"
              label="Email"
              size={34}
            />
            {errors.email?.message && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </Field>
          
          <Button filled onClick={handleSubmit(onSubmit)}>Request password reset</Button>
        </div>
      </FieldGroup>
    </div>
    <Footer />
  </>;
}

export default ForgotPassword
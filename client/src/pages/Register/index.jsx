import { Controller, useForm } from "react-hook-form";

import useUserStore from "../../state/user"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../../components/Catalyst/button";
import { Input } from "../../components/Catalyst/input";
import { ErrorMessage, Field, FieldGroup, Label } from "../../components/Catalyst/fieldset";

const Register = () => {

  const navigate = useNavigate()

  const onRegister = useUserStore(s => s.register)
  const { register, control, formState: {errors}, watch, handleSubmit, setError } = useForm();

  const onSubmit = async ({name, email, password, confirmPassword, discountCode, source}) => {
    const res = await onRegister({
      name,
      email,
      password,
      confirmPassword,
      discountCode,
      source,
    })

    if (!res.error) {
      navigate("/app/onboarding")
    }

    if (res.data?.errors) {
      Object.entries(res.data.errors).forEach(([key, value]) => {
        setError(key, {type: "manual", message: value.msg})
      })
    }
  }

  const discountCodeTouched = watch("discountCode")

  return <>
    <div className="pt-6">
      <Header />
    </div>
    <div className="w-[1280px] max-w-[98%] mx-auto mt-10 flex flex-col items-center min-h-[60vh] pb-20">
      <h1 className="text-3xl font-semibold mb-4">Register</h1>
      <Link to="/app/login" className="underline text-primary-500">Already have an account? Log in instead</Link>
      <FieldGroup className={"flex flex-col items-center mt-8"}>
        <div className="flex flex-col gap-4">
          <Field>
            <Label>Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => 
                <Input
                  invalid={!!errors.name?.message}
                  type="text"
                  label="Name"
                  size={42}
                  {...field}
                />
              }
            />
            {errors.name?.message && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label>Email</Label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => 
                <Input
                  invalid={!!errors.email?.message}
                  type="email"
                  label="Email"
                  size={42}
                  {...field}
                />
              }
            />
            {errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label>Password</Label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => 
                <Input
                  invalid={!!errors.password?.message}
                  type="password"
                  label="Password"
                  size={42}
                  {...field}
                />
              }
            />
            {errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: "Confirm password is required" }}
              render={({ field }) => 
                <Input
                  invalid={!!errors.confirmPassword?.message}
                  type="password"
                  label="Confirm password"
                  size={42}
                  {...field}
                />
              }
            />
            {errors.confirmPassword?.message && <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label>Discount Code (optional)</Label>
            <Controller
              name="discountCode"
              control={control}
              render={({ field }) => 
                <Input
                  invalid={!!errors.discountCode?.message}
                  type="text"
                  label="Discount code (optional)"
                  size={42}
                  {...field}
                />
              }
            />
            {errors.discountCode?.message && <ErrorMessage>{errors.discountCode?.message}</ErrorMessage>}
          </Field>

          {discountCodeTouched && (
            <p>If you would like to stack codes, please email them at <a href="mailto:support@example.com">support@example.com</a> after creating your account and we will apply them to your account, thanks!</p>
          )}

          <Field>
            <Label>Where did you hear about Example?</Label>
            <Controller
              name="source"
              control={control}
              render={({ field }) => 
                <Input
                  invalid={!!errors.source?.message}
                  type="text"
                  label="Where did you hear about Example?"
                  size={42}
                  {...field}
                />
              }
            />
            {errors.source?.message && <ErrorMessage>{errors.source?.message}</ErrorMessage>}
          </Field>
        </div>
        
        <Button filled onClick={handleSubmit(onSubmit)}>Register</Button>
      </FieldGroup>
    </div>
    <Footer />
  </>;
}

export default Register
import { Controller, useForm } from "react-hook-form";
import useUserStore from "../../state/user"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"
import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/Catalyst/button";
import { Input } from "../../components/Catalyst/input";
import { ErrorMessage, Field, FieldGroup, Label } from "../../components/Catalyst/fieldset";

const ResetPassword = () => {

  const navigate = useNavigate()
  const { resetToken } = useParams()

  const onResetPassword = useUserStore(s => s.resetPassword)
  const fetchCurrentUser = useUserStore(s => s.fetchCurrentUser)
  const { register, formState: { errors }, handleSubmit, setError, control } = useForm();

  const onSubmit = async ({password, confirmPassword}) => {
    const res = await onResetPassword({
      password,
      confirmPassword,
      resetToken
    })

    if (!res.error) {
      await fetchCurrentUser()
      navigate("/app/overview")
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
      <h1 className="text-3xl font-semibold mb-4">Reset Password</h1>
      <FieldGroup className="flex flex-col items-center mt-8">
        <div className="flex flex-col gap-4">
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
                  size={34}
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
                  size={34}
                  {...field}
                />
              }
            />
            {errors.confirmPassword?.message && <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>}
          </Field>
        </div>

        <Button filled onClick={handleSubmit(onSubmit)}>Reset Password</Button>
      </FieldGroup>
    </div>
    <Footer />
  </>;
}

export default ResetPassword
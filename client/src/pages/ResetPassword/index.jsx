import { useState } from "react"
import { useForm } from "react-hook-form";

import Button from "../../components/Buttons/Button"
import TextInput from "../../components/Inputs/TextInput"
import useUserStore from "../../state/user"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {

  const navigate = useNavigate()
  const { resetToken } = useParams()

  const onResetPassword = useUserStore(s => s.resetPassword)
  const fetchCurrentUser = useUserStore(s => s.fetchCurrentUser)
  const { register, errors, handleSubmit, setError } = useForm();

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
    <Header />
    <div className="w-[1280px] max-w-[98%] mx-auto mt-10 flex flex-col items-center min-h-[60vh] pb-20">
      <h1 className="text-4xl font-semibold mb-4">Reset Password</h1>
      <TextInput
        error={errors.password?.message}
        {...register('password', {required: "Password is required"})}
        type="password"
        label="Password"
        size={34} />
      <TextInput
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {required: "Confirm password is required"})}
        type="password"
        label="Confirm password"
        size={34} />

      <Button filled onClick={handleSubmit(onSubmit)}>Reset Password</Button>
    </div>
    <Footer />
  </>;
}

export default ResetPassword
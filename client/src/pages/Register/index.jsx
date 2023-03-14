import { useState } from "react"
import { useForm } from "react-hook-form";

import Button from "../../components/Buttons/Button"
import TextInput from "../../components/Inputs/TextInput"
import useUserStore from "../../state/user"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate()

  const onRegister = useUserStore(s => s.register)
  const { register, formState: {errors}, watch, handleSubmit, setError } = useForm();

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
      <h1 className="text-4xl font-semibold mb-4">Register</h1>
      <Link to="/app/login" className="underline text-primary">Already have an account? Log in instead</Link>
      <div className="max-w-full">
        <TextInput
          error={errors.name?.message}
          {...register('name', {required: "Name is required"})}
          type="text"
          label="Name"
          size={42} />
      </div>
      <div className="max-w-full">
        <TextInput
          error={errors.email?.message}
          {...register('email', {required: "Email is required"})}
          type="email"
          label="Email"
          size={42} />
      </div>
      <div className="max-w-full">
        <TextInput
          error={errors.password?.message}
          {...register('password', {required: "Password is required"})}
          type="password"
          label="Password"
          size={42} />
      </div>
      <div className="max-w-full">
        <TextInput
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {required: "Confirm password is required"})}
          type="password"
          label="Confirm password"
          size={42} />
      </div>
      <div className="max-w-full">
        <TextInput
          {...register('discountCode')}
          error={errors.discountCode?.message}
          type="text"
          label="Discount code (optional)"
          size={42} />
      </div>
      
      {discountCodeTouched && (
        <p>If you would like to stack codes, please email them at <a href="mailto:support@example.com">support@example.com</a> after creating your account and we will apply them to your account, thanks!</p>
      )}

      <div className="max-w-full">
        <TextInput
          {...register('source')}
          error={errors.source?.message}
          type="text"
          label="Where did you hear about Example?"
          size={42} />
      </div>
      
      <Button filled onClick={handleSubmit(onSubmit)}>Register</Button>
    </div>
    <Footer />
  </>;
}

export default Register
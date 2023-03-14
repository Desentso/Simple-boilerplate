import { useForm } from "react-hook-form";

import Button from "../../components/Buttons/Button"
import TextInput from "../../components/Inputs/TextInput"
import useUserStore from "../../state/user"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"
import toast from "react-hot-toast";


const ForgotPassword = () => {
  const onForgotPassword = useUserStore(s => s.forgotPassword)
  const { register, errors, handleSubmit, setError } = useForm();

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
      <h1 className="text-4xl font-semibold mb-4">Forgot Password?</h1>
      <TextInput
        error={errors.email?.message}
        {...register('email', {required: "Email is required"})}
        type="email"
        label="Email"
        size={34} />

      <Button filled onClick={handleSubmit(onSubmit)}>Request password reset</Button>
    </div>
    <Footer />
  </>;
}

export default ForgotPassword
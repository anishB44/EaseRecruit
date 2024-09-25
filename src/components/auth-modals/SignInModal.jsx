import Modal from "../modal/Modal";
import signInImg from "@/assets/images/auth/signin-fig.png";
import { ENUM_AUTH_MODAL } from "@/enums/authModal";
import FormInputIcon from "../form/FormInputIcon";
import { IoMail, IoLockClosed } from "react-icons/io5";
import Form from "../form/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/schema/signIn";
import { useSignInMutation } from "@/redux/api/auth";
import toast from "react-hot-toast";
import { storeUserInfo } from "@/services/auth.services";
import { catchAsync } from "@/helpers/catchAsync";
import ButtonPrimary from "../ui/ButtonPrimary";

export default function SignInModal({ openAuthModal, setOpenAuthModal }) {
  const [signIn, { isLoading }] = useSignInMutation();
  const onSignUpHandle = () => setOpenAuthModal(ENUM_AUTH_MODAL.SIGN_UP);

  const onModalClose = () => {
    document.body.classList.toggle("overflow-y-hidden");
    setOpenAuthModal(null);
  };

  const onSubmit = catchAsync(async (data) => {
    const res = await signIn(data).unwrap();

    onModalClose();
    toast.success(res?.message);
    const accessToken = res?.data?.accessToken;
    storeUserInfo(accessToken);
  });

  return (
    <Modal
      openModal={openAuthModal === ENUM_AUTH_MODAL.SIGN_IN}
      toggleModal={onModalClose}
    >
      <div className="">
        <img src={signInImg} alt="" className="modal_img" />
      </div>
      <h5 className="modal_title">Welcome Back!</h5>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(signInSchema)}
        className="w-full mt-6"
      >
        <FormInputIcon
          name="email"
          placeholder="Email"
          type="email"
          icon={<IoMail className="input_icon" size={18} />}
        />
        <FormInputIcon
          name="password"
          placeholder="Password"
          type="password"
          icon={<IoLockClosed className="input_icon" size={18} />}
        />
        <ButtonPrimary
          display="Continue"
          type="submit"
          isLoading={isLoading}
          className="btn_secondary w-full"
        />
        <div className="text-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenAuthModal(ENUM_AUTH_MODAL.FORGET_PASS);
            }}
            className="mt-6 text-sm font-light text-primary cursor-pointer"
          >
            Forget Password
          </button>
          <div className="mt-6 text-sm font-light">
            New to EaseRecruit?
            <span
              onClick={onSignUpHandle}
              className="text-primary cursor-pointer ml-1"
            >
              Create an account
            </span>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

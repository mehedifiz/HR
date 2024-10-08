import Swal from "sweetalert2";
import GoogleButton from "../../components/buttons/GoogleButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultInput from "../../components/input/DefaultInput";
import DefaultLabel from "../../components/label/DefaultLabel";
import PageTitle from "../../components/pageTitle/PageTitle";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function Login() {
  const { signIn, setUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        e.target.reset();
        Swal.fire({
          icon: "success",
          title: "Logged In!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message
          .split("/")[1]
          .replace(/\)\./g, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        Swal.fire({
          icon: "error",
          title: `${errorMessage}`,
        });
      });
  };

  const handleCreateUserByGoogle = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        const usersInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          profile_image: result.user?.photoURL,
          role: "employee",
        };
        axiosPublic.post("/users", usersInfo).then((response) => {
          console.log(response.data);
          setUser(result.user);
          Swal.fire({
            icon: "success",
            title: "Employee Logged In!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message
          .split("/")[1]
          .replace(/\)\./g, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        Swal.fire({
          icon: "error",
          title: `${errorMessage}`,
        });
      });
  };

  return (
    <section className="template-container py-6 min-h-[70vh] flex items-center">
      <PageTitle title={"LogIn"} />
      <div className="mx-auto text-center w-full lg:w-1/6 md:w-3/6">
        <div>
          <SectionTitle sectionTitle={"Login"} />
          <form onSubmit={handleLogin} className="space-y-5 pb-8 md:px-0 px-2">
            <div className="space-y-5">
              <div className="flex flex-col gap-1">
                <DefaultLabel labelName={"Email"} />
                <DefaultInput
                  inputType={"email"}
                  inputName={"email"}
                  inputPlaceholder={"Email"}
                />
              </div>
              <div className="flex flex-col">
                <DefaultLabel labelName={"Password"} />
                <DefaultInput
                  inputType={"password"}
                  inputName={"password"}
                  inputPlaceholder={"Password"}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <PrimaryButton
                buttonType={"submit"}
                buttonName={"Login"}
                buttonTextColor={"text-white"}
                buttonBGColor={"bg-primary"}
              />
            </div>
          </form>
          <p className="font-roboto text-center mb-2">Or Login With Google</p>
          <span onClick={handleCreateUserByGoogle}>
            <GoogleButton />
          </span>
        </div>
      </div>
    </section>
  );
}

export default Login;
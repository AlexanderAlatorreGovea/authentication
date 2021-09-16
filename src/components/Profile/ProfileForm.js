import classes from "./ProfileForm.module.css";
import { useRef, useState, useContext } from "react";
import { FIREBASE_KEY } from "../../config";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const httpPostRequest = async (enteredNewPassword) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const json = await response.json();

      console.log(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    httpPostRequest(enteredNewPassword);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          minLength="7"
          ref={newPasswordInputRef}
          name="password"
          type="password"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;

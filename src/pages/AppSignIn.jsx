import { useNavigate } from "react-router";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";

function AppSignIn() {
    const navigate = useNavigate();
    const handleSignIn = async (event) => {
        event.preventDefault();
        const formLogin = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formLogin));
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                toast.error('Login non avvenuto!')
            } else {
                toast.success('Login completato!');
                await new Promise ((resolve) => setTimeout(resolve, 1000));
                formLogin.reset();
                navigate('/')

            }

        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="container">
            <div className="logincontainer_container">
                <div id="LoginEmail" className="login_element">
                    <h2>Accedi ora!</h2>
                    <form onSubmit={handleSignIn}>
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="test@gmail.com"
                        />
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="supersecret"
                        />
                        <button type="submit">
                            Accedi!
                        </button>
                        <Toaster richColors/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AppSignIn;
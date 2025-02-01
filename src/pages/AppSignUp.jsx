import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client"
import { Toaster, toast } from "sonner";



function AppSignUp() {
    const navigate = useNavigate
    const handleSubmission = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { email, password, username, first_name, last_name } = Object.fromEntries(new FormData(formRegister));
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data:{
                        username,
                        first_name,
                        last_name, 
                    },
                },
            })
            if (error) {
                toast.error('Registrazione non avvenuta!')
            } else {
                toast.success('Registrazione completata!');
                await new Promise ((resolve) => setTimeout(resolve, 1000));
                formRegister.reset();
                navigate('/')

            }

        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="container">
            <div className="register_container">
                <div id="Register" className="register_element">
                    <h2>Registrati ora!</h2>
                    <form onSubmit={handleSubmission}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="test username"
                        />
                        <label htmlFor="First Name">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="test first_name"
                        />
                        <label htmlFor="last name">Last name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="test last_name"
                        />
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
                            Registrati!
                        </button>
                        <Toaster richColors/>
                    </form>
                    <p>
                        Ho già un account, vai a <Link to="/signin">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AppSignUp;
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

const RegisterPage = () => {
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!username || !email || !password) {
            alert("Incorrect Values");
            return;
        }

        const data = { username, email, password };

        try {
            const res = await fetch("http://localhost:3000/api/v1/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert("Account Created");
            } else {
                console.log("Account already exists");
            }

            form.username.value = "";
            form.email.value = "";
            form.password.value = "";
        } catch (err) {
            console.log("Something went wrong", err);
        }
    }

    async function handleSubmit2(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            alert("Incorrect Values");
            return;
        }

        const data = { email, password };

        try {
            const res = await fetch("http://localhost:3000/api/v1/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });

            const backendData = await res.json();
            if (res.ok) {
                localStorage.setItem("token", backendData.token);
                localStorage.setItem("userId", backendData.userId);
                alert("You have logged in successfully");
                navigate("/HomePage");
            } else {
                alert("Login Failed");
            }
        } catch (err) {
            console.log("Something went wrong", err);
        }
    }

    return (
        <div className="flex">
            {/* Create Account Section */}
            <div className="h-screen w-[30vw] bg-slate-300 ml-32 flex flex-col justify-center items-center">
                <div>
                    <div className="text-3xl font-medium">
                        <h1>Welcome to <span className="text-3xl font-semibold text-blue-400">Second Brain</span></h1>
                    </div>
                    <div className="text-2xl font-light">Create Your Account</div>
                    <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-2">
                        <input type="text" placeholder="Username" required name="username" className="outline-none h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200" />
                        <input type="email" placeholder="Email" required name="email" className="outline-none h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200" />
                        <input type="password" placeholder="Password" required name="password" className="outline-none h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200" />
                        <button className="bg-blue-400 h-10 px-4 py-2 mt-2.5 rounded-2xl font-serif hover:bg-blue-500 ml-25">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>

            {/* Divider */}
            <div className="flex justify-center items-center w-[15vw]">
                <span className="bg-blue-500 px-4 py-3 rounded-full text-white font-light">or</span>
            </div>

            {/* Login Section */}
            <div className="flex flex-col h-screen justify-center">
                <div className="text-2xl font-light">Login Your Account</div>
                <form onSubmit={handleSubmit2} className="flex flex-col gap-3 mt-7">
                    <input type="email" placeholder="Email" required name="email" className="outline-none h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200 block shadow-lg" />
                    <input type="password" placeholder="Password" required name="password" className="outline-none h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200 block shadow-lg" />
                    <button className="bg-blue-400 px-4 py-2 rounded-2xl font-serif text-white hover:bg-blue-500 ml-32 mt-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;

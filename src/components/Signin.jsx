import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie';

const Signin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const router = useNavigate()

    const signin = async (data) => {
        try {
            const response = await axios.post('https://arraytics-shop.vercel.app/api/v1/auth/login', data)
            if (response.status === 200) {
                console.log(response.data)
                Cookies.set('accessToken', response.data.data.accessToken)
                Cookies.set("email", response.data.data.email)
                toast.success('Login Successful')
                router('/items')
            } else {
                toast.error('Login Failed')
            }
        } catch (error) {
            console.error(error)
        }


    }
    return (
        <div className="hero min-h-[95vh] bg-base-[#ddd]">
            <div className="">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold">Sign In</h1>
                </div>
                <div className="card w-[50vw]  shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(signin)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <h3 className='text-red-600 font-poppins text-lg'></h3>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered rounded-lg"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email is required',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered rounded-lg"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <Link to='/' className="label-text link link-hover">Don`&apos;t have an account? <span className="text-primary">Signup</span></Link>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary rounded-lg">Signin</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;
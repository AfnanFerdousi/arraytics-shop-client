import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const router = useNavigate()

    const signup = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/signup',
                {
                    ...data,
                    created_by: data?.email
                })
            if (response.status === 200) {
                Cookies.set('email', response.data.data.email)
                toast.success('Signup Successful')
                router('/items')
            } else {
                toast.error('Signup Failed')
            }
        } catch (error) {
            console.error(error)
        }

        
    }
    return (
        <div className="hero min-h-[95vh] bg-base-[#ddd]">
            <div className="">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold">Signup</h1>
                </div>
                <div className="card w-[50vw]  shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(signup)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered rounded-lg"
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Name is required',
                                    },
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-600">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered rounded-lg"
                                {...register('email', {
                                    required: {
                                        value: true
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
                        <Link to='/signin' className="label-text link link-hover">Already have an account? <span className="text-primary">Signin</span></Link>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary rounded-lg">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
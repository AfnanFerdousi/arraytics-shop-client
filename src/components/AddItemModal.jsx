/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import {  setItems } from '../redux/actions/itemsAction';
import Cookies from 'js-cookie';
import axios from 'axios'


const AddItemModal = ({ closeModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const email = Cookies.get('email')

    const onSubmitItem = async (data) => {
       try {
           const res = await axios.post('http://localhost:5000/api/v1/item/create-item', {
               ...data,
               created_by: email
           });
           console.log(res.data?.data)
           if (res.status === 200) {
               const updatedItems = await axios.get('http://localhost:5000/api/v1/item');
               dispatch(setItems(updatedItems.data));

               closeModal();
           }
       } catch (error) {
        console.log(error)
       }
        closeModal()
    }
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-md w-[30vw]">
                <button className=" top-2 right-[-95%] relative" onClick={closeModal}>✕</button>
                <h3 className="font-bold text-lg">Add Item</h3>
                <form onSubmit={handleSubmit(onSubmitItem)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Item Name"
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

                    <button type='submit' className="px-4 py-2 mt-4 bg-[#ddd] rounded-lg">Add</button>
                </form>
               
            </div>
        </div>
    );
};

export default AddItemModal
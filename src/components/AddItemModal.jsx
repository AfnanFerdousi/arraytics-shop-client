/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { setItems } from '../redux/actions/itemsAction';
import Cookies from 'js-cookie';
import axios from 'axios'
import Loader from './shared/Loader';
import { useState } from 'react';


const AddItemModal = ({ closeModal, edit, item }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const email = Cookies.get('email');
    const [loader, setLoader] = useState(false);

    const onSubmitItem = async (data) => {
        setLoader(true)
        try {
            let response;
            console.log(edit)
            if (edit === true) {
                response = await axios.patch(`https://arraytics-shop.vercel.app/item/${item._id}`, {
                    ...data,
                    created_by: email
                });
            }
            else {
                response = await axios.post('https://arraytics-shop.vercel.app/item/create-item', {
                    ...data,
                    created_by: email
                });
            }
            if (response.status === 200) {
                const updatedItems = await axios.get('https://arraytics-shop.vercel.app/item');
                dispatch(setItems(updatedItems.data));
                setLoader(false)
                closeModal();
            }
        } catch (error) {
            console.log(error);
            setLoader(false)
        }
        closeModal()
    }
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-md w-[30vw]">
                <button className=" top-2 right-[-95%] relative" onClick={closeModal}>✕</button>
                <h3 className="font-bold text-lg">Add Item</h3>
                {loader ? <Loader /> :
                    <form onSubmit={handleSubmit(onSubmitItem)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Item Name"
                                defaultValue={item !== null ? item?.name : null}
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

                        <button type='submit' className="px-4 py-2 mt-4 bg-[#ddd] rounded-lg">{edit ? 'Update' : 'Add'}</button>
                    </form>
                }

            </div>
        </div>
    );
};

export default AddItemModal
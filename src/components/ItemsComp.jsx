import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdEdit } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from 'react';
import AddItemModal from './AddItemModal';
import axios from 'axios';
import { setItems } from '../redux/actions/itemsAction';

const ItemsComp = () => {
    const [itemModal, setItemModal] = useState(false)
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const getItems = async () => {
        setLoader(true)
        try {
            const res = await axios.get('http://localhost:5000/api/v1/item');
            if (res.status === 200) {
                dispatch(setItems(res.data));
            }
            setLoader(false)
        } catch (error) {
            console.log(error);
            setLoader(false)
        }
    }
    useEffect(() => {
        getItems()
    }, [dispatch]);

    const allItems = useSelector((state) => state.items?.items);
    console.log(allItems?.data)

    const closeModal = () => {
        setItemModal(false)
    }
    return (
        <div className='px-12 m-6 py-12 bg-[#fffffc] rounded-lg'>
            <h1 className='text-xl text-primary '>Items</h1>
            <button
                className='flex items-center bg-[#ddd] px-6 py-2 rounded-md'
                onClick={() => setItemModal(!itemModal)}>
                Add Item <GoPlus />
            </button>
            <div className='mt-6 border rounded-md'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Created By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {allItems?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.created_by}</td>
                                        <td className='flex gap-x-4 items-center'>
                                            <button className="text-xl p-2 rounded-lg bg-green-500 text-[#fff]"><MdEdit /></button>
                                            <button className="text-xl p-2 rounded-lg bg-red-500 text-[#fff]"><MdDelete/></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {itemModal && <AddItemModal
                        closeModal={closeModal}/>}
                </div>
            </div>
            
        </div>
    );
};

export default ItemsComp;
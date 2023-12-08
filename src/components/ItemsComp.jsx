import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdEdit } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from 'react';
import AddItemModal from './AddItemModal';
import { getItems } from '../redux/reducers/itemsReducer';

const ItemsComp = () => {
    const [itemModal, setItemModal] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        getItems()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setItems(res.data));
                }
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, [dispatch]);

    const allItems = useSelector((state) => state.items);

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
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td className='flex gap-x-4 items-center'>
                                    <button className="text-xl p-2 rounded-lg bg-green-500 text-[#fff]"><MdEdit /></button>
                                    <button className="text-xl p-2 rounded-lg bg-red-500 text-[#fff]"><MdDelete/></button>
                                </td>
                            </tr>
                            {/* row 2 */}
                            <tr className="hover">
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Red</td>
                            </tr>
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
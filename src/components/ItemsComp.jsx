import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdEdit } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from 'react';
import AddItemModal from './AddItemModal';
import axios from 'axios';
import { setItems } from '../redux/actions/itemsAction';
import Loader from './shared/Loader';

const ItemsComp = () => {
    const [itemModal, setItemModal] = useState(false)
    const dispatch = useDispatch();
    const [nameFilter, setNameFilter] = useState('');
    const [loader, setLoader] = useState(false);
    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const getItems = async () => {
        setLoader(true)
        try {
            let url = `https://arraytics-shop.vercel.app/api/v1/item?page=${currentPage}`;
            if (nameFilter) {
                url += `?name=${nameFilter}`;
            }

            const res = await axios.get(url);
            if (res.status === 200) {
                dispatch(setItems(res.data));
                setTotalPages(Math.ceil(res.data.meta.total / res.data.meta.limit));
            }
            setLoader(false)
        } catch (error) {
            console.log(error);
            setLoader(false)
        }
    }
    useEffect(() => {
        getItems()
    }, [dispatch, nameFilter, currentPage]);

    const handleDelete = async (itemId) => {
        try {
            const res = await axios.delete(`https://arraytics-shop.vercel.app/api/v1/item/${itemId}`);
            console.log(res)
            if (res.status === 200) {
                // Fetch updated items and dispatch action to update the state
                getItems();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const allItems = useSelector((state) => state.items?.items);
    console.log(allItems?.data)
    const itemsToRender = Array.isArray(allItems?.data) ? allItems?.data : [];
    const closeModal = () => {
        setItemModal(false)
    }
    return (
        <div className='px-12 m-6 py-12 bg-[#fffffc] rounded-lg'>
            <h1 className='text-xl text-primary '>Items</h1>
            <div className='mt-4 mb-8 flex items-center gap-x-4'>
                <input
                    type='text'
                    value={nameFilter}
                    placeholder='Filter by name'
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="rounded-md px-4 py-2 border-[#ddd] bg-[#e3e3e3] outline-none "
                />

            </div>
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
                            {loader ? <Loader /> : itemsToRender?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th></th>
                                        <td>{item.name}</td>
                                        <td>{item.created_by}</td>
                                        <td className='flex gap-x-4 items-center'>
                                            <button onClick={() => {
                                                setEdit(true)
                                                setItem(item)
                                                setItemModal(!itemModal)
                                            }
                                            } className="text-xl p-2 rounded-lg bg-green-500 text-[#fff]"><MdEdit /></button>
                                            <button onClick={() => handleDelete(item._id)} className="text-xl p-2 rounded-lg bg-red-500 text-[#fff]"><MdDelete /></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {itemModal &&
                        <AddItemModal
                            closeModal={closeModal}
                            edit={edit}
                            item={item}
                        />
                    }


                </div>
            </div>

            {/* Pagination controls */}
            <div className='flex justify-center mt-4 items-center'>
                <button
                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    className='mr-2 px-4 py-2 bg-[#ddd] rounded-md'>
                    Prev
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className='ml-2 px-4 py-2 bg-[#ddd] rounded-md'>
                    Next
                </button>
            </div>

        </div>
    );
};

export default ItemsComp;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import { GrView } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios
      .get('http://localhost:3000/users')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    return response;
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to delete the user?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: '',
      cancelButtonText: 'No',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete('http://localhost:3000/users/' + id)
          .then((res) => {
            console.log(res);
            setData(
              data.filter((datum) => {
                return datum.id !== id;
              })
            );
            toast.success('Deleted Successfully!', {
              id: 'promiseHomeDelete',
            });
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      }
    });
  };

  useEffect(() => {
    const callFunction = fetchData();
    toast.promise(
      callFunction,
      {
        loading: 'Process',
        error: 'Error occurs in data',
        success: 'Got the data successfully....',
      },
      { id: 'promiseHome' }
    );
  }, []);

  return (
    <div className="w-full bg-neutral-100">
      <div className="w-full container py-14 mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-semibold mb-5">
            React CRUD JSON Server
          </h1>
          <div className="w-[80%] bg-transparent p-2 py-3 flex flex-col justify-start items-start gap-5">
            <div className="px-0 py-3 flex justify-end gap-2 items-center">
              <Link
                to="/create"
                className="flex justify-center items-center px-5 py-2 rounded shadow text-white bg-neutral-900 hover:bg-neutral-700 hover:shadow-lg transition"
              >
                Add User +
              </Link>
            </div>
            <div className="w-full mx-0 px-0 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {data.map((user, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md shadow-md p-4 lg:p-5 grid grid-cols-2 gap-0 justify-between items-center transition hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="font-bold">{user.name}</h3>
                    <h3>{user.email}</h3>
                    <h3>{user.number}</h3>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xl">
                    <Link
                      to={`/read/${user.id}`}
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <GrView />
                    </Link>
                    <Link
                      to={`/update/${user.id}`}
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {data.length == 0 && (
              <div className="w-full bg-transparent flex justify-center">
                <ClipLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

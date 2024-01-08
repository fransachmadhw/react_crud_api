import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios
      .get('http://localhost:3000/users')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));

    return response;
  };

  useEffect(() => {
    const callFunction = fetchData();
    toast.promise(callFunction, {
      loading: 'Process',
      error: 'Error occurs in data',
      success: 'Got the data successfully....',
    });
  }, []);
  return (
    <div className="w-full bg-neutral-100">
      <Toaster />
      <div className="w-full container py-14 mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-semibold mb-5">
            List of Users
          </h1>
          <div className="w-[80%] rounded-md bg-white shadow-md p-2 py-3">
            <div className="px-6 py-3 flex justify-end gap-2 items-center">
              <Link
                to="/create"
                className="flex justify-center items-center px-3 py-2 rounded shadow text-white bg-green-600 hover:bg-green-700 transition"
              >
                Add +
              </Link>
            </div>
            <table className="w-full text-left mb-3">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((datum, index) => (
                  <tr key={index}>
                    <td scope="col" className="px-6 py-3">
                      {datum.id}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {datum.name}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {datum.email}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {datum.number}
                    </td>
                    <td
                      scope="col"
                      className="flex px-6 justify-start gap-2 items-center "
                    >
                      <Link
                        to={`/read/${datum.id}`}
                        className="flex justify-center items-center px-3 py-2 rounded shadow text-white bg-yellow-500 hover:bg-yellow-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                      >
                        Read
                      </Link>
                      <button className="flex justify-center items-center px-3 py-2 rounded shadow text-white bg-blue-500 hover:bg-blue-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Update
                      </button>
                      <button className="flex justify-center items-center px-3 py-2 rounded shadow text-white bg-red-600 hover:bg-red-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!data && (
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

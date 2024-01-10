import React from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Read = () => {
  const [data, setData] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get('http://localhost:3000/users/' + id)
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

    const callFunction = fetchData();
    toast.promise(
      callFunction,
      {
        loading: 'Process',
        error: 'Error occurs in data',
        success: 'Read the data successfully....',
      },
      { id: 'promiseRead' }
    );
  }, [id]);
  return (
    <div>
      <div className="w-full">
        <div className="container mx-auto py-10">
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <h1 className="text-4xl font-semibold mb-5">
              Detail of User {id}
            </h1>
            <div className="w-[50%] rounded-lg bg-white shadow-md p-2 py-5 px-6">
              <h2>Name: {data.name}</h2>
              <h2>Email: {data.email}</h2>
              <h2>Number: {data.number}</h2>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                  to="/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Back
                </Link>
                <Link
                  to={`/update/${id}`}
                  className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;

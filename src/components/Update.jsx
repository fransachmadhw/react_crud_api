import axios from 'axios';
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Update = () => {
  // const [data, setData] = React.useState([]);
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    number: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.promise(
      axios
        .put('http://localhost:3000/users/' + id, values)
        .then((res) => {
          console.log(res);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          throw err;
        }),
      {
        loading: 'Loading',
        success: 'Updated successfully',
        error: 'Error when updating the data',
      },
      { id: 'promiseUpdate' }
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get('http://localhost:3000/users/' + id)
        .then((res) => {
          console.log(res);
          setValues(res.data);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });

      return response;
    };

    fetchData();
  }, [id]);

  return (
    <div className="w-full">
      <div className="w-full container mx-auto py-14">
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-semibold mb-5">
            Edit User {id}
          </h1>
          <div className="w-[50%] rounded-lg bg-white shadow-md p-2 py-3 px-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="mt-10 mb-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-12">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        autoComplete="given-name"
                        value={values.name}
                        onChange={(element) =>
                          setValues({
                            ...values,
                            name: element.target.value,
                          })
                        }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 outline-none px-3"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-12">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(element) =>
                          setValues({
                            ...values,
                            email: element.target.value,
                          })
                        }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 outline-none px-3"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-12">
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Number
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="number"
                        required
                        id="number"
                        autoComplete="number"
                        value={values.number}
                        onChange={(element) =>
                          setValues({
                            ...values,
                            number: element.target.value,
                          })
                        }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6 outline-none px-3"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Link
                    to="/"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex justify-center items-center px-5 py-2 rounded shadow text-white bg-neutral-900 hover:bg-neutral-700 hover:shadow-lg transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;

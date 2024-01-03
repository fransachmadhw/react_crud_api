import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full bg-neutral-100">
      <div className="w-full container py-14 mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-semibold mb-5">
            List of Users
          </h1>
          <div className="w-[80%] rounded-md bg-white shadow-md p-2 py-3">
            <table className="w-full text-left">
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
                      className="flex justify-center gap-2 items-center"
                    >
                      <button className="flex justify-center items-center px-3 py-2 rounded shadow text-white bg-yellow-500">
                        Read
                      </button>
                      <button className="flex justify-center items-center px-3 py-2 rounded shadow text-white bg-blue-500">
                        Update
                      </button>
                      <button className="flex justify-center items-center px-3 py-2 rounded shadow text-white bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { GrUserAdmin, GrUserWorker } from "react-icons/gr";

const AddEmployee = () => {
  const [currentUser] = useCurrentUser();
  console.log(currentUser);
  const [users, , refetch] = useUser();
  console.log(users);


  return (
    <div className="min-h-screen container mx-auto py-12">
      <div className="flex justify-center gap-8">
        <h1 className="text-3xl font-roboto font-bold">
          Total Employees:{" "}
          <span className="text-primary font-bold font-lato">
            {users.length}
          </span>
        </h1>
        <h1 className="text-3xl font-roboto font-bold">
          Members Limit:{" "}
          <span className="text-primary font-bold font-lato">
            {currentUser?.members_limit}
          </span>
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                  />
                </label>
              </th>
              <th>Image</th>
              <th>Employee Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </th>
                <td>
                  <img className="h-12 w-12 rounded" src={user?.photo} alt="Image" />
                </td>
                <td className="font-bold">{user.name}</td>
                <td>
                  {user.role === "hr" ? (
                    <div className="tooltip" data-tip="Admin">
                    <GrUserAdmin className="text-xl text-primary" />
                    </div>
                  ) : (
                    <div className="tooltip" data-tip="Employee">
                    <GrUserWorker
                      className="text-xl text-orange-500"
                      
                    />
                    </div>
                  )}
                </td>

                <td>
                  <Link>
                    <button className="font-roboto text-xs font-bold px-5 py-2 text-white bg-primary rounded uppercase">
                      Add to Team
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEmployee;

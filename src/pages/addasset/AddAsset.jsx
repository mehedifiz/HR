// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import useCurrentUser from "../../hooks/useCurrentUser";

// const AddAsset = () => {
//   const [currentUser] = useCurrentUser();
//   console.log(currentUser);
//   const axiosPublic = useAxiosPublic();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     // Handle the form submission here
//     const asset = {
//       name: data.productName,
//       type: data.type,
//       quantity: data.quantity,
//       date: new Date().toLocaleDateString(),
//       email: currentUser.email
//     };
//     axiosPublic
//       .post("/assets", asset)
//       .then((res) => {
//         if (res.data.insertedId) {
//           reset();
//           Swal.fire({
//             position: "center",
//             icon: "success",
//             title: `${data.productName} Added Successfully!.`,
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           navigate("/asset-list");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="min-h-screen py-8 xl:w-4/12 lg:w-5/12 md:w-6/12 w-full mx-auto">
//       <form
//         className="p-8 space-y-2 font-roboto border"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="flex items-center mb-8 justify-center font-bold font-roboto text-3xl uppercase">
//           <h2>Add an asset</h2>
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Product Name</strong>
//           </label>
//           <input
//             className="py-2 px-2 border focus:outline-none"
//             placeholder="Product Name"
//             type="text"
//             {...register("productName", {
//               required: "Product Name is required",
//             })}
//           />
//           {errors.productName && (
//             <p className="text-red-500 text-xs">{errors.productName.message}</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Select Product Type</strong>
//           </label>
//           <select
//             className="py-2 px-2 border focus:outline-none"
//             {...register("type", {
//               required: "Product type is required",
//             })}
//           >
//             <option value="">Select</option>
//             <option value="Returnable">Returnable</option>
//             <option value="Non-returnable">Non-Returnable</option>
//           </select>
//           {errors.type && (
//             <p className="text-red-500 text-xs">{errors.type.message}</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Product Quantity</strong>
//           </label>
//           <input
//             className="py-2 px-2 border focus:outline-none"
//             type="number"
//             placeholder="Quantity"
//             {...register("quantity", {
//               required: "Product Quantity is required",
//               validate: (value) => value > 0 || "Quantity must be positive",
//             })}
//           />
//           {errors.quantity && (
//             <p className="text-red-500 text-xs">{errors.quantity.message}</p>
//           )}
//         </div>
//         <button
//           className="btn btn-block bg-primary hover:bg-primary text-white uppercase"
//           type="submit"
//         >
//           Add Asset
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddAsset;

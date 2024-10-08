import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateAsset = () => {
  const { _id, name, type, quantity } = useLoaderData();
  //   console.log(asset);
  console.log(_id, name, type, quantity);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const assetItem = {
      name: data.name,
      type: data.type,
      quantity: data.quantity,
    };
    console.log(assetItem);
    const assetRes = await axiosPublic.patch(`/asset/${_id}`, assetItem);
    console.log(assetRes.data);
    if (assetRes.data.modifiedCount > 0) {
      
      Swal.fire({
        position: "center",
        icon: "success",
        title:  'Your asset updated successfully.',
        timer: 1000,
      });
      navigate('/asset-list')
    }

    
  };

  return (
    <div className="min-h-screen py-8 xl:w-4/12 lg:w-5/12 md:w-6/12 w-full mx-auto">
      <form
        className="p-8 space-y-2 font-roboto border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center mb-8 justify-center font-bold font-roboto text-3xl uppercase">
          <h2>Update Asset Info</h2>
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Edit Product Name</strong>
          </label>
          <input
            className="py-2 px-2 border focus:outline-none"
            defaultValue={name}
            type="text"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Update Product Type</strong>
          </label>
          <select
            defaultValue={type}
            className="py-2 px-2 border focus:outline-none"
            {...register("type")}
          >
            <option value="">Select</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-Returnable</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Update Product Quantity</strong>
          </label>
          <input
            className="py-2 px-2 border focus:outline-none"
            type="number"
            defaultValue={quantity}
            {...register("quantity", {
              validate: (value) => value > 0 || "Quantity must be positive",
            })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs">{errors.quantity.message}</p>
          )}
        </div>
        <button
          className="btn btn-block bg-primary hover:bg-primary text-white uppercase"
          type="submit"
        >
          Update Asset
        </button>
      </form>
    </div>
  );
};

export default UpdateAsset;

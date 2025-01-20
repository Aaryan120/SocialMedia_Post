import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addImages } from '../services/operations/userAPI';

function UserSubmission() {
  const [selectedImages,setSelectedImages] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm();
  const submitUserImage = async (data) =>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("handle",data.handle);
    Array.from(selectedImages).forEach((image, index) => {
      formData.append(`imageFile[${index}]`, image);
    });
    const result = await addImages(formData);
    console.log("PRINTING RESULT",result)
  }

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages(files);
  }
  return (
    <div>
        <div>
          <p className='text-3xl font-semibold mb-5 mt-4'>User Submission</p>
        </div>
        <form onSubmit={handleSubmit(submitUserImage)}>
            <div>
                  <label>
                      <p>Username:</p>
                      <input
                      type='text'
                      name='name'
                      {...register('name',{required:true})}
                      className="px-2 border border-richblack-900 rounded-md my-2 text-black w-[90%] py-2"/>
                      {
                          errors.username && <span>
                              Please enter username
                          </span>
                      }
                  </label>
                  <label>
                      <p>Social Handle:</p>
                      <input
                      type='text'
                      name='handle'
                      {...register('handle',{required:true})}
                      className=" px-2 border border-richblack-900 rounded-md my-2 text-black w-[90%] py-2"
                      />
                      {
                          errors.password && <span>
                              Please enter social handle
                          </span>
                      }
                  </label>
                  <label>
                      <p>Images</p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        name='imageFile'
                        onChange={handleImageChange}
                        className=" px-2 border border-richblack-900 rounded-md my-2 text-black w-[90%] py-2"
                      />
                      {
                          selectedImages.length === 0 && <span>
                              Please select one image
                          </span>
                      }
                  </label>
              </div>
              <div>
                  <button type='submit'
                  className='py-[8px] px-[12px] bg-richblack-700 border-1 rounded-md text-white'>
                      Submit
                  </button>
              </div>
        </form>
    </div>
  )
}

export default UserSubmission
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormField, Loader } from "../Components/Index"
import { getRandomPrompt } from '../Utilities/Index'
import Layout from "../Layout/Layout"
import { Preview } from '../Assets/Index'

const CreatePost = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', prompt: '', photo: '', })
  const [generatingImage, setGeneratingImage] = useState(false)
  const [loading, setLoading] = useState(false)

  let PORT
  if (import.meta.env.VITE_STATUS === "development") {
    PORT = import.meta.env.VITE_DEV_ENDPOINT_URL
  } else {
    PORT = import.meta.env.VITE_PROD_ENDPOINT_URL
  }

  // console.log(`${import.meta.env.VITE_STATUS} = ${PORT}`)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await fetch(`${PORT}/api/v1/Soft`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${PORT}/api/v1/Post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  }

  return (
    <Layout>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
        </div>

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Ex., Ajani Ajanlekoko"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="Cat wearing crocs"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={Preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImage && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImage ? 'Generating...' : 'Generate'}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#666e75] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? 'Sharing...' : 'Share with the Community'}
            </button>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default CreatePost
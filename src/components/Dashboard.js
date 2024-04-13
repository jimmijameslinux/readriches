import React, { useState, useEffect } from 'react';
import '../components/css/Dashboard.css';
import logo1 from '../components/img/white_read.png'
import e from 'cors';
import { BASE_URL } from './Godurl';
// import Form from 'react-bootstrap/Form';
// import { Modal } from 'bootstrap';
import { useLocation } from 'react-router-dom';



export default function Dashboard({ carddata, getCarddata, reload, setReload }) {
  const [file1, setFile] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [uploadProgress, setUploadProgress] = useState("");
  const location = useLocation();
  const [form, setForm] = useState({});
  const [notification, setNotification] = useState(null);
  const [cardId, setCardId] = useState(null);
  setReload(true);
  // console.log(carddata[0]._id);
  function handleChange(e) {
    if (e.target.name === "logoimage") {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.name === "mainimage") {
      setFile2(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.name === "video") {
      setFile3(URL.createObjectURL(e.target.files[0]));
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('company_name', form.company_name);
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('logoimage', e.target.logoimage.files[0]);
    formData.append('mainimage', e.target.mainimage.files[0]);
    formData.append('first_color', form.first_color);
    formData.append('second_color', form.second_color);
    formData.append('video', e.target.video.files[0]);

    setUploadProgress("Uploading data....")

    try {
      const response = await fetch(`${BASE_URL}/dashboard`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      setNotification({ type: 'success', message: 'Card Added successfully!' });
      setReload(true);
      setUploadProgress("");
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({ type: 'error', message: 'An error occurred while adding the card.' });
      setUploadProgress("");
    }
  };


  useEffect(() => {
    getCarddata();
  }, [reload]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('company_name', form.company_name);
    formData.append('title', form.title);
    formData.append('category', form.category);
    if (e.target.logoimage.files[0]) {
      formData.append('logoimage', e.target.logoimage.files[0]);
    }

    // Check if the main image is selected and update it
    if (e.target.mainimage.files[0]) {
      formData.append('mainimage', e.target.mainimage.files[0]);
    }

    // Check if the video is selected and update it
    if (e.target.video.files[0]) {
      formData.append('video', e.target.video.files[0]);
    }

    // Check if the color1 is different and update it
    if (form.first_color !== carddata.first_color) {
      formData.append('first_color', form.first_color);
    }

    // Check if the color2 is different and update it
    if (form.second_color !== carddata.second_color) {
      formData.append('second_color', form.second_color);
    }

    setUploadProgress("Updating data....")

    try {
      const response = await fetch(`${BASE_URL}/dashboard/${cardId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      // console.log(data);

      setNotification({ type: 'success', message: 'Card Updated successfully!' });
      setReload(true);
      setUploadProgress("");
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({ type: 'error', message: 'An error occurred while updating the card.' });
      setUploadProgress("");
    }
  };

  // if notification settimeout to 3 sec
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  }, [notification]);


  return (
    <div className="dashboard-container" style={{ color: "#fff", position: "relative" }}>
      <div className="sidebar">
        <div className="logo-container">
          <img className="logo" src={logo1} style={{ width: "100px" }} alt="Readches Logo" />
        </div>

        <span className="logo-text">Admin Panel</span>

        <a className={`nav-button ${location.pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard">
          <svg width={"1vw"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="nav-icon" role="img" aria-hidden="true"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z" className="ci-primary"></path><rect width="32" height="32" x="80" y="264" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="32" height="32" x="240" y="128" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="32" height="32" x="136" y="168" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="32" height="32" x="400" y="264" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><path fill="var(--ci-primary-color, currentColor)" d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z" className="ci-primary"></path></svg>
          Dashboard
        </a>
        {/* <a className="nav-button" href="#">

          Users
        </a>
        <a className="nav-button" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
          </svg>
          Settings
        </a> */}
      </div>

      <main className="main-page">
        <div className='everything' style={{ color: "black" }}>
          <h1>Dashboard</h1>
          <button className="btn btn-add" onClick={() => {
            document.querySelector(".case-study-container").style.display = "block";
            document.querySelector(".everything").style.display = "none";
          }

          }>Add New Card</button>
          <hr className="divider" />


          <div className="card-container" >
            {/* card data card title,hover , category, logo,main,color1,color2 stored in database display here with add btn and delete btn */}
            <div className='heading'>
              <span>S.No</span>
              <span>Logo</span>
              <span>Main Image</span>
              <span>Company Name</span>
              <span>Hover Title</span>
              <span>Category</span>
              <span>Action</span>
            </div>
            {carddata.map((card, index) => (
              <div className="dashboard_card" style={{ paddingBlock: "0.5rem" }} key={index}>
                <span>{index + 1}</span>
                <img src={`${card.logoimage}`} width={"75px"} alt="logo" />
                <img src={`${card.mainimage}`} width={"75px"} alt="main" />
                <span>{card.company_name}</span>
                <span>{card.title}</span>
                <span>{card.category}</span>

                <div className='actions' style={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}>
                  <button className="btn btn-delete"
                    onClick={() => {
                      document.querySelector("#deleteModal").style.display = "flex";
                    }}
                  >Delete
                  </button>
                  <button
                    className="btn btn-update"
                    onClick={() => {
                      document.querySelector(".case-study-container.update").style.display = "block";
                      document.querySelector(".everything").style.display = "none";
                      setForm({}); // Clear the form when opening the update form
                      setCardId(carddata[index]._id);
                      setForm({
                        company_name: carddata[index].company_name,
                        title: carddata[index].title,
                        category: carddata[index].category,
                        first_color: carddata[index].first_color,
                        second_color: carddata[index].second_color,
                        logoimage: carddata[index].logoimage,
                        mainimage: carddata[index].mainimage,
                      });
                    }}
                  >
                    Update
                  </button>
                  {/* delete modal */}
                  <div className="modal" id="deleteModal" style={{ display: "none" }}>
                    <div className="modal-content" style={{ position: "relative" }}>
                      <span className="close" style={{ cursor: "pointer" }} onClick={() => {
                        document.querySelector("#deleteModal").style.display = "none";
                      }}>&times;</span>
                      <h2>Are you sure you want to delete this card?</h2>
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <button className="btn btn-delete" onClick={async () => {
                          setUploadProgress("Deleting data....");
                          try {
                            const response = await fetch(`${BASE_URL}/dashboard/${card._id}`, {
                              method: "DELETE",
                            });
                            const data = await response.json();
                            // console.log(data);
                            getCarddata();
                            setUploadProgress("");
                          } catch (error) {
                            console.error('Error deleting card:', error);
                          }
                        }}>Delete</button>
                        <button className="btn btn-close" onClick={() => {
                          document.querySelector("#deleteModal").style.display = "none";
                        }}>Close</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))
            }
          </div>
        </div>

        <div className="case-study-container" style={{ display: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Add a New Card</h2>
            <button className="btn btn-close" onClick={() => {
              document.querySelector(".case-study-container").style.display = "none";
              document.querySelector(".everything").style.display = "block";
            }
            }>X</button>
          </div>
          <hr className="divider" />

          {notification && (
            <div className={`notification ${notification.type} show`}>
              {notification.message}
              <button className="close-btn" onClick={() => setNotification(null)}>
                &times;
              </button>
            </div>
          )}


          <form className="case-study-form" onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="form-group">
              <label htmlFor="caseStudyTitle">Card Company name:</label>
              <input type="text" id="caseStudyTitle" name="company_name" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="caseStudyHoverTitle">Card Hover Title:</label>
              <input type="text" id="caseStudyHoverTitle" name="title" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="caseStudyHoverTitle">Card Category:</label>
              <input type="text" id="caseStudyHoverTitle" name="category" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="logoImage">Logo Image:</label>
              <input type="file" id="logoImage" name="logoimage" accept="image/*" onChange={handleChange} required />
              <img src={file1} width={file1 && 150} height={file1 && 100} />
            </div>

            <div className="form-group">
              <label htmlFor="mainImage">Main Image:</label>
              <input type="file" id="mainImage" name="mainimage" accept="image/*" onChange={handleChange} required />
              <img src={file2} width={file2 && 150} height={file2 && 100} />
            </div>

            {/* video */}
            <div className="form-group">
              <label htmlFor="video">Case Study Video:</label>
              <input type="file" id="video" name="video" accept="video/*" onChange={handleChange} required />
              <video src={file3} width={file3 ? 150 : 0} height={file3 ? 100 : 0} />
            </div>

            <div className="form-group">
              <label htmlFor="color1">gradient colour 1:</label>
              <input type="color" id="color1" name="first_color" value={form.first_color || "#eeeeee"} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="color2">gradient colour 2:</label>
              <input type="color" id="color2" name="second_color" value={form.second_color || "#ffffff"} onChange={handleChange} required />
            </div>

            <span style={{ fontSize: "2rem" }}>
              {uploadProgress}
            </span>



            <div style={{ display: "flex", position: "absolute", bottom: "-5rem", width: "100%", justifyContent: "center" }}>
              <button type="submit" style={{ width: "30%", paddingBlock: "1rem" }}>Submit</button>

            </div>
          </form>
        </div>

        {/* same as add create update */}
        <div className="case-study-container update" style={{ display: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Update Card</h2>
            <button className="btn btn-close" onClick={() => {
              document.querySelector(".case-study-container.update").style.display = "none";
              document.querySelector(".everything").style.display = "block";
            }
            }>X</button>


          </div>
          <hr className="divider" />

          {notification && (
            <div className={`notification ${notification.type} show`}>
              {notification.message}
              <button className="close-btn" onClick={() => setNotification(null)}>
                &times;
              </button>
            </div>
          )}

          <form className="case-study-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="caseStudyTitle">Card Company name:</label>
              <input
                type="text"
                id="caseStudyTitle"
                name="company_name"
                value={form.company_name || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="caseStudyHoverTitle">Card Hover Title:</label>
              <input
                type="text"
                id="caseStudyHoverTitle"
                name="title"
                value={form.title || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="caseStudyCategory">Card Category:</label>
              <input
                type="text"
                id="caseStudyCategory"
                name="category"
                value={form.category || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="logoImage">Logo Image:</label>
              <input
                type="file"
                id="logoImage"
                name="logoimage"
                accept="image/*"
                // value={e.target.logoimage.files[0] || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mainImage">Main Image:</label>
              <input
                type="file"
                id="mainImage"
                name="mainimage"
                accept="image/*"
                // value={e.target.mainimage.files[0] || ''}
                onChange={handleChange}
              />
            </div>

            {/* Video */}
            <div className="form-group">
              <label htmlFor="video">Card Video:</label>
              <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                // value={e.target.video.files[0] || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="color1">Gradient Color 1:</label>
              <input
                type="color"
                id="color1"
                name="first_color"
                value={form.first_color || '#eeeeee'}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="color2">Gradient Color 2:</label>
              <input
                type="color"
                id="color2"
                name="second_color"
                value={form.second_color || '#ffffff'}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", position: "absolute", bottom: "-5rem", width: "100%", justifyContent: "center" }}>
              <button type="submit" style={{ width: "30%", paddingBlock: "1rem" }}>Submit</button>

            </div>
          </form>

        </div>


      </main>
      {

        uploadProgress &&

        <div className='carduploadingprogress'>
          <h1>{uploadProgress}</h1>
          {/* please dont refresh or go back or close the window */}
          <h3>please don't refresh or go back or close the window</h3>
          <span className="loader"></span>
        </div>
      }


    </div>
  );
}
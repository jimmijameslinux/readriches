import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from './Godurl';
import "../components/css/Userprofile.css"

const Userprofile = ({ loginStatus, email, picture, userid, setName, setEmail, setPicture, name }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedImage, setSelectedImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newName = document.getElementById('name').value;
        // const newEmail = document.getElementById('email').value;

        try {
            // Perform your fetch request to submit the form data
            const response = await fetch(`http://localhost:3001/userprofile/${userid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName, picture: selectedImage }),
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming the server returns a success message or token, you can redirect here
                // navigate('/userprofile');

                console.log(data);

                setName(newName); // Update the name state with the new name
                // setEmail(newEmail);
                setPicture(selectedImage);

                // setNewname(name);
            } else {
                const errorData = await response.json();
                console.error('Userprofile failed:', errorData.error);
            }
        }
        catch (error) {
            console.error('Error during userprofile:', error);
            // Handle network errors, etc., and set the state htmlFor displaying a notification
        }
        // };

        // Read the file as a data URL
        // reader.readAsDataURL(profileimageFile);
    };



    if (location.pathname.startsWith('/userprofile') && !loginStatus.success) {
        navigate('/login');
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Sidebar />
            <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                {/* <p style={{ marginTop: "5rem" }}>Userprofile</p> */}
                <form className="case-study-form" style={{ marginTop: "5rem" }} onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder={name} name="name" />
                    </div>

                    <div className="form-group">

                        <label htmlFor="name">Profile Image:</label>
                        <div className="avatar-upload">
                            <div className="avatar-edit">
                                {/* <label htmlFor="name">Name:</label> */}
                                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
                                <label htmlFor="imageUpload"></label>
                            </div>
                            <div className="avatar-preview">
                                <div id="imagePreview" style={{
                                    backgroundImage: `url(${selectedImage ? selectedImage : picture})`,
                                }}>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* email */}

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <p>{email}</p>
                    </div>

                    {/* password */}

                    {/* <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div> */}

                    {/* phone no. */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" placeholder='+91 6377328870' name="phone" />
                    </div>

                    <div style={{ display: "flex", position: "absolute", bottom: "-5rem", width: "100%", justifyContent: "center" }}>
                        <button type="submit" style={{ width: "30%", paddingBlock: "1rem" }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Userprofile;

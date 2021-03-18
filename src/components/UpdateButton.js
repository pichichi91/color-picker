import React, { useState } from 'react';
import styled from "styled-components"
import { createClient } from 'contentful-management'
import { ToastContainer, toast } from 'react-toastify';
import { ToastWrapper } from "./Styles"

const ToastMessage = ({ club }) => (
    <div>
        <strong>  {club}  </strong> have been added to Database - wait for an Administrator to confirm it
    </div>
)


const UpdateButton = ({ imageUrl, pixels }) => {

    const [clubName, setClubName] = useState("");



    const onSubmit = () => {

        const lastModified = new Date();

        const spaceId = process.env.REACT_APP_SPACE_ID;
        const accessToken = process.env.REACT_APP_CONTENT_TOKEN;


        const environment = "master"
        const contentType = "clubs"

        const client = createClient({
            accessToken: accessToken
        })

        const colors = {}
        colors["colors"] = pixels;

        client.getSpace(spaceId)
            .then((space) => space.getEnvironment(environment))
            .then((environment) => environment.createEntry(contentType, {
                fields: {
                    name: {
                        'en-US': clubName
                    },
                    colors: {
                        "en-US": colors
                    },
                    modified: {
                        "en-US": lastModified
                    },
                    url: {
                        "en-US": imageUrl
                    }
                }
            }))
            .then((entry) => {
                toast(<ToastMessage club={clubName} />, {
                    position: "bottom-center",
                    autoClose: 5500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setClubName("")

            })
            .catch(console.error)




    }

    return (
        <FormWrapper>
            <StyledForm onSubmit={(event) => event.preventDefault()}>
                <FormInput>
                    <label>Clubname</label>
                    <input type="text" value={clubName} onChange={(event) => setClubName(event.target.value)} />
                </FormInput>
                <StyledButton onClick={onSubmit}>Request Club to be added</StyledButton>

            </StyledForm>
            <ToastWrapper>
                <ToastContainer />

            </ToastWrapper>
        </FormWrapper>
    );
}

const FormInput = styled.div`

label {
    width: 20%;
    text-align: left
}

input {width: 80%;
    font-size: 1em;
    border: none;
    border-bottom: 1px solid;
    background: none;
    padding-bottom: 0.3em;


}

button:focus, input:focus{
    outline: none;
}

display: flex;
    margin-bottom: 1em;
    font-size: 1.5em;
    font-weight: 700;

    @media screen and (max-width: 768px) {
    flex-direction: column;
    input {
        width: 100%;
    }
    }
  
`


const StyledButton = styled.button`
    background-color: #0000001f;
    padding: 0.5em;
    border: 0px solid white;
    margin-bottom: 1em;
    font-size: 1.2em;
    font-weight: bold;
    color: black;
    margin-right: 1em;

    align-items: center;
    width: 300px;
    cursor: pointer;
    box-shadow: 6px 6px 0px 0px #000000ab;
    border-radius: 2px;
    transition: all 0.2s ease-out;
:focus{
    outline: none;
}

:hover {
  box-shadow: 15px 15px 0px 0px #000000ab;

}
`



const FormWrapper = styled.div`

padding-top: 5em;

width: 90%;
    display: flex;
    justify-content: center;
    `


const StyledForm = styled.form`
width: 80%;
display: flex;
flex-direction: column;
border-bottom: 15px solid #a9a9a914;
padding-bottom: 5em;

@media screen and (max-width: 768px) {

align-items: center;
}
`

export { UpdateButton };
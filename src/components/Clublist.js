import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Clubcolors } from "./Clubcolors"
const Clublist = () => {

    const spaceId = process.env.REACT_APP_SPACE_ID;
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

    const query = `{
    clubcolorsCollection {
      items {
        name
        colors
        url
      }
      
    }
  }
    `

    const [colors, setColors] = useState([]);

    useEffect(() => {
        fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ query }),
        })
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }

                const colors = data.clubcolorsCollection.items;
                console.log("🚀 ~ file: ClubList.js ~ line 39 ~ .then ~ colors", colors)

                setColors(colors);
            });
        // eslint-disable-next-line
    }, [])


    if (colors.length === 0) {
        return (<></>)
    }

    return (
        <Clublisting>
            <ListingHeader>All Clubs</ListingHeader>
            {colors.map((club) => {
                return (
                    <StyledClubRow>
                        <ClubTitle> <div>{club.name}</div><Clublogo src={club.url} /></ClubTitle>

                        <Clubcolors colors={club.colors} />
                    </StyledClubRow>
                )

            })}

        </Clublisting>
    );
}

const ListingHeader = styled.h2`
font-size: 2.5em;
text-align: left;
margin-left: 0.5em;


`

const Clublisting = styled.div`
width: 75%;
margin-top: 1em;
margin-bottom: 2em;
@media screen and (max-width: 768px) {
    width: 90%;

`
const StyledClubRow = styled.div`
display: flex;
margin: 0 1em;
border-bottom: 5px solid #a9a9a929;
padding: 4em 0;
justify-content: space-between;
`
const ClubTitle = styled.div`
font-weight: 500;
font-size: 1.5em
@media screen and (max-width: 768px) {
    justify-content: space-between;


`

const Clublogo = styled.img`

    width: 100px;
    height: auto;
    margin-top: 1em;
`



export { Clublist };
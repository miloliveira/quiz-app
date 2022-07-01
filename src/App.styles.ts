import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import bgimage from "./images/resul-mentes.jpg";

export const GlobalStyle = createGlobalStyle`

html{
height:100vh;
width:100vw;
padding:0;
margin:0;
border:none;
}


body{
height:100%;
width:100%;
background-image: url(${bgimage});
background-repeat:no-repeat;
background-size: cover;
margin:0;
bordor:none;
padding: 0 20px;
display:flex;
justify-content: center;
}

*{
    box-sizing: border-box;
    font-family:"Catamaran", sans-serif;
}


`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: black;
  }
  > h1 {
    font-family: Fascinate Inline;

    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  .btnStart,
  .btnNext {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .btnStart {
    max-width: 200px;
  }
`;

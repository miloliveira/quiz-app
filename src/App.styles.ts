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
    color: #000;
    font-size: 2rem;
    margin: 0;
  }

  .btnStart,
  .btnNext {
    cursor: pointer;
    background-color:#073e57;
    border-radius: 10px;
    border:none;
    height: 40px;
    margin: 20px 0;
    padding: 0 30px;
    color:#fff;
  }

  .btnStart {
    max-width: 200px;
  }
`;

export const StartBtnDiv = styled.div`


width: 420px;
display:flex;
align-items:center;
justify-content:center;


`
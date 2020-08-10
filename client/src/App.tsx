import React from 'react';
import styled, {createGlobalStyle} from "styled-components";
import TrainingList from "./components/training-list";
import EditForm from "./components/edit-form";

export const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: Calibri, sans-serif;
    }
`;

export const Main = styled.div`
    margin: 0;
    padding: 0;
    height: 900px;
    background: #f6f6f6;
`;

export const Content = styled.div`
    margin: auto;
    max-width: 1250px;
    height: 100%;
`;


const Header = styled.div`
    height: 60px;
    width: 100%;
    background: coral;
`;

const Logo = styled.div`
    text-align: left;
    padding: 10px 20px;
    width: 250px;
    height: 50px;
    font-family: Calibri, sans-serif;
    font-size: 30px;
    font-weight: bold;
    @media (max-width: 500px) {
        text-align: center;
        width: 100%;
        padding: 10px 0;
    }
`;

const App = () => {
    return (
        <Main>
            <Header>
                <Logo>
                    BestRunner
                </Logo>
            </Header>
            <Content>
                <EditForm />
                <TrainingList />
            </Content>
            <GlobalStyle/>
        </Main>
    );
};

export default App;

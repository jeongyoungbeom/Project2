import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderForm = styled.div`
    background-color: rgb(248, 250, 252);
    width: 100%;
    height: 7rem;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    margin-top: 0;
    box-shadow: 3px 3px 3px rgb(240,240,240);
    padding-top: 1rem;
    .main-logo {
        margin-left: 5%;
    }
    .logout-logo {
        margin-left: 83%;
    }
    .logo {
        width: 10rem;
    }
    .logo2 {
        width: 3.5rem;
    }
`;
const Header = () => {
    
    return (
        <HeaderForm>
            <Link to="/admin" className="main-logo">
                <img src="/img/admin/us_logo.png" className="logo"/>
            </Link>
            <Link to="/admin/login" className="logout-logo" >
                <img src="/img/admin/logout.png" className="logo2"/>
            </Link>  
        </HeaderForm>  
    );
}

export default Header;
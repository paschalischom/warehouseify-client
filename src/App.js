import React from "react";
import styled from "styled-components";
import HomePage from './components/layouts/HomePage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Login, SignUp, AuthIsLoaded, PrivateRoute, PublicRoute} from './components/layouts/Authentication';
import {Footer, Header} from "./components/layouts";
import LandingPage from "./components/layouts/LandingPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#db460e',
        }
    }
});

const AppLayout = styled.div`
    display: grid;
    grid-template-columns: ;
    grid-template-rows: 0.1fr 1.8fr;
    height: 100%;
    width: 100%;
    background: inherit;
`;

const StyledHeader = styled(Header)`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
`

const MainContent = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export default function App() {

    return (
        <MuiThemeProvider theme={theme}>
            <AppLayout>
                <Router>
                    <AuthIsLoaded>
                        <StyledHeader />
                        <MainContent>
                            <Switch>
                                <Route path={'/'} exact>
                                    <LandingPage />
                                </Route>
                                <PrivateRoute path={'/main'}>
                                    <HomePage />
                                </PrivateRoute>
                                <PublicRoute path={'/signup'}>
                                    <SignUp />
                                </PublicRoute>
                                <PublicRoute path={'/login'}>
                                    <Login />
                                </PublicRoute>
                            </Switch>
                        </MainContent>
                        <Footer />
                    </AuthIsLoaded>
                </Router>
            </AppLayout>
        </MuiThemeProvider>
    )
}

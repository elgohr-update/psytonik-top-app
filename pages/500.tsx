import React from 'react';import withLayout from "../layout/BaseLayout";import {Htag} from "../components";export const Error500 = ():JSX.Element => {    return (        <>            <Htag tag="h1">Page not found 500</Htag>        </>    );};export default withLayout(Error500);
import React from "react";
import Button from "../../components/Button";

const Page404 = ({ history }) => (
  <div>
    <h1>404: Page not found</h1>
    <p>It doesn't look like that page exists</p>
    <Button action={() => history.goBack()}>Back</Button>
  </div>
);

export default Page404;

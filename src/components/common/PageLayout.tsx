import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";




type Props = {
  children?: React.ReactNode;
  verticalKey :string;
  limit : number;
};

const PageLayout = ({verticalKey, children,limit }: Props) => {
  console.log(verticalKey,"verticalKey")
  return (
    <div className="min-h-screen">
      <Header/>
      <Navigation verticalKey={verticalKey} limit={limit}/>
      {children}
      <Footer/>
    </div>
  );
};

export default PageLayout;
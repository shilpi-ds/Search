import { useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { UniversalLimit } from "../../config/searchConfig";

type Props = {
  verticalKey :string;
  limit : number;
};

const  Navigation = ({verticalKey,limit} : Props)=> {
  console.log(verticalKey,"verticalKeynavigation")

  if(verticalKey == "null"){
    const searchActions = useSearchActions();
    React.useLayoutEffect(() => {
      searchActions.setUniversal();
      searchActions.setUniversalLimit(UniversalLimit);
      searchActions.executeUniversalQuery();
    });
  }else{
    const searchActions = useSearchActions();
    React.useLayoutEffect(() => {
      searchActions.setVertical(verticalKey);
      searchActions.setVerticalLimit(limit);
      searchActions.executeVerticalQuery();
    });
  
  }
  

  return (
    <div className='flex flex-row'>
      <a className='text-blue-500 hover:underline p-2' href='/'>All</a>
      <div className='border-l-2 border-indigo-400 h-6 mt-2'></div>
      <a className='text-blue-500 hover:underline p-2' href='./locations'>Location</a>
      <div className='border-l-2 border-indigo-400 h-6 mt-2'></div>
      <a className='text-blue-500 hover:underline p-2' href='./product'>Products</a>
      <div className='border-l-2 border-indigo-400 h-6 mt-2'></div>
      <a className='text-blue-500 hover:underline p-2' href='./faq'>FAQ,s</a>
      <div className='border-l-2 border-indigo-400 h-6 mt-2'></div>
      
    </div>
  );
};
export default Navigation;
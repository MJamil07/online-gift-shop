import { QueryType } from '../Home';
import '../styles/inputBox.css'; 
import React from 'react';

const InputBox =  ( {searchProduct} : {searchProduct : (query: QueryType) => void} ) => {
       const [search , setSearch] = React.useState<string>()

       const handleEnter = (event : React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                     searchProduct({name : search})
              }
       }
       return (
              <div className="input-box-container">
                     <input 
                            type="text" 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder="Search by Product name.." 
                            className="input-box" 
                            onKeyPress={handleEnter}
                     />
              </div>
       );
};

export default InputBox;

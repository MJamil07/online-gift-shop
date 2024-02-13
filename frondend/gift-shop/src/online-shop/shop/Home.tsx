import Navbar from './uiUtils/Navbar';
import InputBox from './uiUtils/InputBox';
import CategoriesCard from './uiUtils/CategorieCard';
import './styles/home.css';

import Book from '../../images/categorie/books.png';
import Cloth from '../../images/categorie/clothes.png';
import Electronic from '../../images/categorie/gadgets.png';
import Flower from '../../images/categorie/iris.png';
import Toy from '../../images/categorie/blocks.png';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import Product from './uiUtils/Product'
import React, { useState } from 'react';
import axios from 'axios';
import URL from '../utils/url';
import Loading from './uiUtils/Loding';



export type ProductType = {
       _id: string
       name: string;
       price: number;
       image: string | null;
       categories: string;
       rating: number;
       description?: string;
       message?: string;
       quantity: number;
}
export type QueryType = { name?: string, categorie?: string }


const Home = () => {
       const categories = [{ Book }, { Flower }, { Cloth }, { Toy }, { Electronic } ];
       const [products, setProducts] = useState<ProductType[]>()
       

       React.useEffect(() => {
              async function fetchData() {
                     try {
                            const response = await axios.get(`${URL}/gift/all_gifts`)
                                   .then((data) => {
                                          setProducts(data.data);
                                   })
                     } catch (error) {
                            console.error('Error fetching data:', error);
                     }
              }

              fetchData();
       }, [])

       const searchProductAndCategorie = async (query: QueryType) => {
              let searchEndpoint = '/gift/search/?'
              if (Object.hasOwn(query, 'name')) {
                     searchEndpoint += `name=${query.name}`
              }
              if (Object.hasOwn(query, 'categorie')) {
                     searchEndpoint += `categorie=${query.categorie}`
              }
              try {
                     const response = await axios.get(`${URL}${searchEndpoint}`).then((data) => { setProducts(data.data) })
              } catch (error) {
                     console.error('Error fetching data:', error);
              }

       }

       return (
              <div className="container">
                     <Navbar />
                     <div>
                            <InputBox searchProduct={searchProductAndCategorie} />
                            <h2 style={{ textAlign: 'center' }} className="category-heading m-4">Categorie</h2>
                            <div >
                                   <MDBRow  className='row-cols-6  justify-content-center align-item-center '>
                                          {categories.map((category, index) => (
                                                 <button  
                                                        key={index} 
                                                        onClick={() => searchProductAndCategorie({ categorie: Object.keys(category)[0] })} 
                                                        className='btn p-3'
                                                 >
                                                        <CategoriesCard src={Object.values(category)[0]} />
                                                 </button>
                                          ))}
                                   </MDBRow>
                            </div>
                     </div>
                     <div className='product-container'>
                            <      h2 style={{ textAlign: 'center' }} className="product-heading mt-2">Products</h2>

                            <MDBContainer>
                                   <MDBRow className='justify-content-center align-item-center '>
                                          {products ? products.map((product) => (
                                                 <Product key={product._id} product={product} />
                                          )) :  <Loading/> }
                                   </MDBRow>
                            </MDBContainer>
                     </div>
              </div>
       );
};

export default Home;



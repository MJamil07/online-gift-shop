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
import React , { useState  } from 'react';
import axios from 'axios';
import URL from '../utils/url';


export type ProductType = {
       _id : string
       name: string;
       price: number;
       image: string | null;
       categories: string;
       rating: number;
       description?: string;
       message?: string;
       quantity: number;
}

const Home = () => {
       const  categories = [Book, Toy, Cloth, Electronic, Flower];
       const [products , setProducts] = useState<ProductType[]>()
       const [search , setSearch] = useState<string>()
       const [categorie , setCategorie] = useState<string>()

       React.useEffect(() => {
              async function fetchData() {
                     try {
                            const response = await axios.get(`${URL}/gift/all_gifts`).then((data) => {setProducts(data.data)} )
                     } catch (error) {
                            console.error('Error fetching data:', error);
                     }
              }
              
              fetchData();
       }, [search , categorie])
       

       return (
              <div className="container">
                     <Navbar />
                     <div className="content-container">
                            <InputBox />
                            <h2 style={{textAlign : 'center'}} className="category-heading mt-5">Categories</h2>
                            <div  className="category-container">
                                   <MDBRow style={{marginLeft : '13%'}} className='row-cols-1 row-cols-md-5 g-2'>
                                          {categories.map((category, index) => (
                                                 <CategoriesCard key={index} src={category} />
                                          ))}
                                   </MDBRow>
                            </div>
                     </div>
                     <div  className='product-container'>
                     <      h2 style={{textAlign : 'center'}} className="product-heading mt-5">Products</h2>
                            
                            <MDBContainer fluid>
                                          {products && products.map((product, index) => (
                                                 <Product key={product._id} product = {product} />
                                          ))}
                            </MDBContainer>
                     </div>
              </div>
       );
};

export default Home;



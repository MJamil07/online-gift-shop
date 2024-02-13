
import { MDBCard, MDBCardImage, MDBCardText, MDBCol } from 'mdb-react-ui-kit';


const CategoriesCard = ({ src , name } : { src : string , name : string }) => (
              <MDBCol>
                     <MDBCard>
                            <MDBCardImage
                                   src = {src}
                                   alt='...'
                                   position='top'
                                   className="align-self-center fluid cover"
                            />
                            <MDBCardText className='text-truncate'>
                                          {name}
                                   </MDBCardText>
              
                     </MDBCard>
              </MDBCol>
);



export default CategoriesCard;

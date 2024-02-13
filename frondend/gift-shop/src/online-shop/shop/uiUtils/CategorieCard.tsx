
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol } from 'mdb-react-ui-kit';


const CategoriesCard = ({ src } : { src : string }) => (
              <MDBCol >
                     <MDBCard className='p-3'>
                            <MDBCardImage
                                   src = {src}
                                   alt='...'
                                   position='top'
                                   className="align-self-center fluid cover"
                            />
                            <MDBCardBody>
                                   <MDBCardText>
                                   </MDBCardText>
                            </MDBCardBody>
                     </MDBCard>
              </MDBCol>
);



export default CategoriesCard;

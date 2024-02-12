
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol } from 'mdb-react-ui-kit';


const CategoriesCard = ({ src } : { src : string }) => (
              <MDBCol>
                     <MDBCard className='h-100 w-100'>
                            <MDBCardImage
                                   src = {src}
                                   alt='...'
                                   position='top'
                                   className="align-self-center"
                            />
                            <MDBCardBody>
                                   <MDBCardText>
                                   </MDBCardText>
                            </MDBCardBody>
                     </MDBCard>
              </MDBCol>
);



export default CategoriesCard;

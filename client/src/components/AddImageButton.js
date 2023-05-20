import React, {useState} from 'react'
import LoadingSpinner from './LoadingSpinner';

function AddImageButton({ listing_id }) {
  const [success, setSuccess] = useState(false);
  //const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState();

  const handleChange = (event) => {
      setImageFile(event.target.value);
      console.log(imageFile);
      const formData = new FormData();
      formData.append("image", imageFile);
      console.log(formData);
  } 

  const handleSubmit = async (event) => {
      setSuccess(true);
    };
    
    if (success) window.location.reload();
    if (loading) return <LoadingSpinner/>;
  return (
        <div className="row">
            <div className="col-10 col-md-8 col-lg-7 mt-3">
                <button type="button" class="btn btn-primary mx-auto" data-bs-toggle="modal" data-bs-target="#imageModal">
                Add an image
                </button>
                
                <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    {/*Modal Header*/}
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="imageModalLabel">Select a file</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {/*Modal Body*/}
                    <div class="modal-body">
                        <input type="file" accept="image/*" multiple={false} class="form-control file" name="upload-file" onChange={handleChange}/>
                        <small class="form-text text-muted"> This feature is incomplete; while you can select an image from your files to submit, it won't be stored in the database </small>
                    </div>
                    {/*Modal Footer*/}
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleSubmit} class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                    </div>
                    </div>
                </div>
                </div>


            </div>
        </div>
);
}

export default AddImageButton;
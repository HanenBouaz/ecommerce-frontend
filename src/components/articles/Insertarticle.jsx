import React, { useEffect, useState } from 'react'
import { Form, Row ,Col} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
const Insertarticle = () => {
  const navigate=useNavigate()
  const[article,setArticle]=useState({})
  const[scategories,setScategorie]=useState([])
  const [files, setFiles] = useState([]);
  const loadscategories=async()=>{
    try {
      const res=await axios.get("https://e-commerce-tau-six-49.vercel.app/api/api/scategories")
      setScategorie(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    loadscategories()
  },[])
  const handleSave=async(e)=>{
    e.preventDefault()//bch y5alili kn champs eli 8lot fih
    await axios.post("https://e-commerce-tau-six-49.vercel.app/api/api/articles",article)
    .then(res=>{
      navigate("/articles")
    })
  }
  const serverOptions = () => { console.log('server pond');
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
          console.log(file)
        const data = new FormData();
        
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce');
        data.append('cloud_name', 'dxc5curxy');
        data.append('publicid', file.name);
  
        axios.post('https://api.cloudinary.com/v1_1/dxc5curxy/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
           setArticle({...article,imageart:data.url}) ;
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <center><h1>Ajouter Article</h1></center>
      <Form>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Référence</Form.Label>
            <Form.Control type="text" placeholder="Référence"
              value= {article.reference}
              onChange={(e)=>setArticle({...article,reference:e.target.value})}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Désignation</Form.Label>
            <Form.Control type="text" placeholder="Désignation" 
              value= {article.designation}
              onChange={(e)=>setArticle({...article,designation:e.target.value})}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Marque</Form.Label>
            <Form.Control type="text" placeholder="Marque" 
              value= {article.marque}
              onChange={(e)=>setArticle({...article,marque:e.target.value})}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" placeholder="Stock" 
              value= {article.qtestock}
              onChange={(e)=>setArticle({...article,qtestock:e.target.value})}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="number" placeholder="Prix" 
              value= {article.prix}
              onChange={(e)=>setArticle({...article,prix:e.target.value})}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Image</Form.Label>
            <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
              <FilePond
                files={files}
                acceptedFileTypes="image/*"
                onupdatefiles={setFiles}
                allowMultiple={true}
                server={serverOptions()}
                name="file"
              />
            </div> 
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Sous-catégorie</Form.Label>
            <Form.Control type="select" as={"select"} placeholder="Sous-catégorie" 
              value= {article.scategorieID}
              onChange={(e)=>setArticle({...article,scategorieID:e.target.value})}
            >
             {
                scategories.map((scat,index)=>

                    <option value={scat.id}>{scat.nomscategorie}</option>

                )
              }
            </Form.Control>
          </Form.Group>
        </Row>
        <button className='btn btn-success' onClick={(e)=>handleSave(e)}><i className="fa-solid fa-floppy-disk"></i> Enregistrer</button>&ensp;
        <Link to="/articles"><button className='btn btn-danger'><i className="fa-solid fa-arrow-right-from-bracket"></i> Annuler</button></Link>
      </Form>
    </div>
  )
}

export default Insertarticle

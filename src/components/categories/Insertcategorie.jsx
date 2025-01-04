import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Insertcategorie = () => {
  const navigate=useNavigate()
  const[categorie,setCategorie]=useState({})
  const handleSave=async(e)=>{
    e.preventDefault()//bch y5alili kn champs eli 8lot fih
    await axios.post("https://e-commerce-tau-six-49.vercel.app/api/api/categories",categorie)
    .then(res=>{
      navigate("/categories")
    })
  }
  return (
    <div>
      <h1>Ajouter catégorie</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nom catégorie</Form.Label>
          <Form.Control type="text" placeholder="Nom catégorie" 
            value={categorie.nomcategorie}
            onChange={(e)=>setCategorie({...categorie,nomcategorie:e.target.value})} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image catégorie</Form.Label>
          <Form.Control type="text" placeholder="Image catégorie" 
            value={categorie.imagecategorie}
            onChange={(e)=>setCategorie({...categorie,imagecategorie:e.target.value})} 
          />
        </Form.Group>
        <button className='btn btn-success' onClick={(e)=>handleSave(e)}><i className="fa-solid fa-floppy-disk"></i> Enregistrer</button>&ensp;
        <Link to="/categories"><button className='btn btn-danger'><i className="fa-solid fa-arrow-right-from-bracket"></i> Annuler</button></Link>
      </Form>
    </div>
  )
}

export default Insertcategorie

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
const Listcategories = () => {
  const[categories,setCategories]=useState([])
  const[isLoading,setIsLoading]=useState(true)

  const fetchCategories=async()=>{
    try{
      const res=await axios.get("https://e-commerce-tau-six-49.vercel.app/api/api/categories")
      setCategories(res.data)//5ter res fiha plusieurs information w a7na 7chetna kn b data 
      setIsLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  //useEffect c'est une hoox
  useEffect(()=>{
    fetchCategories()
  },[])// nzid l [] bech n9ololo emchi w ija mara bark 5tr m 3andench app temps reelle

  if(isLoading){
    return (
      <div>
        <center>
          <ReactLoading type="spinningBubbles" color="red" height={400} width={175} />
        </center>
      </div>
    )
  }
  const handleDelete=async(id)=>{
    if (window.confirm("voulez-vous supprimer cette catégorie?")){
      await axios.delete(`https://e-commerce-tau-six-49.vercel.app/api/api/categories/${id}`)
      .then(res=>{
        setCategories(categories.filter(cat=>cat.id!=id))
      })
    }
  }
  return (
    <div>
      <Link to="/categories/add">
        <button className='btn btn-success'><i class="fa-regular fa-square-plus"></i> Ajouter</button>
      </Link>
      <h1>Liste des catégories</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nom categorie</th>
            <th>Image categorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((cat,index)=>
              <tr key={index}>
                <td>{cat.nomcategorie}</td>
                <td><img src={cat.imagecategorie} width={100} height={100}/></td>
                <td><button className='btn btn-warning btn-sm'><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                <td><button className='btn btn-danger btn-sm' onClick={()=>handleDelete(cat.id)}><i class="fa-solid fa-trash"></i> Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Listcategories

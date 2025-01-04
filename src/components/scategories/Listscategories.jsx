import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
const Listscategories = () => {
  const[sCategories,setSCategories]=useState([])
  const[isLoading,setIsLoading]=useState(true)

  const fetchSCategories=async()=>{
    try{
      const res=await axios.get("https://e-commerce-tau-six-49.vercel.app/api/api/scategories")
      setSCategories(res.data)//5ter res fiha plusieurs information w a7na 7chetna kn b data 
      setIsLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  //useEffect c'est une hoox
  useEffect(()=>{
    fetchSCategories()
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
  return (
    <div>
      <Link to="/scategories/add">
        <button className='btn btn-success'><i class="fa-regular fa-square-plus"></i> Ajouter</button>
      </Link>
      <h1>Liste des sous catégories</h1> 
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nom Sous Categorie</th>
            <th>Image categorie</th>
            <th>Categorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            sCategories.map((scat,index)=>
              <tr key={index}>
                <td>{scat.nomscategorie}</td>
                <td><img src={scat.imagescategorie} width={100} height={100}/></td>
                <td>{scat.categorie.nomcategorie}</td>
                <td><button className='btn btn-warning btn-sm'><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                <td><button className='btn btn-danger btn-sm' onClick={()=>handleDelete(scat.id)}><i class="fa-solid fa-trash"></i> Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Listscategories

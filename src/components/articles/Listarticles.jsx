import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

const Listarticles = () => {
  const[articles,setArticles]=useState([])
  const[isLoading,setIsLoading]=useState(true)
  const fetchArticles=async()=>{
    try{
      const res=await axios.get("https://e-commerce-tau-six-49.vercel.app/api/api/articles")
      setArticles(res.data)//5ter res fiha plusieurs information w a7na 7chetna kn b data 
      setIsLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  //useEffect c'est une hoox
  useEffect(()=>{
    fetchArticles()
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
      <Link to="/articles/add">
        <button className='btn btn-success'><i class="fa-regular fa-square-plus"></i> Ajouter</button>
      </Link>      
      <h1>Liste des articles</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Réference</th>
            <th>Qte Stock</th>
            <th>Prix</th>
            <th>Image Article</th>
            <th>Sous Catégorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            articles.map((art,index)=>
              <tr key={index}>
                <td>{art.designation}</td>
                <td>{art.marque}</td>
                <td>{art.reference}</td>
                <td>{art.qtestock}</td>
                <td>{art.prix} DT</td>
                <td><img src={art.imageart} width={100} height={100}/></td>
                <td>{art.scategorie.nomscategorie}</td>
                <td><Link to={`/article/edit/${art.id}`}><button className='btn btn-warning btn-sm'><i class="fa-solid fa-pen-to-square"></i> Update</button></Link></td>
                <td><button className='btn btn-danger btn-sm'><i class="fa-solid fa-trash"></i> Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Listarticles
